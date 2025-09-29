import asyncHandler from 'express-async-handler'
import Stock from '../models/stockModel.js'

// @desc    Create a new stock
// @route   POST /api/stocks
// @access  Public or Private (set as needed)
const createStock = asyncHandler(async (req, res) => {
    const stock = new Stock(req.body)
    await stock.save()
    res.status(201).json(stock)
})

// @desc    Get all stocks
// @route   GET /api/stocks
// @access  Public or Private (set as needed)
const getStocks = asyncHandler(async (req, res) => {
    const stocks = await Stock.find().populate('user_id')
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
