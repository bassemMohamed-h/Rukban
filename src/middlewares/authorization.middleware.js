import jwt from "jsonwebtoken"
import roleModel from "../models/roleModel.js";
import { roleCache } from "../utils/roleCache.js";
import departmentModel from "../models/departmentModel.js";
import teamModel from "../models/teamModel.js";
import subTeamModel from "../models/subTeamModel.js";
import userModel from "../models/userModel.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(`${process.env.BEARER_TOKEN}`)) return res.status(401).json({ message: 'Not Authenticated'});
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET,);    
    if(!payload)  return res.status(401).json({ message: 'Not Authenticated' });
    const user = await userModel.findById(payload._id);
    if(!user) return res.status(404).json({message:"User Not Found"})         
    req.user = user;
    next();
  } catch (error) {
    console.log({error});
    next(error);
  }
};
export const sections = {
    departments:"departments",
    teams:        "teams",
    subTeams:     "subTeams",
    tasks:        "tasks",
    services:     "services",
    materials:    "materials",
    suppliers:    "suppliers",
    packages:     "packages",
    projects:     "projects",
    clients:      "clients",
    employees:    "employees",
    roles:        "roles",
    users:        "users"
  }
  export const actions = {
    manage:     "manage",
    update:     "update",
    display:    "display",
    manageOne:  "manageOne",
    updateOne:  "updateOne",
    displayOne: "displayOne"
  }
