const statusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: "OK",
  CREATED: "Created",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = statusCode.OK,
    ReasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = !message ? ReasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }
  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

export class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

export class Created extends SuccessResponse {
  constructor({
    options = {},
    message,
    statusCode = statusCode.CREATED,
    ReasonStatusCode = ReasonStatusCode.CREATED,
    metadata,
  }) {
    super({
      message,
      metadata,
      statusCode,
      ReasonStatusCode,
    });
    this.options = options;
  }
}
