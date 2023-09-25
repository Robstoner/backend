import APIError from './APIError';

export default class DatabaseError extends APIError {
  constructor({ message }: { message?: string }) {
    super({ message: message || 'Database Error', statusCode: 500 });
  }
}
