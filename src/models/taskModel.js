import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
    {
        title:      { type: String, required: true, unique:true },
        desc:       { type: String },
        taskLink:   {type:String},
        assignedTo: { type: mongoose.Types.ObjectId, ref: 'user',   required:true}, // one employee per task
        serviceId:  {type: mongoose.Types.ObjectId, ref: 'service', required:true},
        packageId:  {type: mongoose.Types.ObjectId, ref: 'package', required:true},
        projectId:  {type: mongoose.Types.ObjectId, ref: 'project', required:true},
        status:     { type: String, enum: ['todo','in-progress','done'], default: 'todo' },
        dueDate:    { type: Date },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
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
        ref: "user",
        },
        modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        },
    },
    {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    }
);

// Task → services
taskSchema.virtual('service', {
  ref: 'service',
  localField: '_id',
  foreignField: 'serviceId'
});
// // Task → employee
// taskSchema.virtual('employee', {
//   ref: 'employeeModel',
//   localField: 'assignedTo',
//   foreignField: '_id',
//   justOne: true
// });
taskSchema.set("toObject", { virtuals: true });
taskSchema.set("toJSON", { virtuals: true });


export default mongoose.model("task", taskSchema);
