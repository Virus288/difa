import express from 'express';

export default abstract class AbstractRouter<T = unknown> {
  readonly _router: express.Router;

  constructor() {
    this._router = express.Router();
  }

  get router(): express.Router {
    return this._router;
  }

  abstract execute(): T | Promise<T>;
}
