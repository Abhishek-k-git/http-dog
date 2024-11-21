import logger from '../utils/logger.js';
import { AppError, NotFoundError } from '../utils/errors.js';

const notFound = (req, res, next) => {
    next(new NotFoundError(`Not Found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log the error
    logger.error({
        message: err.message,
        error: err,
        stack: err.stack,
        requestId: req.id,
        path: req.path,
        method: req.method,
        ip: req.ip,
        user: req.user ? req.user.id : 'anonymous'
    });

    // Mongoose validation error handling
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);
        err = new AppError(`Invalid input data: ${errors.join('. ')}`, 400);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        err = new AppError(`Duplicate field value: ${value}. Please use another value!`, 400);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token. Please log in again!', 401);
    }
    if (err.name === 'TokenExpiredError') {
        err = new AppError('Your token has expired! Please log in again.', 401);
    }

    // Development vs Production error response
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // Production: don't leak error details
        res.status(err.statusCode).json({
            status: err.status,
            message: err.isOperational ? err.message : 'Something went wrong!'
        });
    }
};

export { notFound, errorHandler };
