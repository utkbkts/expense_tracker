class ErrorHandler extends Error {
    statusCode:number;
    constructor(message:string, statusCode:number) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, new.target.prototype);
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ErrorHandler;