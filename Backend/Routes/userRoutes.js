const express=require("express")
const {registerUser,authuser,allUsers}=require('../Controllers/usercontroller')
const { protect } = require("../middleware/authmiddleware");

const router=express.Router()

router.route('/').post(registerUser).get(protect,allUsers)
router.post('/login',authuser)

module.exports=router