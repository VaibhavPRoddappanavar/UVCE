const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticateToken, authorizeUserType } = require("../middleware/auth");

// Get all artists (public route)
router.get("/artists", async (req, res) => {
  try {
    const artists = await User.find({
      userType: "artist",
      isActive: true,
    }).select("-password");

    res.json({
      success: true,
      data: {
        artists,
      },
    });
  } catch (error) {
    console.error("Get artists error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get all businesses (public route)
router.get("/businesses", async (req, res) => {
  try {
    const businesses = await User.find({
      userType: "business",
      isActive: true,
    }).select("-password");

    res.json({
      success: true,
      data: {
        businesses,
      },
    });
  } catch (error) {
    console.error("Get businesses error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get artist by ID (public route)
router.get("/artist/:id", async (req, res) => {
  try {
    const artist = await User.findOne({
      _id: req.params.id,
      userType: "artist",
      isActive: true,
    }).select("-password");

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    res.json({
      success: true,
      data: {
        artist,
      },
    });
  } catch (error) {
    console.error("Get artist error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
