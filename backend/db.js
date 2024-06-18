
const mongoose = require("mongoose");

require("dotenv").config()
 
const connectDB=mongoose.connect(process.env.mongoURI);


module.exports={connectDB}