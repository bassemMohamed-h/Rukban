const Role = require("../models/roleModel");
const { AppError } = require("../utils/AppError");

exports.updateRole = async (id, updateData) => {
  const role = await Role.findById(id);
  if (!role) throw new AppError("Role not found",400);

  // --- Handle permissions updates dynamically ---
  if (Array.isArray(updateData.permissions) && updateData.action==="replace") {
    // Case: Full replacement
    role.permissions = [...new Set(updateData.permissions)];
  } else {
    // Case: Add specific permissions
    if (Array.isArray(updateData.permissions)&& updateData.action==="add") {
      const merged = new Set([
        ...role.permissions,
        ...updateData.permissions,
      ]);
      role.permissions = Array.from(merged);
    }

    // Case: Remove specific permissions
    if (Array.isArray(updateData.permissions)&& updateData.action==="remove") {
      role.permissions = role.permissions.filter(
        (p) => !updateData.permissions.includes(p)
      );
    }
  }

  // --- Automatically update other fields ---
  Object.keys(updateData).forEach((key) => {
    if (
      !["permissions"].includes(key)
    ) {
      role[key] = updateData[key];
    }
  });

  await role.save();
  return role;
};
