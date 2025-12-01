import User from "./User.js";
import Role from "./Role.js";
import UserHasRole from "./UserHasRole.js";
import RoleHasPermission from "./RoleHasPermission.js";
import Permission from "./Permission.js";

User.belongsToMany(Role, { through: UserHasRole, foreignKey: "user_ID" });
Role.belongsToMany(User, { through: UserHasRole, foreignKey: "role_ID" });

User.hasMany(UserHasRole, { foreignKey: "user_ID" });
UserHasRole.belongsTo(User, { foreignKey: "user_ID" });
Role.hasMany(UserHasRole, { foreignKey: "role_ID" });
UserHasRole.belongsTo(Role, { foreignKey: "role_ID" });

Role.belongsToMany(Permission, {
  through: RoleHasPermission,
  foreignKey: "role_ID",
});
Permission.belongsToMany(Role, {
  through: RoleHasPermission,
  foreignKey: "permission_ID",
});

export { User, Role, UserHasRole, RoleHasPermission, Permission };
