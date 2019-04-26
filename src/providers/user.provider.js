const { UserModel } = require("../models/user.model");

class UserProvider {
  async getById(id) {
    try {
      const user = UserModel.findById(id);
      return await user.exec();
    } catch (error) {
      console.error(error.message);
    }
  }
  async getByUsername(username) {
    try {
      const user = UserModel.find({ username: username });
      return await user.exec();
    } catch (error) {
      console.error(error.message);
    }
  }
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
