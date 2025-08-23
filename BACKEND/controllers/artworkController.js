const Artwork = require("../models/Artwork");
const User = require("../models/User");

// Get all artworks (public route)
const getAllArtworks = async (req, res) => {
  try {
    const { state, artist, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = { isActive: true };
    if (state) filter.state = state;
    if (artist) filter.artist = artist;

    // Calculate pagination
    const skip = (page - 1) * limit;

    const artworks = await Artwork.find(filter)
      .populate("artist", "profile.name profile.artistInfo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Artwork.countDocuments(filter);

    res.json({
      success: true,
      data: {
        artworks,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get artworks error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get single artwork by ID
const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findById(id).populate(
      "artist",
      "profile.name profile.artistInfo profile.phone"
    );

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    // Increment view count
    await Artwork.findByIdAndUpdate(id, { $inc: { views: 1 } });

    res.json({
      success: true,
      data: artwork,
    });
  } catch (error) {
    console.error("Get artwork error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Create new artwork (authenticated route)
const createArtwork = async (req, res) => {
  try {
    const { title, description, image, price, state } = req.body;
    const userId = req.user._id; // Fix: use _id instead of userId

    // Validate required fields
    if (!title || !description || !image || !price || !state) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create artwork - use the user from middleware directly
    const artwork = new Artwork({
      title,
      description,
      image,
      price: parseFloat(price),
      state,
      artist: userId,
      artistName: req.user.profile.name, // Get name from the user object
    });

    await artwork.save();

    res.status(201).json({
      success: true,
      message: "Artwork created successfully",
      data: artwork,
    });
  } catch (error) {
    console.error("Create artwork error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update artwork (authenticated route)
const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, price, state } = req.body;
    const userId = req.user._id; // Fix: use _id instead of userId

    // Find artwork and check ownership
    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    if (artwork.artist.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own artworks",
      });
    }

    // Update artwork
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (image) updateData.image = image;
    if (price) updateData.price = parseFloat(price);
    if (state) updateData.state = state;

    const updatedArtwork = await Artwork.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "Artwork updated successfully",
      data: updatedArtwork,
    });
  } catch (error) {
    console.error("Update artwork error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete artwork (authenticated route)
const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Fix: use _id instead of userId

    // Find artwork and check ownership
    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    if (artwork.artist.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own artworks",
      });
    }

    // Soft delete by setting isActive to false
    await Artwork.findByIdAndUpdate(id, { isActive: false });

    res.json({
      success: true,
      message: "Artwork deleted successfully",
    });
  } catch (error) {
    console.error("Delete artwork error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get artworks by current user (authenticated route)
const getMyArtworks = async (req, res) => {
  try {
    const userId = req.user._id; // Fix: use _id instead of userId

    const artworks = await Artwork.find({ artist: userId }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: artworks,
    });
  } catch (error) {
    console.error("Get my artworks error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  getMyArtworks,
};
