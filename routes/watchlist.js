import express from "express";
import {
  createWatchlist,
  getWatchlists,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
} from "../controllers/watchlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createWatchlist);
router.get("/", protect, getWatchlists);
router.get("/:id", protect, getWatchlistById);
router.put("/:id", protect, updateWatchlist);
router.delete("/:id", protect, deleteWatchlist);

export default router;
