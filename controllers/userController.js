const userModel = require('../dataModels/userModel')
const jwt = require('jsonwebtoken')

// a function to create token
const createToken = (id)=>{
    return jwt.sign({_id : id},"FedeValverde",{expiresIn:'5d'})
}

//register
const userRegister = async (req,res)=>{

    //load data from request body
    const {username, password} = req.body

    try{
        //add documnent to database    
        const user = await userModel.signup(username,password)
        //create a token
        const token = createToken(user._id) 
        //response
        res.status(200).json({username,token}) 
    }catch(err){
        res.status(400).json({error : err.message})
    }
}
//login 
const userLogin = async (req,res)=>{
    
    //load data from request body
    const {username , password} = req.body
    
    try{
        //calling login fucntion from userModel
        const user = await userModel.login(username,password)
        //create a token
        const token = createToken(user._id)
        //response
        res.status(200).json({user,token})
    }catch(err){
        res.status(400).json({error:err.message})
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
        //search for user
        const user = await userModel.findOne({username})
        //if user not found
        if(!user){
            throw Error('user not found')
        }
        //response
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}


module.exports ={
    userRegister,
    getAllUsers,
    getUser,
    userLogin
}

