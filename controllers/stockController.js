import asyncHandler from "express-async-handler";
import { Stock } from "../models/stock.js";
import { Account, AuditLog } from "../models/account.js";

// @desc    Create a new stock
// @route   POST /api/stocks
// @access  Public or Private (set as needed)
const createStock = asyncHandler(async (req, res) => {
  const { buy_price, symbol, quantity, comments, account } = req.body;
  const data = { buy_price, symbol, quantity, comments, account };
  if (req.user && req.user._id) {
    data.user_id = req.user._id;
  }
  // check if default account has the required balance
  const relatedAccount = await Account.findById(account);
  if (!relatedAccount || relatedAccount.balance < buy_price * quantity) {
    res.status(400);
    throw new Error("Insufficient funds");
  }
  const stock = new Stock(data);
  await stock.save();

  // deduct the amount from the account balance
  relatedAccount.balance -= buy_price * quantity;
  await relatedAccount.save();

  // create an audit log
  await AuditLog.create({
    user: req.user._id,
    details: `Purchased ${quantity} shares of ${symbol} at $${buy_price} each.`,
    action: "BUY_STOCK",
  });
  res.status(201).json(stock);
});

// @desc    Get all stocks
// @route   GET /api/stocks
// @access  Public or Private (set as needed)
const getStocks = asyncHandler(async (req, res) => {
  const itemsPerPage = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;

  const filter = { user_id: req.user._id };

  const [stocks, total] = await Promise.all([
    Stock.find(filter)
      .skip(itemsPerPage * (page - 1))
      .limit(itemsPerPage)
      .exec(),
    Stock.countDocuments(filter),
  ]);

  res.json({
    stocks,
    total,
    itemsPerPage,
    page,
    lastPage: Math.ceil(total / itemsPerPage),
    success: true,
  });
});

// @desc    Get single stock
// @route   GET /api/stocks/:id
// @access  Public or Private (set as needed)
const getStockById = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id).populate("user_id");
  if (stock) {
    res.json(stock);
  } else {
    res.status(404);
    throw new Error("Stock not found");
  }
});

// @desc    Update stock
// @route   PUT /api/stocks/:id
// @access  Public or Private (set as needed)
const updateStock = asyncHandler(async (req, res) => {
  const { sell_price, quantity } = req.body;
  const stock = await Stock.findById(req.params.id);
  if (stock) {
    // If sell_price or quantity is being updated, adjust the related account balance
    const relatedAccount = await Account.findById(stock.account);
    if (!relatedAccount) {
      res.status(400);
      throw new Error("Related account not found");
    }
    // if the quantity is 0 then delete the stock and update the account balance
    if (quantity === 0) {
      // refund the account balance
      relatedAccount.balance += sell_price * stock.quantity;
      await relatedAccount.save();
      await stock.remove();
      // Create an audit log for the deletion
      await AuditLog.create({
        user: req.user._id,
        details: `Sold all shares of ${stock.symbol}.`,
        action: "SELL_STOCK",
      });
      res.json({ message: "Stock sold and removed successfully" });
      return;
    } else if (quantity < 0) {
      res.status(400);
      throw new Error("Quantity cannot be negative");
    }

    relatedAccount.balance += sell_price * quantity;
    await relatedAccount.save();
    // update stock quantity
    stock.quantity -= quantity;
    await stock.save();

    // create audit log
    await AuditLog.create({
      user: req.user._id,
      details: `Sold ${quantity} of ${stock.symbol} shares at $${sell_price} each.`,
      action: "UPDATE_STOCK",
    });

    res.json(stock);
  } else {
    res.status(404);
    throw new Error("Stock not found");
  }
});

export { createStock, getStocks, getStockById, updateStock };
