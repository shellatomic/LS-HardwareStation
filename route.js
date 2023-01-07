const express = require('express');
var crypto = require("crypto");
var fs = require("fs");
const path = require("path");

const multer = require("multer");

const app = express();

const port = 8094



const imageStorage = multer.diskStorage({
    destination: "C:/temp", // Destination to store image 
    filename: (req, file, cb) => {
 	var id = crypto.randomBytes(20).toString('hex');
        cb(null, id + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000   // 1000000 Bytes = 1 MB
    },
   
})  



app.post('/api/invoice/upload', 
 	imageUpload.single("file"),
	(req, res) => {

    res.json(`${req.file.destination}/${req.file.filename}`);
});

app.listen(port, () => console.log(`app listening on port ${port}`))
