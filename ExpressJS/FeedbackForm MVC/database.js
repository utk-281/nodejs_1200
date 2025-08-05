const mongodb = require("mongodb");

const connectDB = async () => {
  // step 5
  const client = await mongodb.MongoClient.connect("mongodb://localhost:27017");
  let database = client.db("feedback");
  let collection = database.collection("list");
  return collection;
};

module.exports = {
  connectDB,
};
