export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // call the parent constructor
    this.name = "CustomError"; // set the name property
    this.statusCode = statusCode;
  }

  log() {
    console.log(`Custom error ${this.statusCode}: ${this.message}`);
  }
}
