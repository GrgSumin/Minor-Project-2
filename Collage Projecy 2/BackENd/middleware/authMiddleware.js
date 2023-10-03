const User = require("../model/User")
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.header?.authorization?.startsWith("Bearer")){ // "Bearer" refers to a type of token-based authentication scheme.
        token = req.header.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                console.log(decoded);
            }
        }
        catch(error){
            console.log(error);
            console.log("Not authorized token expired, please login again")
        }
    }
    else{
        throw new Error("There is no token attached")
    }
});
const isAdmin = asyncHandler(async(req,res,next)=>{
    const {Email} = req.user;
    const adminUser = await User.findOne({Email});
    if(adminUser.Role !== "admin"){
        console.log("you are not admin");
    }
    else{
        next();
    }

})
module.exports = {authMiddleware, isAdmin};