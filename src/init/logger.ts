import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import { Express, Request } from 'express';

const setupLogger = (app: Express) => {
    const logDirectory = path.join(__dirname, '../logs');

    // Create logs directory if not exists
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });
        fs.chmodSync(logDirectory, 0o700); // Secure permissions
    }

    // Setup rotating file streams
    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d',
        path: logDirectory,
        compress: 'gzip',
        maxFiles: 7,
    });

    const errorLogStream = rfs.createStream('error.log', {
        interval: '1d',
        path: logDirectory,
        compress: 'gzip',
        maxFiles: 7,
    });

    // Custom tokens
    morgan.token('real-ip', (req: Request) => {
        return (
            req?.headers?.['x-forwarded-for']
                ?.toString?.()
                ?.split?.(',')?.[0] ||
            req?.socket?.remoteAddress ||
            '-'
        );
    });

    morgan.token('id', (req: Request) => {
        return req.headers['x-correlation-id']?.toString() || '-';
    });

    // Log format
    const logFormat =
        ':date[iso] :id :real-ip - ":method :url" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"';

    // Log only successful requests
    app.use(
        morgan(logFormat, {
            stream: accessLogStream,
            skip: (req, res) => res.statusCode >= 400,
        })
    );

    // Log only failed requests
    app.use(
        morgan(logFormat, {
            stream: errorLogStream,
            skip: (req, res) => res.statusCode < 400,
        })
    );

    // Console logs in non-production
    if (process.env.NODE_ENV !== 'prod') {
        app.use(morgan('dev'));
    }
};

export default setupLogger;
