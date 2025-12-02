import mongoose from "mongoose";
import { roleCache } from "../utils/roleCache.js";
import { AppError } from "../utils/AppError.js";

// Reusable schema for action permissions
const actionsSchema = new mongoose.Schema({
  manage: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  display: { type: Boolean, default: false },
  manageOne: { type: Boolean, default: false },
  updateOne: { type: Boolean, default: false },
  displayOne: { type: Boolean, default: false }
}, { _id: false });
// Role schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  // All permissions grouped by resource
  permissions: {
    departments:  { type: actionsSchema, default: () => ({}) },
    teams:        { type: actionsSchema, default: () => ({}) },
    subTeams:     { type: actionsSchema, default: () => ({}) },
    tasks:        { type: actionsSchema, default: () => ({}) },
    services:     { type: actionsSchema, default: () => ({}) },
    materials:    { type: actionsSchema, default: () => ({}) },
    suppliers:    { type: actionsSchema, default: () => ({}) },
    packages:     { type: actionsSchema, default: () => ({}) },
    projects:     { type: actionsSchema, default: () => ({}) },
    clients:      { type: actionsSchema, default: () => ({}) },
    employees:    { type: actionsSchema, default: () => ({}) },
    users:        { type: actionsSchema, default: () => ({}) },
    roles:        { type: actionsSchema, default: () => ({}) },
  },
  // Role restriction scope
  restrictedTo: {
    type: String,
    enum: ["organization", "department", "team", "subTeam", "user"],
    default: "user"
  },
  // Role restriction scope for spacific department
  restrictedDepartment: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "department",
  default: null
},
  // Audit fields
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  // Active flag
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
// Enable virtuals in outputs
roleSchema.set("toObject", { virtuals: true });
roleSchema.set("toJSON", { virtuals: true });
// Post hooks to refresh cache automatically
roleSchema.post(["save", "findOneAndUpdate", "findOneAndDelete"], async function () {
  try {
    console.log(" Roles updated, refreshing cache...");
    const Role = mongoose.model("role");
    const allRoles = await Role.find({});
    roleCache.set(allRoles);
  } catch (err) {
    console.error("Error refreshing role cache:", err);
    throw new AppError("error while refreshong roles")
  }
});
export default mongoose.model("role", roleSchema);
