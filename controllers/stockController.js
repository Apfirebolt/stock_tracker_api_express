import asyncHandler from 'express-async-handler'
import { Stock } from '../models/stock.js'
import { Account, AuditLog } from '../models/account.js'

// @desc    Create a new stock
// @route   POST /api/stocks
// @access  Public or Private (set as needed)
const createStock = asyncHandler(async (req, res) => {
    const { buy_price, symbol, quantity, comments, account } = req.body
    const data = { buy_price, symbol, quantity, comments, account }
    if (req.user && req.user._id) {
        data.user_id = req.user._id
    }
    // check if default account has the required balance
    const relatedAccount = await Account.findById(account)
    if (!relatedAccount || relatedAccount.balance < buy_price * quantity) {
        res.status(400)
        throw new Error('Insufficient funds')
    }
    const stock = new Stock(data)
    await stock.save()

    // deduct the amount from the account balance
    relatedAccount.balance -= buy_price * quantity
    await relatedAccount.save()

    // create an audit log
    await AuditLog.create({
        user: req.user._id,
        details: `Purchased ${quantity} shares of ${symbol} at $${buy_price} each.`,
        action: 'BUY_STOCK',
    })
    res.status(201).json(stock)
})

// @desc    Get all stocks
// @route   GET /api/stocks
// @access  Public or Private (set as needed)
const getStocks = asyncHandler(async (req, res) => {
    const stocks = await Stock.find({ user_id: req.user._id })
    res.json(stocks)
})

// @desc    Get single stock
// @route   GET /api/stocks/:id
// @access  Public or Private (set as needed)
const getStockById = asyncHandler(async (req, res) => {
    const stock = await Stock.findById(req.params.id).populate('user_id')
    if (stock) {
        res.json(stock)
    } else {
        res.status(404)
        throw new Error('Stock not found')
    }
})

// @desc    Update stock
// @route   PUT /api/stocks/:id
// @access  Public or Private (set as needed)
const updateStock = asyncHandler(async (req, res) => {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (stock) {
        res.json(stock)
    } else {
        res.status(404)
        throw new Error('Stock not found')
    }
})

// @desc    Delete stock
// @route   DELETE /api/stocks/:id
// @access  Public or Private (set as needed)
const deleteStock = asyncHandler(async (req, res) => {
    const stock = await Stock.findByIdAndDelete(req.params.id)
    if (stock) {
        res.json({ message: 'Stock deleted' })
    } else {
        res.status(404)
        throw new Error('Stock not found')
    }
})

export {
    createStock,
    getStocks,
    getStockById,
    updateStock,
    deleteStock,
}
