const bcrypt = require("bcrypt");

const { UserProvider } = require("../providers/user.provider");
/**
 *Controls flow of user data
 */
class UserController {
  /**
   * deletes data unnecessary for client form UserModel like passwords
   * @param {UserModel} user
   */
  sanitizeUser(user) {
    delete user.password;
    return user;
  }
  /**
   * Replaces UserModel password with a hash
   * @param {UserModel} user
   */
  async passwordHash(user) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * Uses bcrypt to compare password given by client and password in UserModel
   * @param {String} password
   * @param {UserModel} user
   */
  async comparePasswords(password, user) {
    try {
      const isComparable = await bcrypt.compare(password, user.password);
      return isComparable;
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Gets User data to display as contact
   * @param {String} userId
   */
  async getTargetedUser(userId) {
    try {
      const user = await UserProvider.getById(userId);
      const result = {
        id: user.id,
        username: user.username
      };
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Checks if user data given by client matches one in db
   * @param {UserModel} user
   */
  async checkUser(user) {
    try {
      const result = await UserProvider.getById(user);
      if (result) {
        return true, null;
      } else {
        return false, null;
      }
    } catch (error) {
      console.error(error.message);
      return null, error;
    }
  }
  /**
   * Uses RegExp with string given by client in contact search input to find Users similar to clients input
   * @param {String} data
   */
  async userSimilarSearch(data) {
    try {
      if (data === "") {
        return null;
      }
      const result = await UserProvider.getByUsername(new RegExp(`${data}`));
      const response = result.map(item => {
        return {
          username: item.username,
          id: item.id
        };
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = { UserController: new UserController() };
