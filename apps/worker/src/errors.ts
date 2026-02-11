export class WorkerError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "WorkerError";
    this.code = code;
  }
}
