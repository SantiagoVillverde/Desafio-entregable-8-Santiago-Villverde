import userModel from "../models/user.model.js";

class UserManager {
  constructor() {
    this.model = userModel;
  }

  async getAll() {
    return await this.model.find();
  }

  async getByEmail(email) {
    return await this.model.findOne({ email: email });
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async createUser(userData) {
    return await this.model.create(userData);
  }
}

const userManager = new UserManager;
export default userManager;