import asyncHandler from "express-async-handler";
import { AuditLog } from "../models/account.js";

// @desc    Get all audit logs
// @route   GET /api/logs
// @access  Public or Private (set as needed)
const getLogs = asyncHandler(async (req, res) => {
  const itemsPerPage = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;

  const filter = { user: req.user._id };

  const [logs, count] = await Promise.all([
    AuditLog.find(filter)
      .populate("user", "email firstName lastName")
      .skip(itemsPerPage * (page - 1))
      .limit(itemsPerPage)
      .exec(),
    AuditLog.countDocuments(filter)
  ]);

  res.status(200).json({
    data: logs,
    total: count,
    success: true,
    itemsPerPage,
    page,
    lastPage: Math.ceil(count / itemsPerPage),
  });
});

export { getLogs };
