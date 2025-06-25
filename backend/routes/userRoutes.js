const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/form", upload.single("profilePhoto"), createUser);

module.exports = router;
