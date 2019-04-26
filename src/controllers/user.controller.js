const bcrypt = require("bcrypt");

const { UserProvider } = require("../providers/user.provider");

class UserController {
  sanitizeUser(user) {
    console.log(user);
    delete user.password;
    console.log(user);
    return user;
  }
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
