// Generic CRUD generator for a Mongoose model

const { validateSchemaKeys } = require("../utils/schemaValidator");
const { updateArrays } = require("../utils/updateArraysHelper");

exports.generate = (Model, options = {}) => {
  const idField = options.idField || '_id';

  return {
    getAll: async (req, res) => {
    // ✅ 1. Parse filter object (if provided)
    let filter = {};
    if (req.query.filter) {
      try {
        filter = JSON.parse(req.query.filter);
      } catch (error) {
        return res.status(400).json({ message: "Invalid filter format" });
      }
    }

    // ✅ 2. Sorting (e.g. ?sort=name or ?sort=-createdAt)
    let sort = {};
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith("-")
        ? req.query.sort.substring(1)
        : req.query.sort;
      const sortOrder = req.query.sort.startsWith("-") ? -1 : 1;
      sort[sortField] = sortOrder;
    }

    // ✅ 3. Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ✅ 4. Query the database
    const totalDocuments = await Model.countDocuments(filter);
    const data = await Model.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // ✅ 5. Send result with pagination info
    res.status(200).json({
      total: totalDocuments,
      page,
      limit,
      totalPages: Math.ceil(totalDocuments / limit),
      count: data.length,
      data,
    });
  },

    getOne: async (req, res) => {
      const doc = await Model.findOne({ [idField]: req.params.id });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ data: doc });
    },

    create: async (req, res) => {
      validateSchemaKeys(Model.schema, req.body);
      const created = await Model.create(req.body);
      res.status(201).json({ data: created });
    },

    update: async (req, res) => {
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ message: 'Not found' });
      res.json({ data: updated });
    },
    
    remove: async (req, res) => {
      const removed = await Model.findByIdAndDelete(req.params.id);
      if (!removed) return res.status(404).json({ message: 'Not found' });
      res.json({ data: removed });
    },
    updateArrays: async(req,res) =>{
      validateSchemaKeys(Model.schema, req.body);
      const updated = await updateArrays(Model,req.params.id,req.body);
      res.json({ data: updated });
    }
  };
};
