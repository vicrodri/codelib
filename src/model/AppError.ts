export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }

  log() {
    console.log(`Custom error ${this.statusCode}: ${this.message}`);
  }
}
