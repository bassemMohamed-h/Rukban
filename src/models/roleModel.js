import mongoose from "mongoose";

// 🔸 Reusable schema for action permissions
const actionsSchema = new mongoose.Schema({
  manage: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  display: { type: Boolean, default: false },
  manageOne: { type: Boolean, default: false },
  updateOne: { type: Boolean, default: false },
  displayOne: { type: Boolean, default: false }
}, { _id: false });

// 🔸 Role schema
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

  // 🔸 All permissions grouped by resource
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
  },

  // 🔸 Role restriction scope
  restrictedTo: {
    type: String,
    enum: ["organization", "department", "team", "subTeam"],
    default: "subTeam"
  },

  // 🔸 Role restriction scope for spacific department
  restrictedDepartment: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "department",
  default: null
},

  // 🔸 Audit fields
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },

  // 🔸 Active flag
  isActive: { type: Boolean, default: false }

}, { timestamps: true });

// 🔸 Virtual relation (optional)
roleSchema.virtual("employees", {
  ref: "employee",
  localField: "_id",
  foreignField: "role"
});

// 🔸 Enable virtuals in outputs
roleSchema.set("toObject", { virtuals: true });
roleSchema.set("toJSON", { virtuals: true });

export default mongoose.model("role", roleSchema);
