import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { userService } from "../services/userService.js";

const createAuthError = (message, statusCode = 401) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const authenticateJwt = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createAuthError("Authorization token is required.");
    }

    const token = authHeader.split(" ")[1];

    if (!env.jwtSecret) {
      const configError = new Error("JWT secret is not configured.");
      configError.statusCode = 500;
      throw configError;
    }

    if (userService.isTokenRevoked(token)) {
      throw createAuthError("Token has been revoked.");
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(createAuthError("Token expired."));
    }

    if (error.name === "JsonWebTokenError") {
      return next(createAuthError("Invalid token."));
    }

    return next(error);
  }
};

