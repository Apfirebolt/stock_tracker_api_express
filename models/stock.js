import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        trim: true
    },
    buy_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        trim: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// a watchlist model would have name and there could be many stocks in a watchlist

const watchlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    stocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Stock = mongoose.model('Stock', stockSchema);
const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export {
    Stock,
    Watchlist
}