import express from 'express';
import Log from 'simpl-loggar';
import Routes from '../server/routes.js';
import type { IDifaConfig } from '../../types/index.js';
import http from 'http';

export default class App {
  constructor(config: IDifaConfig) {
    if (!config.port && !config.noServer) {
      Log.error('Application', 'Port not provided and noServer option was not specified. Exiting');
      return;
    }

    const app = express();

    if (config.port) this.initServer(config.port, app);

    Routes.createRoutes(app);
  }

  private accessor server: http.Server | undefined = undefined;

  /**
   * Close server.
   */
  close(): void {
    Log.log('Server', 'Closing');
    if (!this.server) return;

    this.server.closeAllConnections();
    this.server.close();
  }

  private initServer(port: number, app: express.Express): void {
    if (process.env.NODE_ENV === 'test') return;
    this.server = http.createServer(app);

    this.server.listen(port, () => {
      Log.log('Application', `Listening on ${port}`);
    });
  }
}
