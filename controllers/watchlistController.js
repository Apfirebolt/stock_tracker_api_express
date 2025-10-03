import asyncHandler from "express-async-handler";
import { Watchlist } from "../models/stock.js";
import { AuditLog } from "../models/account.js";

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
    const session = await Watchlist.startSession();
    session.startTransaction();
    try {
        await watchlist.save({ session });
        // create an audit log
        await AuditLog.create([{
            user: req.user._id,
            details: `Created watchlist ${name}.`,
            action: "CREATE_WATCHLIST",
        }], { session });

        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
    res.status(201).json(watchlist);
});

// @desc    Get all watchlists for user
// @route   GET /api/watchlists
// @access  Private
const getWatchlists = asyncHandler(async (req, res) => {
    const watchlists = await Watchlist.find({ user_id: req.user._id }).populate("stocks");
    res.json(watchlists);
});

// @desc    Get single watchlist
// @route   GET /api/watchlists/:id
// @access  Private
const getWatchlistById = asyncHandler(async (req, res) => {
    const watchlist = await Watchlist.findOne({ _id: req.params.id, user_id: req.user._id }).populate("stocks");
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
    const watchlist = await Watchlist.findOne({ _id: req.params.id, user_id: req.user._id });
    if (watchlist) {
        if (name) watchlist.name = name;
        if (stocks) watchlist.stocks = stocks;
        await watchlist.save();
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
    const watchlist = await Watchlist.findOne({ _id: req.params.id, user_id: req.user._id });
    if (watchlist) {
        await watchlist.remove();
        res.json({ message: "Watchlist deleted" });
    } else {
        res.status(404);
        throw new Error("Watchlist not found");
    }
});

export {
    createWatchlist,
    getWatchlists,
    getWatchlistById,
    updateWatchlist,
    deleteWatchlist,
};
