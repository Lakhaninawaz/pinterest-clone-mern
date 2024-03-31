const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "images", "uploads")); // Ensure path resolution
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    console.log(file);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
module.exports = upload