const {
    User, Thought
}=require("../models")
const usercontroller = {
    async getusers(req, res){
        try {
            const allusers = await User.find().select("-__v")
            res.json(allusers)
        
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
    
        }
      
    },
    async getoneuser(req, res){
        try {
            const oneuser = await User.findOne({
                _id:req.params.userid
            }).select("-__v").populate("friends").populate("thoughts")
            res.json(oneuser)
        
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
    
        }
      
    },
    async createusers(req, res){
        try {
            const createuser = await User.create(req.body)
            res.json(createuser)
        
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
    
        }
      
    },
    async updateusers(req, res){
        try {
            const updateuser = await User.findOneAndUpdate({
                _id:req.params.userid
            },
        {
            $set:req.body
        },
    {
        runValidators:true,
        new:true,

    })
    res.json(updateuser)
        
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
    
        }
      
    },
    async deleteusers(req, res){
        try {
            const deleteuser = await User.findOneAndDelete({
                _id:req.params.userid
            })
            await Thought.deleteMany({
                _id:{
                    $in:deleteuser.thoughts
                }
            })
            res.json({
                message: "user deleted"
            })
        
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
    
        }
      
    },
    async addfriend(req, res){
        try {
            const add = await User.findOneAndUpdate({
                _id:req.params.userid
            },
        {
            $addToSet:{
                friends:req.params.friendid
            }
        },
    {
        new:true
    })
    res.json(add)
        
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
    
        }
      
    },
    async deletefriend(req, res){
        try {
            const deleteF = await User.findByIdAndUpdate({
                _id:req.params.userid
            },
        {
            $pull:{
                friends:req.params.friendid
            }
        },
    {
        new:true
    })
    res.json(deleteF)
        
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
    
        }
      
    },

}
module.exports=usercontroller