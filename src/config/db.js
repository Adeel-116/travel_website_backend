const { MongoClient } = require("mongodb");
require("dotenv").config();

let client;
let database;

async function mongoDB() {
  try {
    client = new MongoClient(process.env.MONGO_DB_URL);
    await client.connect();
    console.log("✅ MongoDB connected");
    database = client.db("travel-data");
    return database;
  } catch (error) {
    console.error("❌ Error occurred during DB connection:", error);
  }
}

function getDB() {
  if (!database) {
    throw new Error("❌ DB not connected. Call mongoDB() first.");
  }
  return database;
}

module.exports = { getDB, mongoDB };
