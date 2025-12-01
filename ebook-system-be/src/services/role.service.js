import { Role } from "../models/index.js";

class RoleService {
  async getAllRoles() {
    try {
      const roles = await Role.findAll({
        attributes: ["id", "name"],
        order: [["name", "ASC"]],
      });
      return roles;
    } catch (error) {
      throw error;
    }
  }
}

export default RoleService;
