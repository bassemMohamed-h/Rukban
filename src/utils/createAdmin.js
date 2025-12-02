import roleModel from "../models/roleModel.js";
import userModel from "../models/userModel.js";
import { AppError } from "./AppError.js";
const createAdmin = async ()=>{
    try {
        var roleID = await roleModel.find({name:"System Admin"}).select('_id');        
        if(!roleID?.length){
            console.log("there is no system admin role");
            await roleModel.create({
                permissions: {
                    departments:  {manage:true},
                    teams:        {manage:true},
                    subTeams:     {manage:true},
                    tasks:        {manage:true},
                    services:     {manage:true},
                    materials:    {manage:true},
                    suppliers:    {manage:true},
                    packages:     {manage:true},
                    projects:     {manage:true},
                    clients:      {manage:true},
                    employees:    {manage:true},
                    users:        {manage:true},
                    roles:        {manage:true},
                },
                restrictedTo:"organization",
                name:"System Admin",
                desc: "defualt system role can manage all system",
            });
            console.log("defualt system admin role created");
            roleID = await roleModel.find({name:"System Admin"}).select('_id ');
        }
        const hasUserRole = await userModel.findOne({roles:roleID}).select("_id username");
        console.log({hasUserRole});
        if(!hasUserRole){
            const hasUser = await userModel.findOneAndUpdate({email:"bassemmohamedha@gmail.com"},{roles:roleID}).select("_id")
            console.log({hasUser});
            if (!hasUser) {
               await userModel.create({
                    username:"bassemMohamed",
                    email:"bassemmohamedha@gmail.com",
                    password:process.env.ADMIN_PASSWORD,
                    roles:roleID,
                    isActive:true
                }); 
                console.log("defualt system admin created"); 
            }
        }
    } catch (error) {
        console.log({error});
        throw new AppError("error while create Admin")
    }
}
export default createAdmin