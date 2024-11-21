import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
    // Generate unique request ID
    req.id = uuidv4();

    // Add request ID to response headers
    res.setHeader('X-Request-ID', req.id);

    // Log request details
    logger.info({
        requestId: req.id,
        method: req.method,
        path: req.path,
        query: req.query,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        user: req.user ? req.user.id : 'anonymous'
    });

    // Log response details after request is complete
    res.on('finish', () => {
        logger.info({
            requestId: req.id,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            responseTime: Date.now() - req._startTime,
        });
    });

    next();
};
