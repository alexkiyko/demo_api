const winston = require('winston');
 
const config = {
    level: 'info',
    format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
    transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
        // new winston.transports.Console({
        //     level: 'info',
        //     format: `${level.info} JSON.stringify({ ...rest }) `
        // }),
        // new winston.transports.File({ 
        //     filename: 'logs/error.log',
        //     level: 'info',
        //     maxsize: 5242880,
        //     maxFiles: 5
        // }),
        // new winston.transports.File({ filename: 'logs/combined.log' }),
        
    ]
}

const logger = winston.createLogger(config);
 
// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// // if (process.env.NODE_ENV !== 'production') {
// //   logger.add(new winston.transports.Console({
// //     format: winston.format.simple(),
// //   }));
// // }

// -------------
module.exports = logger;