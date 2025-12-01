// RoleController.js
import RoleService from "../services/RoleService.js";

class RoleController {
  getAll = async (req, res) => {
    try {
      const listRoles = await new RoleService().getAllRoles();

      return res.status(200).json({
        message: "Get roles success",
        data: listRoles,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default RoleController;
