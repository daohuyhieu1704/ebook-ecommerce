const statusCode = {
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const ReasonStatusCode = {
  CONFLICT: "Conflict Error",
  NOT_FOUND: "Not Found Error",
  FORBIDDEN: "Bad Request Error",
};

class ErrorResponse extends Response {
  constructor(message, status) {
    super(message, status);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    statusCode = statusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

export class NotFoundRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.NOT_FOUND,
    statusCode = statusCode.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = statusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}
