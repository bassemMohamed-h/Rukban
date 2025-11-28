import { validateRef } from "../utils/validateRef.js";
import { validateRefArray } from "../utils/validateRefArrays.js";
export default (Model, id, options = {
    getPopulate:        [{path:"", select:""}],         // get all populate fields
    checkRef:           [{ModelCheck:"", idToCheck:""}],    // check if the ref is alraedy exist in DB
    checkRefsArray:     [{ModelCheck:"", idToCheck:""}],    
    restrictDelete :    [{ModelCheck:"", idToDelete:""}]     // check if the collection depend on another collection  restrict delete
}) => {
    return{
        
        getAll : async (req, res) => {
            try {
                // Parse filter object (if provided)
                let filter = {};
                if (req.query.filter) {
                try {
                    filter = JSON.parse(req.query.filter);                    
                } catch (error) {
                    return res.status(400).json({ message: "Invalid filter format" });
                }
                }
                const mergedFilter = {...filter, ...req.scopeFilter}                
                // Sorting (e.g. ?sort=name or ?sort=-createdAt)
                let sort = {};
                if (req.query.sort) {
                const sortField = req.query.sort.startsWith("-")
                    ? req.query.sort.substring(1)
                    : req.query.sort;
                const sortOrder = req.query.sort.startsWith("-") ? -1 : 1;
                sort[sortField] = sortOrder;
                }
                // Pagination
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;
                //get populate
                if (Model.modelName ==="user") {
                    var pop = [];
                } else {    
                    var pop = [
                    {path:"createdBy",select:"username"},
                    {path:"modifiedBy",select:"username"}
                ];}
                if(options.getPopulate?.length){
                    for (const {path,select} of options.getPopulate) {
                        pop.push({path,select});
                    }
                }
                // Query the database
                const totalDocuments = await Model.countDocuments(mergedFilter);
                
                const data = await Model.find(mergedFilter)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit)
                    .populate(pop)
                // Send result with pagination info
                res.status(200).json({
                total: totalDocuments,
                page,
                limit,
                totalPages: Math.ceil(totalDocuments / limit),
                count: data.length,
                data,
                });
            } catch (error) {
                console.log({error});
                return res.status(400).json({message:"erorr while fetching data"})
            }

        },
        getOne : async (req, res) => {
            //check populate
            if (Model.modelName ==="user") {
                var pop = [
                    {path:"modifiedBy",select:"username"}
                ];
            } else {    
                var pop = [
                    {path:"createdBy",select:"username"},
                    {path:"modifiedBy",select:"username"}
            ];}            
            if(options.getPopulate?.length){
            for (const {path,select} of options.getPopulate) {
                pop.push({path,select});
            }
            }
            const doc = await Model.findOne({ _id: req.params[id] }).populate(pop);
            if (!doc) return res.status(404).json({ message: 'Not found' });
            res.json({ data: doc });
        },
        create : async (req, res) => {
        // validate ref
        if(options.checkRef?.length){
            for(const {idToCheck,ModelCheck} of options.checkRef){
                if(req.body[idToCheck]){
                await validateRef(ModelCheck,req.body[idToCheck],idToCheck)
                }
            }
        }
        // Validate array refs
        if(options.checkRefsArray?.length){
            for (const { idToCheck, ModelCheck } of options.checkRefsArray) {
                if (req.body[idToCheck]) {
                await validateRefArray(ModelCheck, req.body[idToCheck], idToCheck);
                }
            }
        }
        const createdData = {
            ...req.body,
            createdBy: req.user?._id || null
        }
        await Model.create(createdData);
        res.status(201).json({ message: "success"});
        },
        update :async (req, res) => {
            // validate ref
            if(options.checkRef?.length){
                for(const {idToCheck,ModelCheck} of options.checkRef){
                    if(req.body[idToCheck]){
                        await validateRef(ModelCheck,req.body[idToCheck],idToCheck)
                    }
                }
            }
            // Validate array refs
            if(options.checkRefsArray?.length){
                for (const { idToCheck, ModelCheck } of options.checkRefsArray) {
                    if (req.body[idToCheck]) {
                        await validateRefArray(ModelCheck, req.body[idToCheck], idToCheck);
                    }
                }
            }
            const updatedData = {
            ...req.body,
            modifiedBy:req.user?._id || null
            }
            const updated = await Model.findByIdAndUpdate(req.params[id], updatedData,
                 { new: true, runValidators: true, context:{employeeId: req.params[id]}});
            if (!updated) return res.status(404).json({ message: 'Not found' });
            res.json({ message: "success" });
        },
        remove : async (req, res) => {
            try {
                 // Validate restrict delete
            if(options.restrictDelete?.length) {
                console.log(`restricted Fired length:${options.restrictDelete.length}`);
                for (const {ModelCheck,idToDelete} of options.restrictDelete) {
                    if(ModelCheck){
                        const count = await ModelCheck.countDocuments({ [idToDelete]: req.params[id] })
                        console.log({count});
                        if(count) return res.status(400).json({message:`can't delete ${idToDelete} it is not empty`})
                    }else {
                        return res.status(400).json({message:"No Model Found"})
                    }
                }
            }
            // const removed = await Model.findOneAndDelete({_id:req.params[id]});
            // if (!removed) return res.status(404).json({ message: 'Not found' });
            res.json({ message:"success"});
            } catch (error) {
                console.log(error);
                res.json.status(400).json("catch erorr while remove")
            }
           
        }
    }
}