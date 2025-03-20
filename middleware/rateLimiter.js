// const client = require('../config/redis')

// const rateLimiter = async (req,res,next) =>{
//     const ip = req.ip;
//     const limiter = 10; // Max requests
//     const window = 60; // Time window in seconds

//     try {
//         const requests = await client.incr(ip);
    
//         if(requests === 1){
//             await client.expire(ip , window);// Set expiration if first request
//         }
//         if (requests > limit) {
//             return res.status(429).json({ message: "Too many requests, slow down!" });
//           }
//           next();
    
//     } catch (error) {
//         console.error("Rate Limiter Error:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }



// module.exports = rateLimiter;