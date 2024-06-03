// src/config/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ticket-tracker-2c78a.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
