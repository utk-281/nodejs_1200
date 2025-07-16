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
// console.log(1);
// console.log(2);
// fs.appendFileSync("./movie.java", "\nthis is the end of the file");
// console.log("file updated");
// console.log(4);
//~ if the file is not present at the path, then a new file will get created with the passed data
//~ if the file is already present, then data will get appended.

//! 4) ============= deleting a file ===============
// method name ==> unlinkSync()
// syntax ==> unlinkSyn("path")
// try {
//   console.log(1);
//   console.log(2);
//   fs.unlinkSync("./demo.txt");
//   console.log("file deleted");
//   console.log(3);
// } catch (error) {
//   console.log("Something is wrong");
//   console.log(error);
// }

//& ─── managing folders/directories ────────────────────────────────────────────────────────────────
//! 5) ============= creating a folder ===============
// method name ==> mkdirSync()
// syntax ==> mkdirSync("path/folderName")
// fs.mkdirSync("./School");
// console.log("folder created");

//~ create a structure like Project >> Src >> app.js
function makeFolder() {
  fs.mkdirSync("./Project");
  console.log("folder created");
  fs.mkdirSync("./Project/src");
  console.log("folder created");
  fs.writeFileSync("./Project/src/app.js", "");
  console.log("file created");
}
// makeFolder();
// fs.mkdirSync("./PRoject/SRC/app", { recursive: true });

// //~ copy the contents of "fs.js" to new file "fs.txt"
// let readFS = fs.readFileSync("./fs.js", "utf-8");
// fs.writeFileSync("./fs.txt", readFS);
// console.log("file copy pasted");
// fs.copyFileSync("./fs.js", "../../app.txt");

//& ─── TO COPY A FILE ────────────────────────────────────────────────────────────────
//! 6) ============= creating a folder ===============
// method name ==> copyFileSync()
// syntax ==> copyFileSync("src", "dest")
// fs.copyFileSync("./fs.js", "../../app.txt");

//! 7) ============= removing a folder ===============
// method name ==> rmdirSync()
// syntax ==> rmdirSync("path")
// fs.rmdirSync("../../Demo");
// console.log("folder deleted");
// fs.rmdirSync("./Project", { recursive: true });

//! 8) ============= renaming a folder/file ===============
// method name ==> renameSync()
// syntax ==> renameSync("old name", "new name")
// fs.renameSync("./app.txt", "./index.js");
// fs.renameSync("./demo", "./src");

//& ─── fs operation asynchronously (using callbacks) ────────────────────────────────────────────────────────────────
//! 1) ============= creating a file ===============
// method name ==> writeFile()
// syntax ==> writeFile("path/name", "data", callback)
console.log(1);
console.log(2);
fs.writeFile("./demo.txt", "data", (error) => {
  if (error) console.log(error);
  console.log("file created");
});
//? this is error first callback, the first parameter is always error.
console.log(3);
