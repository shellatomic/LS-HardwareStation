const express = require("express");
var crypto = require("crypto");
const path = require("path");
const multer = require("multer");

const app = express();

const port = 8094;

// const fileMemoryStorage = multer.memoryStorage({
//   destination: (req, file, cb) => {
//     cb(null, "C:/temp");
//   },
//   filename: (req, file, cb) => {
//     var id = crypto.randomBytes(20).toString("hex");
//     cb(null, id + path.extname(file.originalname));
//   },
// });

const fileDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/temp");
  },
  filename: (req, file, cb) => {
    var id = crypto.randomBytes(20).toString("hex");
    cb(null, id + path.extname(file.originalname));
  },
});

const imagesUpload = multer({
  storage: fileDiskStorage,
  //   limits: {
  //     fileSize: 1000000, // 1000000 Bytes = 1 MB
  //   },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|bmp)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

app.post("/api/invoice/upload", imagesUpload.single("file"), (req, res) => {
  console.log(req.file);

  res.json(`${req.file.destination}/${req.file.filename}`);
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(413).json("File too large");
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      res.status(415).json("Too many files");
    }
  } else {
    res.status(500).json(err.message);
  }
});

app.listen(port, () => console.log(`app listening on port ${port}`));
