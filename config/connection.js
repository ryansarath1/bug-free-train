const mongoose = require("mongoose")
mongoose.connnect("mongodb://127.0.0.1:27017/Bug-free")
module.exports=mongoose.connection
