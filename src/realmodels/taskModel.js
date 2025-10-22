const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        assignedTo: { type: Types.ObjectId, ref: 'Employee', required: true }, // one employee per task
        services: [{ type: Types.ObjectId, ref: 'Service' }], // inverse many-to-many
        status: { type: String, enum: ['todo','in-progress','done'], default: 'todo' },
        dueDate: { type: Date },
        priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
        },
        startDate: {
        type: Date,
        default: Date.now,
        },
        completedAt: {
        type: Date,
        },
        createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        },
        modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        },
    },
    {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    }
);

// Task → services
taskSchema.virtual('services', {
  ref: 'serviceModel',
  localField: '_id',
  foreignField: 'tasks'
});

// Task → employee
taskSchema.virtual('employee', {
  ref: 'employeeModel',
  localField: 'assignedTo',
  foreignField: '_id',
  justOne: true
});
taskSchema.set("toObject", { virtuals: true });
taskSchema.set("toJSON", { virtuals: true });


module.exports = mongoose.model("tasks", taskSchema);
