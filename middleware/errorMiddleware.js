class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;// Marks this as an expected operational error
    }
}

// Global Error Handling Middleware
const errorHandler = (err, req , res ,next)=>{
    console.error(`[Error] ${err.message}`);

    // Default to 500 Internal Server Error if no status code is set
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message:err.message || 'Something went wrong'
    })
    
}

module.exports = {AppError , errorHandler };


