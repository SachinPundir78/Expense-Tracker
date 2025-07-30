const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
  updateProfileImage, // ✅ added this
} = require("../controllers/authController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.put("/upload-profile", protect, upload.single("profileImage"), updateProfileImage);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
   const imageUrl = `https://expense-tracker-backend-ly3g.onrender.com/uploads/${req.file.filename}`;
    
    res.status(200).json({ imageUrl });
});

module.exports = router;
