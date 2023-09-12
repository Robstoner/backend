import APIError from './APIError';

export default class ValidationError extends APIError {
  constructor({ message }: { message?: string }) {
    super({ message: message || 'Validation Error', statusCode: 400 });
  }
}
