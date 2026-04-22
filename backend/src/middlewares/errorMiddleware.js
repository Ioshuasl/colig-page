const createNotFoundError = (message) => {
  const error = new Error(message);
  error.statusCode = 404;
  return error;
};

export const notFoundHandler = (req, _res, next) => {
  next(createNotFoundError(`Route not found: ${req.method} ${req.originalUrl}`));
};

export const globalErrorHandler = (error, _req, res, _next) => {
  const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
  const message = error.message || "Internal server error.";

  return res.status(statusCode).json({ message });
};

