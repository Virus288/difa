import type AbstractRouter from '../src/server/abstract/router.js';
import type express from 'express';

/**
 * @internal
 */
export type IRoute<This, T> = (
  target: (
    this: This,
    req: express.Request,
    res: express.Response,
    service: AbstractRouter,
    next?: express.NextFunction,
  ) => T,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, req: express.Request, res: express.Response, service: AbstractRouter) => T
  >,
) => undefined | (() => T);

export type IAsyncRoute<This, T> = (
  target: (
    this: This,
    req: express.Request,
    res: express.Response,
    service: AbstractRouter,
    next?: express.NextFunction,
  ) => Promise<T>,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, req: express.Request, res: express.Response, service: AbstractRouter) => Promise<T>
  >,
) => undefined | (() => Promise<T>);

export interface IDifaConfig {
  port?: number;
  noServer?: boolean;
}
