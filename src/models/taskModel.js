import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title:          {type: String, required: true, unique:true },
    desc:           {type: String },
    taskLink:       {type:String},
    assignedTo:     {type: mongoose.Types.ObjectId, ref: 'user',   required:true}, // one employee per task
    serviceId:      {type: mongoose.Types.ObjectId, ref: 'service', required:true},
    packageId:      {type: mongoose.Types.ObjectId, ref: 'package', required:true},
    projectId:      {type: mongoose.Types.ObjectId, ref: 'project', required:true},
    status:         {type: String, enum: ['todo','in-progress','done'], default: 'todo'},
    priority:       {type: String, enum: ["low", "medium", "high"],     default: "low",},
    startDate:      {type: Date, default: Date.now},
    dueDate:        {type: Date, default: Date.now},
    completedAt:    {type: Date},
    createdBy:      {type: mongoose.Types.ObjectId, ref: "user"},
    modifiedBy:     {type: mongoose.Types.ObjectId, ref: "user"},
    isActive:       {type: Boolean, default: true},
},
{timestamps: true,}
);
taskSchema.set("toObject", { virtuals: true });
taskSchema.set("toJSON", { virtuals: true });
export default mongoose.model("task", taskSchema);
