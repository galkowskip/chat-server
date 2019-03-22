const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        min: 5
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
})

UserSchema.methods.isValid = async function () {
    try {
        console.log('huh')
    } catch (error) {
        throw new Error(error)
    }
}

UserSchema.methods.passwordHash = async function () {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
    } catch (error) {
        throw new Error(error)
    }
}

UserSchema.methods.comparePasswords = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel