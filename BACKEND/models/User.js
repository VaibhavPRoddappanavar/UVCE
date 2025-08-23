const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      enum: ["user", "artist", "business"],
      default: "user",
    },
    profile: {
      name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      // Artist specific fields
      artistInfo: {
        bio: String,
        specialization: [String], // e.g., ['Madhubani', 'Warli', 'Kalamkari']
        experience: Number, // years of experience
        location: {
          state: String,
          city: String,
        },
        portfolio: [String], // URLs to artwork images
      },
      // Business specific fields
      businessInfo: {
        companyName: String,
        businessType: String, // e.g., 'textile', 'home_decor', 'fashion'
        description: String,
        website: String,
        location: {
          state: String,
          city: String,
          address: String,
        },
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
