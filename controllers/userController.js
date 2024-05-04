const userModel = require('../dataModels/userModel');
//const bcrypt = require('bcryptjs');
// Additional imports as needed
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Register
const userRegister = async (req, res) => {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: 'Email already in use.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Add document to database
    try {
        const user = await userModel.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User created!', user }); // 201 for resource created
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

// Get a specific user
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


// Update a user's details
const updateUser = async (req, res) => {
    const { username } = req.params;
    const updates = req.body;

    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 12);
    }

    try {
        const user = await userModel.findOneAndUpdate({username}, updates, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// User Login
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Assuming the JWT_SECRET is defined in your environment
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in.', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const followUser = async (req, res) => {
    const { followId } = req.params; // ID of the user to follow
    const userId = req.userId; // ID of the user making the request

    try {
        if (followId === userId) {
            return res.status(400).json({ error: "Users can't follow themselves." });
        }

        const user = await UserModel.findById(userId);
        const userToFollow = await UserModel.findById(followId);

        if (!userToFollow) {
            return res.status(404).json({ error: 'User to follow not found.' });
        }

        if (user.following.includes(followId)) {
            return res.status(400).json({ error: 'You are already following this user.' });
        }

        // Add to the follower and following arrays
        user.following.push(followId);
        userToFollow.followers.push(userId);

        await user.save();
        await userToFollow.save();

        res.status(200).json({ message: 'User followed successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
    const { unfollowId } = req.params; // ID of the user to unfollow
    const userId = req.user.id; // ID of the user making the request

    try {
        const user = await UserModel.findById(userId);
        const userToUnfollow = await UserModel.findById(unfollowId);

        if (!userToUnfollow) {
            return res.status(404).json({ error: 'User to unfollow not found.' });
        }

        if (!user.following.includes(unfollowId)) {
            return res.status(400).json({ error: 'You are not following this user.' });
        }

        // Remove from the follower and following arrays
        user.following = user.following.filter(id => id.toString() !== unfollowId);
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== userId);

        await user.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'User unfollowed successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    userRegister, // Existing function
    getAllUsers,  // Existing function
    getUser,      // Existing function
    updateUser,
    deleteUser,
    userLogin,
    followUser,
    unfollowUser
};