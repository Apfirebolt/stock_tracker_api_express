import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
    default: "USD",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: String,
  },
}); 

module.exports = mongoose.model("Account", accountSchema);
module.exports = mongoose.model("AuditLog", auditLogSchema);
