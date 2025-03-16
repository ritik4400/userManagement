const { AppError, errorHandler } = require("../middleware/errorMiddleware");
const DB_Users = require("../model/userModel");

// Super Admin can update user roles
const updateRole = async (req,res,next) =>{
  try {
    const { role } = req.body;
    if(!['user' , 'admin' , 'superAdmin'].includes(role)){
        return next(new AppError('Invalid role' , 400))
    };

    const user = await DB_Users.findByIdAndUpdate(req.params.id , {role} , {new:true} ) ;
    if (!user) return next(new AppError("User not found", 404));

    res.status(200).json({
        success: true,
        message: "Role updated",
        data: user,
      });
  } catch (error) {
    next(error);
  }
}


module.exports = {
    updateRole
    
}