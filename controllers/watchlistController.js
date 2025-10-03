import asyncHandler from "express-async-handler";
import { Watchlist } from "../models/stock.js";
import { AuditLog, Account } from "../models/account.js";

// @desc    Create a new watchlist
// @route   POST /api/watchlists
// @access  Private
const createWatchlist = asyncHandler(async (req, res) => {
  const { name, stocks } = req.body;
  const watchlist = new Watchlist({
    name,
    stocks,
    user_id: req.user._id,
  });
  const createdWatchlist = await watchlist.save();

  // Log the creation action
  const log = new AuditLog({
    user: req.user._id,
    details: `Created watchlist: ${name}`,
    action: "CREATE_WATCHLIST",
  });
  await log.save();

  res.status(201).json(createdWatchlist);
});

// @desc    Get all watchlists for user
// @route   GET /api/watchlists
// @access  Private
const getWatchlists = asyncHandler(async (req, res) => {
  const itemsPerPage = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;

  const filter = { user_id: req.user._id };

  const [watchlists, total] = await Promise.all([
    Watchlist.find(filter)
      .skip(itemsPerPage * (page - 1))
      .limit(itemsPerPage)
      .populate("stocks")
      .exec(),
    Watchlist.countDocuments(filter),
  ]);

  res.json({
    data: watchlists,
    total,
    itemsPerPage,
    page,
    lastPage: Math.ceil(total / itemsPerPage),
    success: true,
  });
});

// @desc    Get single watchlist
// @route   GET /api/watchlists/:id
// @access  Private
const getWatchlistById = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  }).populate("stocks");
  if (watchlist) {
    res.json(watchlist);
  } else {
    res.status(404);
    throw new Error("Watchlist not found");
  }
});

// @desc    Update watchlist
// @route   PUT /api/watchlists/:id
// @access  Private
const updateWatchlist = asyncHandler(async (req, res) => {
  const { name, stocks } = req.body;
  const watchlist = await Watchlist.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (watchlist) {
    if (name) watchlist.name = name;
    if (stocks) {
      // check for duplicates before adding
      const existingTickers = watchlist.stocks.map((s) => s.ticker);
      const newStocks = stocks.filter(
        (s) => !existingTickers.includes(s.ticker)
      );
      watchlist.stocks = [...watchlist.stocks, ...newStocks];

      // there should not be more than 10 stocks in a watchlist
      if (watchlist.stocks.length > 10) {
        res.status(400);
        throw new Error("A watchlist cannot have more than 10 stocks");
      }
      // save the updated stocks array
      watchlist.stocks = watchlist.stocks;
    };
    await watchlist.save();

    // Log the update action
    const log = new AuditLog({
      user: req.user._id,
      details: `Updated watchlist: ${watchlist.name}`,
      action: "UPDATE_WATCHLIST",
    });
    await log.save();
    res.json(watchlist);
  } else {
    res.status(404);
    throw new Error("Watchlist not found");
  }
});

// @desc    Delete watchlist
// @route   DELETE /api/watchlists/:id
// @access  Private
const deleteWatchlist = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findByIdAndDelete(req.params.id)
    // create a log entry for watchlist deletion
    await AuditLog.create({
        action: 'Watchlist Deletion',
        user: req.user._id,
        details: `Watchlist ${req.params.id} deleted.`,
    });
    if (watchlist) {
        res.json({ message: 'Watchlist deleted' })
    } else {
        res.status(404)
        throw new Error('Watchlist not found')
    }
});

export {
  createWatchlist,
  getWatchlists,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
};
