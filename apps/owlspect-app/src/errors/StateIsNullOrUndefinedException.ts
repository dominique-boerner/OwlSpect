/**
 * This exception should be thrown, if a ref() is null or undefined at a point, where
 * it should not be.
 */
export class StateIsNullOrUndefinedException extends Error {
  constructor() {
    super();
    this.name = StateIsNullOrUndefinedException.name;
    this.message = "State is null or undefined.";
    console.error(this.stack);
  }
}
