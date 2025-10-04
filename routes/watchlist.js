import express from "express";
import {
  createWatchlist,
  getWatchlists,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
  updateMultipleWatchlist
} from "../controllers/watchlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, createWatchlist);
router.get("/", protect, getWatchlists);

// New route for updating multiple watchlists
router.put("/update", protect, updateMultipleWatchlist);

// dynamic routes
router.get("/:id", protect, getWatchlistById);
router.put("/:id", protect, updateWatchlist);
router.delete("/:id", protect, deleteWatchlist);


export default router;
