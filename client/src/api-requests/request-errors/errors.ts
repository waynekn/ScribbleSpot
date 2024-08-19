export class AuthError extends Error {
  constructor() {
    super();
    this.name = "AuthError";
  }
}
