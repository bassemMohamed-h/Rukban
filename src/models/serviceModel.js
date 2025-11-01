import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
    },

    description: {
      type: String,
      trim: true,
    },

    // Minimum expected price for the service
    minPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Maximum expected price for the service
    maxPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Category helps group services (e.g., "Marketing", "Design", "Development")
    category: {
      type: String,
      trim: true,
    },
    packages: [{ type: mongoose.Types.ObjectId, ref: 'Package' }], // many-to-many
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }],       // many-to-many
    materials: [{ type: mongoose.Types.ObjectId, ref: 'Material' }],// many-to-many
    // Created & modified by users/employees
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: false,
    },

    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: false,
    },

    // Optional: mark active/inactive services
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// // Service → packages
// serviceSchema.virtual('packages', {
//   ref: 'packageModel',
//   localField: '_id',
//   foreignField: 'services'
// });

// // Service → tasks
// serviceSchema.virtual('tasks', {
//   ref: 'taskModel',
//   localField: '_id',
//   foreignField: 'services'
// });

// // Service → materials
// serviceSchema.virtual('materials', {
//   ref: 'materialModel',
//   localField: '_id',
//   foreignField: 'services'
// });
serviceSchema.set("toObject", { virtuals: true });
serviceSchema.set("toJSON", { virtuals: true });

const serviceModel = mongoose.model("service", serviceSchema);
export default serviceModel;
