import express from 'express';

/**
 * @internal
 */
export default abstract class AbstractRouter {
  readonly _router: express.Router;

  constructor() {
    this._router = express.Router();
  }

  get router(): express.Router {
    return this._router;
  }

  abstract execute(): Promise<unknown>;
}
