module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static UnauthorizedError() {
    return new ApiError(401, "User is not authorized");
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }
};
