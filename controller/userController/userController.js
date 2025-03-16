const { AppError, errorHandler } = require("../../middleware/errorMiddleware");
const Users = require("../../model/userModel");


// POST (Create) a new user
const createUser = async (req, res, next) => {
  try {
    const { name, email , password } = req.body;

    if (!name || !email  || !password) 
      // return next(new AppError("Name and email not found", 400));
      return res.status(400).json({
        success : false,
        message: "Name and email not found"
      })
    const newUser = new Users({
      name,
      email,
      password,
      tempPassword : password
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
// GET all users
// const getAllUser = async (req, res, next) => {
//   try {
//     const users = await Users.find();
//     if (!users) return next(new AppError("Users Not Found", 404));
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// };
//Get user by id
const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return next(new AppError("user not found", 404));
    // if(!user) return res.status(404).json({message:'user not found'});
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
//update data
const updateData = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return next(new AppError("User not found", 404));

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.status(200).json({
      success: true,
      message: "user updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
// User can update their own profile
const updateProfile = async(req,res,next) =>{
  try {
      const {name , email} = req.body; 
  const updateUser = await Users.findByIdAndUpdate(req.body.id ,
      {name , email} , {new : true}
  ) ;
  res.status(200).json({
      success: true,
      message: "profile updated",
      data: updateUser,
    });
  } catch (error) {
      next(error)
  }
  

}
//DELETE a user by ID
const removeData = async (req, res, next) => {
  try {
    
    const userExists = await Users.findByIdAndDelete(req.params.id);
    if (!userExists) return next(new AppError("User Not Found", 404));
    //if(!userExists) return next({message:'User Not Found' , status:404});

    res.status(200).json({ success: true , message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateData,
  getUser,
  createUser,
  removeData,
  // getAllUser,
  updateProfile
};
