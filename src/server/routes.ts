import Log from 'simpl-loggar';
import { ERouteType } from '../enums';
import { ServerNotInitializedError } from '../errors';
import type AbstractRouter from './abstract/router';
import type { IRoute } from './types.js';
import type express from 'express';

export default class Routes {
  private static _app: express.Express | undefined = undefined;

  static get app(): express.Express | undefined {
    return this._app;
  }

  private static set app(val: express.Express) {
    this._app = val;
  }

  static Post<This>(path: string, service: AbstractRouter): IRoute<This> {
    return Routes.createRoute<This>(ERouteType.POST, path, service);
  }

  static Get<This>(path: string, service: AbstractRouter): IRoute<This> {
    return Routes.createRoute<This>(ERouteType.GET, path, service);
  }

  static Put<This>(path: string, service: AbstractRouter): IRoute<This> {
    return Routes.createRoute<This>(ERouteType.PUT, path, service);
  }

  static Patch<This>(path: string, service: AbstractRouter): IRoute<This> {
    return Routes.createRoute<This>(ERouteType.PATCH, path, service);
  }

  static Delete<This>(path: string, service: AbstractRouter): IRoute<This> {
    return Routes.createRoute<This>(ERouteType.DELETE, path, service);
  }

  /**
   * @internal
   * @param type Type of endpoint.
   * @param path Path that endpoint will use.
   * @param service Type of service to call.
   */
  private static createRoute<This>(type: ERouteType, path: string, service: AbstractRouter): IRoute<This> {
    return function (
      target: (
        this: This,
        req: express.Request,
        res: express.Response,
        service: AbstractRouter,
      ) => void | Promise<void>,
      _context: ClassMethodDecoratorContext<
        This,
        (this: This, req: express.Request, res: express.Response) => void | Promise<void>
      >,
    ): void | Promise<void> {
      Log.debug('Routes', `Creating ${type} endpoint for path ${path}`);
      if (!Routes.app) throw new ServerNotInitializedError();

      Routes.app[type](path, async (req: express.Request, res: express.Response) => {
        const instance = new (_context.constructor as { new (): This })();
        await target.call(instance, req, res, service);
      });
    };
  }

  /**
   * @internal
   * @param app
   */
  createRoutes(app: express.Express): void {
    if (Routes.app) Log.warn('Routes', 'Routes already is initialized. Reinitializing');
    Routes.app = app;
  }
}
