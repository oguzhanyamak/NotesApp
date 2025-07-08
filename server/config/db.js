const mongoose = require('mongoose');
function connectDB() {
  return mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DATABASE_NAME });
}
module.exports = connectDB; 