export const authorize = (section, action) => async (req, res, next) => {
  try{
    // Step 1: Must be authenticated
    if (!req.user) return res.status(401).json({ message: 'Not Authenticated' });
    const user = req.user;    
    let allRoles =  roleCache.get() || []
    // Step 2: Ensure roles are loaded (from cache or DB)
    if (!roleCache.isValid()) {
        console.log("⚙️ Loading roles from DB (cache miss)");
        allRoles = await roleModel.find({});
        roleCache.set(allRoles);
    }
    // Step 3: Get this user's roles
    const userRoles = allRoles.filter((role)=>{      
      const match = user.roles.some(rid=>String(rid)===String(role._id) && role.isActive)
      console.log({roleID: role._id,roleName:role.name, userRoleID:user.roles, match});
      return match     
    })
    if (!userRoles.length) return res.status(403).json ({ message:"No valid roles assigned"});
    // Step 4: Check permission
    //console.log({userRoles});
    
    const isAuthorized = userRoles.filter((role)=>{
      const perms = role.permissions?.[section] 
      console.log({userPerms: user.roles, permsName:role.name, perms});
      return (perms?.manage || perms?.manageOne || (perms && (perms[action]))) 
    })
    console.log({user:user.username, isAuthorized, section, action});
    if(!isAuthorized.length) return res.status(403).json ({message:"Access denied. Missing permission"})
    // Step 5: Auto-detect and load target scope
    let target = { department: null, team: null, subTeam: null };
    if (req.params.departmentId) {
      const dept = await departmentModel.findById(req.params.departmentId).select("_id");
      if (!dept) return res.status(404).json({ message: "Department not found" });
      target.department = dept._id.toString()
    }        
    if (req.params.teamId) {
      const team = await teamModel.findById(req.params.teamId).select("_id departmentId");
      if (!team) return res.status(404).json({ message: "Team not found" });
      target.team = team._id.toString();
      target.department = team.departmentId?.toString();
    }
    if (req.params.subTeamId) {
      const subTeam = await subTeamModel.findById(req.params.subTeamId).select("_id teamId departmentId")
      if (!subTeam) return res.status(404).json({ message: "SubTeam not found" });
      target.subTeam = subTeam._id.toString();
      target.team = subTeam.teamId?.toString();
      target.department = subTeam.departmentId?.toString();
    }
    // Step 6: Scope restriction check  
    let isWithinScope = false;
    for(const role of isAuthorized){
      console.log({role:role.name, restrictedTo:role.restrictedTo});
      const scope = role.restrictedTo;
      const deptId = user.departmentId?.toString();
      const teamId = user.teamId?.toString();
      const subTeamId = user.subTeamId?.toString();
      const {baseUrl,method} = req
      console.log({scope, baseUrl, params:target.subTeam, method});
      switch (scope) {        
        case "organization":
          isWithinScope = true;
          break;
        case "department":
          if(baseUrl.endsWith('/departments')){
            if (!target.department) {
              if (method === "POST") {
                 return res.status(403).json({ message: 'No Authorization' });
              }else if(method === "GET"){
                req.scopeFilter = {_id:deptId}; 
                isWithinScope = true;
              }else{
                res.json.status(404).json("Params Not Found")
              }  
            }else {
              if (target.department===deptId) {
                isWithinScope = true
              } else {
                return res.status(403).json({message: "Not Authorization"})
              }
            }
          }else if(baseUrl.endsWith('/teams')){
            if (!target.team) {
              if (method === "POST"){
                if(req.body?.departmentId !== deptId){
                 return res.status(404).json({ message: 'Wrong Assignment Department' })  
                }else{
                isWithinScope = true;
              }                         
              }else if(method==="GET"){
              req.scopeFilter = {departmentId:deptId}
              isWithinScope = true;
              }else{
                return res.status(404).json({ message: 'Params Found' })
              }
            }else {
              if (target.department===deptId) {
                if(method === "GET"){
                  req.scopeFilter = {departmentId:deptId}
                  isWithinScope = true
                }else if(method === "PUT" || method === "PATCH"){
                  if(req?.body?.departmentId !== deptId){
                    return res.status(403).json({ message: "Not Authorized To Change Department "})
                  }else{
                    isWithinScope = true
                  }
                }else if(method === "DELETE"){
                  isWithinScope = true
                }
              } else {
                return res.status(403).json({ message: "Not Authorized"})
              }
            }
            
          }else if(baseUrl.endsWith('/subteams')){
            if (!target.subTeam) {
              if (method === "POST") {
                if(req.body?.departmentId !== deptId){
                return res.status(403).json({ message: 'Not Authorized To Create Sub Team In Another Department'})
                }else if(req.body?.teamId !== teamId){
                  if(teamId){
                    return res.status(403).json({ message: 'Not Authorized To Create Sub Team In Another Team' })
                  }else{
                    const findTeam = await teamModel.findOne({departmentId:deptId}).select("departmentId")                  
                    if(!findTeam){return res.status(404).json({ message: 'Not Authorized To Create Sub Team In Another Team' })}
                    else{isWithinScope = true;} 
                  }
                }else{
                isWithinScope = true
              }
            }else if(method==="GET"){
              if (subTeamId) {
                req.scopeFilter = {teamId}
                isWithinScope = true;
              } else {
                req.scopeFilter = {departmentId:deptId}
                isWithinScope = true;
              }
            }else{
              return res.status(404).json({ message: 'Params Found' })
            }
            }else {
              if (target.department===deptId) {
                if(method === "GET"){
                  if (subTeamId) {
                    req.scopeFilter = {teamId}
                    isWithinScope = true;
                  } else {
                    req.scopeFilter = {departmentId:deptId}
                    isWithinScope = true;
                  }
                }else if(method === "PUT" || method === "PATCH"){
                  if(req?.body?.departmentId !== deptId){
                    return res.status(403).json({ message: "Not Authorized To Change Department "})
                  }else if(req?.body?.teamId !== teamId){
                    return res.status(403).json({ message: "Not Authorized To Change Team"})
                  }else{
                    isWithinScope = true
                  }
                }else if(method === "DELETE"){
                  isWithinScope = true
                }
              } else {
                return res.status(403).json({ message: "Not Authorized"})
              }
            } 
          }else{
            isWithinScope = false
          }
          break
        case "team":
           if(baseUrl.endsWith('/teams')){
            if (!target.team) {
              if (method === "POST"){
                if(req.body?.departmentId !== deptId){
                 return res.status(404).json({ message: 'Wrong Assignment Department' })  
                }else{
                isWithinScope = true;
              }                         
              }else if(method==="GET"){
              req.scopeFilter = {_id:teamId}
              isWithinScope = true;
              }else{
                return res.status(404).json({ message: 'Params Found' })
              }
            }else {
              if (target.team===teamId) {
                if(method === "GET"){
                  req.scopeFilter = {_id:teamId}
                  isWithinScope = true
                }else if(method === "PUT" || method === "PATCH"){
                  if(req?.body?.departmentId !== deptId){
                    return res.status(403).json({ message: "Not Authorized To Change Department "})
                  }else{
                    isWithinScope = true
                  }
                }else if(method === "DELETE"){
                  isWithinScope = true
                }
              } else {
                return res.status(403).json({ message: "Not Authorized"})
              }
            }
            
          }else if(baseUrl.endsWith('/subteams')){
            if (!target.subTeam) {
              if (method === "POST") {
                if(req.body?.departmentId !== deptId){
                return res.status(403).json({ message: 'Not Authorized To Create Sub Team In Another Department'})
                }else if(req.body?.teamId !== teamId){
                  if(teamId){
                    return res.status(403).json({ message: 'Not Authorized To Create Sub Team In Another Team' })
                  }else{
                    const findTeam = await teamModel.findOne({departmentId:deptId}).select("departmentId")                  
                    if(!findTeam){return res.status(404).json({ message: 'Not Authorized To Create Sub Team In Another Team' })}
                    else{isWithinScope = true;} 
                  }
                }else{
                isWithinScope = true
              }
            }else if(method==="GET"){
              req.scopeFilter = {teamId}
              isWithinScope = true;
            }else{
              return res.status(404).json({ message: 'Params Found' })
            }
            }else {
              if (target.team===teamId) {
                if(method === "GET"){
                  req.scopeFilter = {teamId}
                  isWithinScope = true
                }else if(method === "PUT" || method === "PATCH"){
                  if(req?.body?.departmentId !== deptId){
                    return res.status(403).json({ message: "Not Authorized To Change Department "})
                  }else if(req?.body?.teamId !== teamId){
                    return res.status(403).json({ message: "Not Authorized To Change Team"})
                  }else{
                    isWithinScope = true
                  }
                }else if(method === "DELETE"){
                  isWithinScope = true
                }
              } else {
                return res.status(403).json({ message: "Not Authorized"})
              }
            } 
          }else{
            isWithinScope = false;
          }
          break
        case "subTeam":
          if(baseUrl.endsWith('/subteams')){
            if (!target.subTeam) {
              if (method === "POST") {
                if(req.body?.departmentId !== deptId){
                return res.status(403).json({ message: 'Not Authorized To Create Sub Team In Another Department'})
                }else if(req.body?.teamId !== teamId){
                  if(teamId){
                    return res.status(403).json({ message: 'Not Authorized To Create Sub Team In Another Team' })
                  }else{
                    const findTeam = await teamModel.findOne({departmentId:deptId}).select("departmentId")                  
                    if(!findTeam){return res.status(404).json({ message: 'Not Authorized To Create Sub Team In Another Team' })}
                    else{isWithinScope = true;} 
                  }
                }else{
                isWithinScope = true
              }
            }else if(method==="GET"){
              req.scopeFilter = {_id:subTeamId}
              isWithinScope = true;
            }else{
              return res.status(404).json({ message: 'Params Found' })
            }
            }else {
              if (target.subTeam===subTeamId) {
                if(method === "GET" || method === "DELETE"){
                  isWithinScope = true
                }else if(method === "PUT" || method === "PATCH"){
                  if(req?.body?.departmentId !== deptId){
                    return res.status(403).json({ message: "Not Authorized To Change Department "})
                  }else if(req?.body?.teamId !== teamId){
                    return res.status(403).json({ message: "Not Authorized To Change Team"})
                  }else{
                    isWithinScope = true
                  }
                }
              } else {
                return res.status(403).json({ message: "Not Authorized"})
              }
            } 
          }else{
            isWithinScope = false;
          }
          break
        // case "user":
        //   if(method === "GET"){
        //     if (!req.params) {
        //       req.scopeFilter = {assignedTo:req.user._id}
        //       isWithinScope = true
        //     } else {
        //       const taskId = req.params;
        //       const isValid = await taskModel.findById(taskId).select("assignedTo");
        //       console.log({userId:isValid, taskId});
               
        //     }
        //   }
        default:
          isWithinScope = false;
      }
      console.log({user:user.username, isWithinScope});
      if(isWithinScope) return next();// Pass through if authorized    
    };
    if (!isWithinScope)
      return res.status(403).json({ message: "Action outside allowed scope" });
  } catch (err) {
    console.error("Authorization error:", err);
    res.status(400).json({ message: "Authorization failed", error: err.message });
  }
};
