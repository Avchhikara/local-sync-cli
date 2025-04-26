var winston = require("winston");
require("winston-daily-rotate-file");

const fileRotateTransport = new (winston.transports.DailyRotateFile)({
    filename: "./app_logs/application_logs-%DATE%.log",
    datePattern: 'YYYY-MM-DD-HH',
    maxFiles: '30d',
    json: false,
    append: true
})

export class Logger {
    static logger = null;

    static getLogger() {
        if (Logger.logger) {
            return Logger.logger;
        }

        Logger.logger = winston.createLogger({
            level: 'info',
            defaultMeta: { service: 'local-sync' },
            format: winston.format.combine(
                winston.format.timestamp(), // Add timestamps
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
            transports: [
                new winston.transports.Console(),
                fileRotateTransport
            ],
            exitOnError: false
        });

        return Logger.logger;
    }
}