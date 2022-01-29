export class ErrorResponse {
  public readonly code?: string = '';
  public readonly message?: string = '';

  constructor(errorResponse: ErrorResponse) {
    Object.assign(this, errorResponse);
  }
}
