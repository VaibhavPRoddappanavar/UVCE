const express = require("express");
const {
  getAllArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  getMyArtworks,
} = require("../controllers/artworkController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", getAllArtworks);
router.get("/:id", getArtworkById);

// Protected routes (require authentication)
router.post("/", authenticateToken, createArtwork);
router.put("/:id", authenticateToken, updateArtwork);
router.delete("/:id", authenticateToken, deleteArtwork);
router.get("/my/artworks", authenticateToken, getMyArtworks);

module.exports = router;
