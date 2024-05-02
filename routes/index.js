const router = require("express").Router()
const apiroutes = require("./api")
router.use("/api",apiroutes)
router.use((req, res)=>{
    return res.send(`<h1>wrong route</h1>`)
})
module.exports=router
