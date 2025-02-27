import type AbstractRouter from './abstract/router';
import type express from 'express';

/**
 * @internal
 */
export type IRoute<This> = (
  target: (this: This, req: express.Request, res: express.Response, service: AbstractRouter) => void | Promise<void>,
  _context: ClassMethodDecoratorContext<
    This,
    (this: This, req: express.Request, res: express.Response) => void | Promise<void>
  >,
) => void | Promise<void>;
