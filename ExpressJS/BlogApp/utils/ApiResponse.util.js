class ApiResponse {
  constructor(statusCode, success, message, data = null, meta = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.data = data;
    this.meta = meta;
  }

  send(res) {
    console.log(this.statusCode);
    let responseObject = {
      message: this.message,
      success: this.success,
    };
    if (this.data) responseObject.data = this.data;
    if (this.meta) responseObject.meta = this.meta;

    res.status(this.statusCode).json(responseObject);
  }
}

export default ApiResponse;
