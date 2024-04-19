const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

//User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture:{type: String},
    bio:{type: String},
    postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// static signup method
userSchema.statics.signup = async function(username , password){

    //input validation
    if(!username || !password){
        throw Error('All fields must be filled')
    }

    //password strength
    if (!validator.isStrongPassword(password)){
        throw Error('password is not strong enough')
    }

    //username availability
    const sameUser =await  this.findOne({username})
    if(sameUser){
       throw Error('username is not available')
    }

    //generating salt 
    const salt = await bcrypt.genSalt(10)
    //hashing
    const hash = await bcrypt.hash(password,salt)
    //create a new User documet
    const user = await this.create({username : username, password : hash})

    return user
}

//static login method
userSchema.statics.login = async function (username,password)
{

    //input validation
    if(!username || !password)
    {
        throw Error('All fields must be filled')
    }
    
    //searching for user
    const user = await this.findOne({username})
    //if username is not found
    if(!user){
        throw Error('wrong cardentials')
    }

    //compare passwords
    const match = await bcrypt.compare(password,user.password)
    //if password doesn't match
    if(!match){
        throw Error('wrong cardentials')
    }

    //if a success login
    return user
}



module.exports = mongoose.model('User' , userSchema)
