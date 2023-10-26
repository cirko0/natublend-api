// FOR OUR OPERATIONAL ERRORS
class AppError extends Error {
  constructor(message, statusCode) {
    // Error obj that recives message as a parameter
    super(message);
 
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    // captureStackTrace returns a string that represents the location
    // of that particular error in the call. It gives us a stack that
    // helps us to find the location of that error in the code at which
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
