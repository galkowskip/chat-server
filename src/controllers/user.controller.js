const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

class UserController {
  async passwordHash(user) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (error) {
      throw new Error(error);
    }
  }

  async comparePasswords(password, user) {
    try {
      return await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTargetedUser(userId) {
    try {
      let user = UserModel.findById(userId);
      user = await user.exec();
      const result = {
        id: user.id,
        username: user.username
      };
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async checkUser(user) {
    try {
      const query = UserModel.findById(user);
      const result = await query.exec();
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

  async userSimilarSearch(data) {
    try {
      if (data === "") {
        return null;
      }
      const query = UserModel.find({
        username: new RegExp(`${data}`)
      });
      const result = await query.exec();
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
