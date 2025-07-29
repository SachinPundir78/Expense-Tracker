const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate JWT token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

//Register User

const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    //validation: Check for missing fields
    if(!fullName || !email || !password ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        //Check if email already exists
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        //Send response
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
   }
 };

//Login User

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error:err.message });
    }
 };

//Get User Info

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error", error:err.message });
    }
};
 
const updateProfileImage = async (req, res) => {
  try {
    const updateData = {};

    // If fullName is sent
    if (req.body.fullName) {
      updateData.fullName = req.body.fullName;
    }

    // If image is sent
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      updateData.profileImageUrl = imageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      message: "Profile updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  generateToken,
  registerUser,
  loginUser,
  getUserInfo,
  updateProfileImage, // ✅ add this
};
