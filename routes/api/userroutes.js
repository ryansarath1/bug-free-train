const router = require("express").Router()
const {
    getusers,
    getoneuser,
    createusers,
    updateusers,
    deleteusers,
    addfriend,
    deletefriend,

}=require("../../controllers/usercontroller")

router.route("/").get(getusers).post(createusers)
router.route("/:userid").get(getoneuser).put(updateusers).delete(deleteusers)
router.route("/:userid/friend/:friendid").post(addfriend).delete(deletefriend)

module.exports=router