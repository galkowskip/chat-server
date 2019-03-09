const pool = require("../config/mariadb")
const bcrypt = require("bcrypt")

class User {
    constructor(newUser) {
        this.email = newUser.email
        this.firstName = newUser.firstName
        this.lastName = newUser.lastName
        this.username = newUser.username
        this.password = newUser.password
        this.pool = pool
        this.valid = false
    }

    async connect() {
        try {
            const connection = await pool.getConnection()
            return connection
        } catch (error) {
            throw new Error(error)
        }
    }

    static async connect() {
        try {
            const connection = await pool.getConnection()
            return connection
        } catch (error) {
            throw new Error(error)
        }
    }

    //CREATE NEW USER
    //Checks if data of new user is valid. Password is checked before creating new object
    async isValid() {
        try {
            if (!this.email || !this.firstName || !this.lastName || !this.username) {
                throw "One or more inputs are empty"
            } else {
                const connection = await this.connect()
                const result = await connection.query(`SELECT email, username FROM users WHERE email = '${this.email}' AND username = '${this.username}'`)
                if (result.length === 0) {
                    return true
                } else {
                    throw "User in database"
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async passwordHash(password) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            this.password = hash
        } catch (error) {
            throw new Error(error)
        }
    }

    async createNewUser() {
        try {
            await this.isValid()
            await this.passwordHash(this.password)
            await this.saveUser()
        } catch (error) {
            throw error
        }
    }

    async saveUser() {
        try {
            const connection = await this.connect()
            await connection.query(`INSERT INTO users (email, firstname, lastname, username, password) 
            VALUES (
                "${this.email}",
                "${this.firstName}",
                "${this.lastName}",
                "${this.username}",
                "${this.password}")
            `)
        } catch (error) {
            throw new Error(error)
        }
    }

    //FIND USER
    static async find(query) {
        try {
            const connection = await this.connect()
            const response = await connection.query(`SELECT * FROM users WHERE ${query}`)
            if (response[0]) {

                const user = new User({
                    email: response[0].email,
                    firstName: response[0].firstname,
                    lastName: response[0].lastname,
                    username: response[0].username,
                    password: response[0].password
                })
                return user
            } else {
                throw new Error("User not found")
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async checkPassword(password) {
        const isPasswordSame = await bcrypt.compare(password, this.password)
        if (isPasswordSame) {
            return isPasswordSame
        } else {
            throw new Error("Error while comparing passwords")
        }
    }

    static async findAuth(query, password) {
        try {
            const user = await this.find(query)
            if (await user.checkPassword(password)) {
                return user
            } else {
                throw "Wrong password"
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = User