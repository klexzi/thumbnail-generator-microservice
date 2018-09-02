const winston = require("winston");

//an exported function to handle all logs in the entire project
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    //write all logs with level 'info' to info.log
    // write all error logs to 'error.log'
    new winston.transports.File({
      filename: "errors.log",
      level: "error"
    }),
    new winston.transports.File({ filename: "info.log" })
  ]
});

// if we re in development then use 'Console' as a transport
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;
