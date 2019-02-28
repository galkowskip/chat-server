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

            return 1
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
}

module.exports = User