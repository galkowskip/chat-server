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

// Gets User.id's and finds their id and username. Returns Promise
UserSchema.statics.getTargetedUser = function (userId) {
    return new Promise((resolve, reject) => {
        let user = UserModel.findById(userId);
        user
            .exec()
            .then(user => {
                resolve({
                    id: user.id,
                    username: user.username
                });
            })
            .catch(error => {
                reject(error);
            });
    });
}


UserSchema.statics.checkUser = function (user) {
    return new Promise((resolve, reject) => {
        const query = UserModel.findById(user)
        query.exec().then(result => {
            if (result) {
                resolve(true, null)
            } else {
                reject(false, null)
            }
        }).catch(error => {
            reject(null, error)
        })
    })
}

UserSchema.statics.userSimilarSearch = function (data) {
    return new Promise((resolve, reject) => {
        if (data === '') {
            resolve(null)
        }
        const query = UserModel.find({
            username: new RegExp(`${data}`)
        });
        query.exec().then(result => {
            const response = result.map(item => {
                return {
                    username: item.username,
                    id: item.id
                };
            });
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel