const multer = require("multer");

let maxSize = 5 * 1024 * 1024;

let storageFile = (path) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });
};

class uploadFile {
  uploadProject = multer({
    storage: storageFile("./uploads/project"),
    limits: { fileSize: maxSize },
  }).array("list_gambar", 10);
}

module.exports = new uploadFile();
