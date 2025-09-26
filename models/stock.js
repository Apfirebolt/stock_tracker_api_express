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
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Stock', stockSchema);