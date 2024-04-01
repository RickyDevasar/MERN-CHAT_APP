const asyncHandler = require("express-async-handler")
const user = require("../Models/userModel")
const generateToken = require('../Config/generateToken')

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await user.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);


    
    })
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profile } = req.body;


    if (!name || !email || !password) {
        res.status(400);
        throw new Error("12Please enter all the fields")
    }

    const userExists = await user.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('user already exist')
    }
    const User = await user.create({
        name,
        email,
        password,
        profile
    })
    if (User) {
        res.status(201).json({
            _id: User._id,
            name: User.name,
            email: User.email,
            profile: User.profile,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("User not found");
    }
})

const authuser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const User = await user.findOne({ email });

    if (User && (await User.matchPassword(password))) {
        res.json({
            _id: User._id,
            name: User.name,
            email: User.email,
            profile: User.profile,
            token: generateToken(User._id)

        })
    }
    else {
        res.status(401)
        throw new Error("Invalid email or password")
    }

})

module.exports = { registerUser, authuser,allUsers };