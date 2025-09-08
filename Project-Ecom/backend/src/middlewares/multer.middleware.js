import multer from "multer";

const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp"); // create temp folder first;
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-----" + file.originalname);
  },
});

const upload = multer({ storage: myStorage });

export default upload;
