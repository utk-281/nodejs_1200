//! import the module
let fs = require("fs");
// let fs = require("node:fs")
// "node: " ==> it tells us that the module is built-in
// console.log(fs);

//& ─── fs operation synchronously ────────────────────────────────────────────────────────────────
//& ─── CRUD ────────────────────────────────────────────────────────────────
//! 1) ============= creating a file ===============
// method name ==> writeFileSync()
// syntax ==> writeFileSync("path/filename.ext", "data")
//? "path/filename.ext" ==> path of the file along with name and extension
//? "data" ==> data which needs to passed
// console.log(1);
// console.log(2);
// fs.writeFileSync("../../../JavaScript/demo.js", "let a = [{},{}]");
// console.log("file created");
// console.log(3);
//~ if the file is already present at the path, then the data will be over-written
//~ if the file is not there then new file will be created

//! 2) ============= reading a file ===============
// method name ==> readFileSync()
// syntax ==> readFileSync("path/filename.ext", "encoding")
// console.log(1);
// console.log(2);
// let data = fs.readFileSync("./notes.txt", "utf-8");
// console.log(data);
// // buffer is an array, which stores binary data (character set, encoding)
// // console.log(data);
// //TODO: buffer and streams
// console.log(3);

//! 3) ============= updating/appending  a file ===============
// method name ==> appendFileSync()
// syntax name ==> appendFileSync("file path", "new data")
console.log(1);
console.log(2);
fs.appendFileSync("./movie.java", "\nthis is the end of the file");
console.log("file updated");
console.log(4);
//~ if the file is not present at the path, then a new file will get created with the passed data
//~ if the file is already present, then data will get appended.
