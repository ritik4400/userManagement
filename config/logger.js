const winston = require("winston");
const morgan = require("morgan")


// Custom log format
const logFormat =winston.format.printf(({level , message , timestamp , meta}) =>{
    return `${timestamp}[${level.toUpperCase()}]: ${message} ${meta ? JSON.stringify(meta): ""}`;
})

// Winston logger configuration
const logger = winston.createLogger({
    level:"info",// Default log level
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.errors({ stack: true }), // Log error stack traces
        winston.format.splat(), // Support for parameterized messages
        winston.format.json(),
        winston.format.colorize(), // Colorize console output
        logFormat // Apply custom format
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:"logs/app.log"})
    ],
    exceptionHandlers:[
        new winston.transports.File({filename:"logs/exceptions.log.log"})
    ],
    rejectionHandlers:[
        new winston.transports.File({filename:"logs/rejection.log"})
    ]

})
// Morgan middleware for request logging
const stream = {
    write: (message) => logger.info(message.trim())
};
const httpLogger = morgan("combined" , {stream});

// Example logs with different levels
logger.info("Server started successfully");
logger.warn("This is a warning log");
logger.error("An error occurred!", { errorCode: 500, details: "Database connection failed" });

module.exports = {logger , httpLogger};