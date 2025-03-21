const morgan = require("morgan")
const logger = require('../config/logger');

// Morgan middleware for request logging
const stream = {
    write: (message) => logger.info(message.trim())
};
const httpLogger = morgan("combined" , {stream});

module.exports =  httpLogger;