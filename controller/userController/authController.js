const { AppError, errorHandler } = require("../../middleware/errorMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const DB_Users = require("../../model/userModel");


const secret_key =   process.env.JWT_SECRET || "mySecret";

const login = async (req, res, next) => {
  try {
    const { email , password } = req.body;
    // const user = users.find((u) => u.email === email);
    const user = await DB_Users.findOne({email : req.body.email});
    if (!user) return next(new AppError("Invalid email", 401));

    const validpassword = await bcrypt.compare(req.body.password , user.password);
    if (!validpassword) return next(new AppError("Invalid password", 400));

    const token = jwt.sign({ id: user.id, role: user.role }, secret_key, {
      expiresIn: "1h",
    });
    res.status(200).json({message : 'Login successful' , token})
  } catch (error) {
    next(error);
  }
};

const blackListedToken = [];

const logout = (req,res,next) =>{
  try {
    const token = req.headers['authorization']?.split(" ")[1];

  if (!token) return next(new AppError("No token provided", 400));

  blackListedToken.push(token);

  res.status(200).json({message:"Logged out successfully"})
  } catch (error) {
    next(new AppError("Logout Failed", 500));
  }
  
}


module.exports = {
  login,
  logout
}
