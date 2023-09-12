export default class APIError extends Error {
  statusCode: number;

  constructor({
    message,
    statusCode,
    stack
  }: {
    message?: string;
    statusCode?: number;
    stack?: string;
  }) {
    super(message || 'Internal Server Error');
    this.statusCode = statusCode || 500;
    this.stack = stack;
  }
}
