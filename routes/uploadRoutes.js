const upload = require('../config/multerConfig')
const express = require("express");
const DB_File = require('../model/FileModel');
const router = express.Router();


// Upload a single file
router.post('/single',upload.single('file'), async (req,res)=>{
  if(!req.file){
    return res.status(400).json({ message: "No file uploaded"})
  }
  try {

    const fileData = await DB_File.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    })

    res.json({message: "File uploaded successfully", file: req.fileData})
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
    
})

// Upload multiple files (max 5)
router.post('/multiple' ,upload.array("files",5),(req,res)=>{
    if(!req.files || req.files.length === 0) return res.status(400).json({ message: "No files uploaded" });
    res.json({message: "files upload" , files: req.files})
})
// Upload multiple files (max 5)
// router.post("/multiple", upload.array("files", 5), (req, res) => {
//     if (!req.files || req.files.length === 0) return res.status(400).json({ message: "No files uploaded" });
//     res.json({ message: "Files uploaded successfully", files: req.files });
//   });

module.exports = router;
