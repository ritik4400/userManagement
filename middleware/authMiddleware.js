const { AppError } = require("./errorMiddleware");
const jwt = require("jsonwebtoken");

const secret_key = process.env.JWT_SECRET || "mySecret";
// const blackListedToken = [""];


function validateToken(req, res, next) {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // if (!token) return next(new AppError("Access Denied", 401));
  if(!token) return res.status(401).json({message:'Access Denied'});
  // if(blackListedToken.includes(token)){
  //     return next(new AppError('Token is blackListed', 403))
  // }
  try {
    const verified = jwt.verify(token, secret_key);
    req.user = verified;//Access granted
    next();
  } catch (error) {
    res.status(400).json({
      success:false,
      message:"Invalid Token"
    })
  }
}

function authorizeRoles(...allowedRoles){
  return (req,res , next) =>{
    if(!allowedRoles.includes(req.user.role)){
      // return next(new AppError("Forbidden: You don’t have permission" , 403))
      return res.status(403).json({message:"Forbidden: You don’t have permission"});
    }
    next();//authorized
  }
}

module.exports = {
  validateToken,
  authorizeRoles
};
