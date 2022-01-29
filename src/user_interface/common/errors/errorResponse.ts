export class ErrorResponse {
  public readonly code?: string = '';
  public readonly message?: string = '';

  constructor(errorResponse: Partial<ErrorResponse>) {
    Object.assign(this, errorResponse);
  }
}
