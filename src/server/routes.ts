import Log from 'simpl-loggar';
import { ERouteType } from '../enums/index.js';
import { ServerNotInitializedError } from '../errors/index.js';
import type AbstractRouter from './abstract/router.js';
import type { IAsyncRoute, IRoute } from '../../types/index.js';
import type express from 'express';

export default class Routes {
  private static _app: express.Express | undefined = undefined;

  static get app(): express.Express | undefined {
    return this._app;
  }

  private static set app(val: express.Express) {
    this._app = val;
  }

  static Post<This, T>(path: string, service: AbstractRouter): IRoute<This, T> {
    return Routes.createRoute<This, T>(ERouteType.POST, path, service);
  }

  static Get<This, T>(path: string, service: AbstractRouter): IRoute<This, T> {
    return Routes.createRoute<This, T>(ERouteType.GET, path, service);
  }

  static Put<This, T>(path: string, service: AbstractRouter): IRoute<This, T> {
    return Routes.createRoute<This, T>(ERouteType.PUT, path, service);
  }

  static Patch<This, T>(path: string, service: AbstractRouter): IRoute<This, T> {
    return Routes.createRoute<This, T>(ERouteType.PATCH, path, service);
  }

  static Delete<This, T>(path: string, service: AbstractRouter): IRoute<This, T> {
    return Routes.createRoute<This, T>(ERouteType.DELETE, path, service);
  }

  private static createRoute<This, T>(type: ERouteType, path: string, service: AbstractRouter): IRoute<This, T>;
  private static createRoute<This, T>(type: ERouteType, path: string, service: AbstractRouter): IAsyncRoute<This, T>;

  /**
   * @internal
   * @param type Type of endpoint.
   * @param path Path that endpoint will use.
   * @param service Type of service to call.
   */
  private static createRoute<This, T>(type: ERouteType, path: string, service: AbstractRouter): IRoute<This, T> {
    return function (
      target: (
        this: This,
        req: express.Request,
        res: express.Response,
        service: AbstractRouter,
        next?: express.NextFunction,
      ) => T,
      context: ClassMethodDecoratorContext<
        This,
        (
          this: This,
          req: express.Request,
          res: express.Response,
          service: AbstractRouter,
          next?: express.NextFunction,
        ) => T
      >,
    ): undefined | (() => T) {
      Log.debug('Routes', `Creating ${type} endpoint for path ${path}`);
      if (!Routes.app) throw new ServerNotInitializedError();

      Routes.app[type](path, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const instance = new (context.constructor as { new (): This })();
        const output = target.call(instance, req, res, service, next);

        if (output instanceof Promise) {
          await output;
        }
      });

      return undefined;
    };
  }

  /**
   * @internal
   * @param app
   */
  static createRoutes(app: express.Express): void {
    if (Routes.app) Log.warn('Routes', 'Routes already is initialized. Reinitializing');
    Routes.app = app;
  }
}
