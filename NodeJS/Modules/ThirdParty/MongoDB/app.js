//~ steps to use a third party modules
//? 1) create a package.json file
//? 2) install the required modules
//? 3) import the modules

//! in every project folder we should have only one "package.json" file.
//~ to create this file, run this command in the terminal
// ? npm init -y (verify path before running this command)

// this file contains project details like name, version, author, etc.. along with dependencies(what all third party modules we are installing)

//! to install the module
// npm i/install module-name
// npm i/install module-name1 module-name2 .......

//! 1_ folder will get created (node_modules)
//! 2_ package.json file will get modified (dependencies will get added)
//! 3_ a file will be created (package-lock.json)

//~ examples of third-party modules => express, mongodb, multer, dotenv, express-async-handler, etc...

const monogdb = require("mongodb");
// console.log(monogdb.MongoClient);
//~ 1_ establish a connection ==> MongoClient class (connect())
//~ 2_ create a database ==> using db()
//~ 3_ create a collection ==> createCollection()/ collection()

// let client = monogdb.MongoClient.connect("mongodb://localhost:27017");
// console.log(client);

let connectDB = async () => {
  //~ step 1, use connect(url)
  let client = await monogdb.MongoClient.connect("mongodb://localhost:27017");
  //   console.log(client.db);
  //~ step 2, use db("database-name")
  let database = client.db("NodeDB");
  //   console.log(database);
  //~ step 3, use collection("collection-name")
  let collection = database.collection("nodeCollection");

  //& ─── CRUD ────────────────────────────────────────────────────────────────

  //! ================= create =============================
  //   let op = await collection.insertOne({ name: "abc", age: "33" });
  //   console.log(op);
  //   console.log("data inserted");

  //   let op = await collection.insertMany([
  //     { name: "def", age: "33" },
  //     { name: "ghi", age: "33" },
  //   ]);
  //   console.log(op, "data added");

  //! ================= read =============================
  //   let op = await collection.findOne({ });
  //   console.log(op);

  //   let op = await collection.find(); //~ this will give me a cursor, in order to print the contents, use toArray()
  //   let op = await collection.find().toArray();
  //   console.log(op);

  //! ================= update =============================
  //   let op = await collection.updateMany({}, { $set: { email: "common@gmail.com" } });
  //   console.log(op);

  //! ================= delete =============================
  //   let op = await collection.deleteMany({});
  //   console.log(op);

  //! ================= drop a collection =============================
  //   await collection.drop();
  //   console.log("collection removed");
};

connectDB();
