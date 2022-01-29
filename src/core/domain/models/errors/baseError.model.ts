export class BaseError extends Error {
  public readonly name: string = '';
  public readonly code?: string = '';
  public readonly message: string = '';

  constructor(baseError: Partial<BaseError>) {
    super(baseError.message);
    Object.assign(this, baseError);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
