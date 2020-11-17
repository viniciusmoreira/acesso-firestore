const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});