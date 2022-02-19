const expressAsyncHandler = require('express-async-handler');
const User = require("../../model/User");


const registerUser = expressAsyncHandler(async (req,res) => {
    const {firstName,lastName,email,password} = req?.body; // req && req.body;
    //Check if the user already exists
    const userExists = await User.findOne({email: req.body.email});
    if(userExists) throw new Error("User already exists");
    try {
        const user = await User.create({firstName,lastName,email,password});
        res.status(200).json(user)
    } catch (error) {
        res.json({error: error});
    }
});

const fetchUsers = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
})
module.exports = {registerUser,fetchUsers};