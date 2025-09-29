import asyncHandler from "express-async-handler";
import { AuditLog } from "../models/account.js";

// @desc    Get all audit logs
// @route   GET /api/logs
// @access  Public or Private (set as needed)
const getLogs = asyncHandler(async (req, res) => {
  // filter logs by logged in user
  const logs = await AuditLog.find({ user: req.user._id }).populate(
    "user",
    "email firstName lastName"
  );
  res.json(logs);
});

export { getLogs };
