const logger  = require("../../config/logger");
const { AppError, errorHandler } = require("../../middleware/errorMiddleware");
const Users = require("../../model/userModel");
const {userSchema , userIdSchema , updateUserSchema , updateProfileSchema }= require('../../validations/user/userValidation')

// POST (Create) a new user
const createUser = async (req, res, next) => {
  
  try {
    const { name, email , password } = req.body;

    logger.info("received request to create user")

    // Validate request
    const {error } = userSchema.validate(req.body);

  if (error) {
    logger.warn("Validation failed" , {errors: error.details.map(err => err.message)})
    return res.status(400).json({
      success: false,
      errors: error.details.map(err => err.message)
  });
  }

    if (!name || !email  || !password) 
      // return next(new AppError("Name and email not found", 400));
    logger.warn("Missing required field" , {name , email})
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
    logger.info("User created successfully" , {user:newUser._id})
    res.status(201).json(newUser);
  } catch (error) {
    logger.error("Error creating user" , {error:error.message})
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
    logger.info("Fetching user data" , {userId:req.params.id})

    const user = await Users.findById(req.params.id);
    const {error} = userIdSchema.validate(req.params);
    if(error){

      logger.warn("Invalid userId format",{userId:req.params.id ,message:error.details[0].message } )
      return res.status(400).json({message:error.details[0].message})
    }
    if (!user){
      logger.warn("user not found", {userId: req.params.id})
      return next(new AppError("user not found", 404));
    } 

    logger.info("User data fetched successfully", {userId:req.params.id})

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error("Error fetching user data", { error: error.message });
    next(error);
  }
};
//update data
const updateData = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const {error} = updateUserSchema.validate(req.body);
    if(error){
      return res.status(400).json({message:error.details[0].message})
    }
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

  const {error} = updateProfileSchema.validate(req.body);
    if(error){
      return res.status(400).json({message:error.details[0].message})
    }

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
