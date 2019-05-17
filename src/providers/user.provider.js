const { UserModel } = require("../models/user.model");

/**
 *  Provides UserModel data
 */
class UserProvider {
  /**
   * Gets user by his id
   * @param {String} id
   */
  async getById(id) {
    try {
      const user = UserModel.findById(id);
      return await user.exec();
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Gets user by his username
   * @param {String} username
   */
  async getByUsername(username) {
    try {
      const user = UserModel.find({ username: username });
      return await user.exec();
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Gets user by his email
   * @param {String} email
   */
  async getByEmail(email) {
    try {
      const user = UserModel.find({ email: email });
      return await user.exec();
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = { UserProvider: new UserProvider() };
