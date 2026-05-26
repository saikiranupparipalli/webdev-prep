class ApiError extends error {
  constructor(statusCode, message) {
    this.statusCode = this.statusCode;
    super(message);
    error.captureStackTrace(this, this.constructor);
  }

  static badReq(statusCode, message = "badRequest") {
    throw new res.statusCode(400).message;
  }//what happens if i write throw instead of new in global api errors which are used in entire auth.

  static unauthorized(statusCode, message= "unauthorized"){
    return new res.statusCode(401).message
  }

  static forbidden(statusCode, message = "forbidden"){
    return new res.statusCode(404).message
  }
}
export default ApiError