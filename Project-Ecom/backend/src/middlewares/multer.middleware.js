import multer from "multer";

//! disk storage
// const myStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./temp"); // create temp folder first;
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-----" + file.originalname);
//   },
// });

//! memory storage (RAM)
const myStorage = multer.memoryStorage();

const upload = multer({ storage: myStorage });

export default upload;
