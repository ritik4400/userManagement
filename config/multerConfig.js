const multer = require('multer');
const path = require('path');
// const sanitize = require("sanitize-filename");

// Allowed file types
const allowedMimeTypes = [
    "image/jpeg", "image/png", "image/gif",
    "application/pdf", "video/mp4",
    "application/zip"
  ];

// Allowed file extensions
const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".mp4", ".zip"];

const safeStoragePath = (path) => {
    return path.replace(/\.\./g, ""); // Remove directory traversal (../)
  };

// Define file storage dynamically based on file type
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        let uploadPath = safeStoragePath("upload/misc"); //default folder

        if(file.mimetype.startsWith('image/')){
            uploadPath = safeStoragePath("upload/images");
        }else if(file.mimetype === 'application/pdf'){
            uploadPath = safeStoragePath("upload/docs")
        }else if(file.mimetype.startsWith('video/')){
            uploadPath = safeStoragePath("upload/videos");
        }else if(file.mimetype === 'application/zip'){
            uploadPath =safeStoragePath("upload/zips");
        }
        cb(null,uploadPath);
    },
    filename: function (req,file,cb){
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null , file.fieldname + "-"+uniqueSuffix + ext)
    }
})

// File filter function (validate file types)
const fileFilter = (req,file , cb) =>{
    const ext = path.extname(file.originalname).toLowerCase();
    // const allowedTypes = ["image/jpeg" ,"image/png","image/gif" , "application/pdf"
    //     ,"video/mp4" , "application/zip"
    //   ];
      if(!allowedMimeTypes.includes(file.mimetype)  || !allowedExtensions.includes(ext)){
        cb(new Error("Invalid file type. Only images, PDFs, videos, and ZIPs are allowed."))
      }
      cb(null, true);
};

// Define file size limits (5MB for images/docs, 50MB for videos)
const limits = {
    fileSize: function(req,file,cb){
        if(file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf'){
            return 5 * 1024 * 1024 // 5mb
        }
        else if(file.mimetype.startsWith('video/')){
            return 50 * 1024 * 1025; //50 mb
        }
        else{
            return 10 * 1024 * 1024// 10 mb default
        }
    }
}

// Multer upload instance
const upload = multer({
    storage: storage,
    fileFilter:fileFilter,
    limits: { fileSize: limits.fileSize },
})

module.exports = upload;