const userModel = require('../dataModels/userModel')

//register
const userRegister = async (req,res)=>{

    //load data from request body
    const {username, email, password} = req.body

    //add documnent to database
    try{
        const user = await userModel.create({username, email, password})
        res.status(200).json(user) 
    }catch(error){
        res.status(400).json({error : error.message})
    }

}
//get all users
const getAllUsers = async (req,res)=>{

    try{
        const users = await userModel.find({})
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({err: err.message})
    }
}
//get a specific user
const getUser = async (req,res)=>{

    const {username} = req.params
    try{
        const user = await userModel.findOne({username : username})
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({err:err.message})
    }
}


module.exports ={
    userRegister,
    getAllUsers,
    getUser
}

