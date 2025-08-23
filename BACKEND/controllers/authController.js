const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

// Register new user
const register = async (req, res) => {
  try {
    console.log("Registration request body:", req.body);

    const { email, password, userType, name, phone, artistInfo, businessInfo } =
      req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create profile object based on user type
    let profile = { name, phone };

    if (userType === "artist" && artistInfo) {
      profile.artistInfo = artistInfo;
    } else if (userType === "business" && businessInfo) {
      profile.businessInfo = businessInfo;
    }

    // Create new user
    const user = new User({
      email,
      password,
      userType: userType || "user",
      profile,
    });

    await user.save();

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      userType: user.userType,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: user.toJSON(),
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle validation errors
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

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      userType: user.userType,
    });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: user.toJSON(),
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, artistInfo, businessInfo } = req.body;

    const updateData = {};

    if (name) updateData["profile.name"] = name;
    if (phone) updateData["profile.phone"] = phone;

    // Update artist-specific info
    if (req.user.userType === "artist" && artistInfo) {
      Object.keys(artistInfo).forEach((key) => {
        updateData[`profile.artistInfo.${key}`] = artistInfo[key];
      });
    }

    // Update business-specific info
    if (req.user.userType === "business" && businessInfo) {
      Object.keys(businessInfo).forEach((key) => {
        updateData[`profile.businessInfo.${key}`] = businessInfo[key];
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
