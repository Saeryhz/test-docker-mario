import { format, createLogger, transports, addColors } from 'winston';

const { timestamp, combine } = format;

const loggerConfig = {
    levels: {
        error: 0,
        warn: 1,
        debug: 2,
        info: 3
    },
    colors: {
        error: 'white redBG',
        warn: 'black yellowBG',
        debug: 'bold magenta',
        info: 'cyan'
    }
};

const logger = createLogger({
    levels: loggerConfig.levels,
    format: combine(
        timestamp({ format: 'HH:mm:ss' }),
        format.printf(msg =>
            format.colorize().colorize(msg.level, `[${msg.timestamp}] ${msg.level.toUpperCase()}: ${msg.stack || msg.message}`)
        )
    ),
    transports: [new transports.Console()]
});

addColors(loggerConfig.colors);

export default logger;