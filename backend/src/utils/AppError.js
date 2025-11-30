export default class AppError extends Error {
  constructor(message='Internal Server Error', status=500, details=[]) {
    super(message);
    this.status = status;
    this.details = details
  }
}