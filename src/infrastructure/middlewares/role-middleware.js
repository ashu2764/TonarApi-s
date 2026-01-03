import throwError from "../error-handling/throw-error.js";

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    throwError("Admin access required", 403);
  }
  next();
};
