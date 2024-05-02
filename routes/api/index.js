const router = require("express").Router()
const userroutes=require("./userroutes")
const thoughtroutes=require("./thoughtroute")
router.use("/user", userroutes)
router.use("/thought", thoughtroutes)



module.exports=router