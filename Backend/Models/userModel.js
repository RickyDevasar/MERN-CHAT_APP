const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String, default: "" },

},

    {
        timestamps: true,
    })

userSchema.methods.matchPassword = async function (enteredpssword) {
    return await bcrypt.compare(enteredpssword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

const user = mongoose.model("user", userSchema)

module.exports = user