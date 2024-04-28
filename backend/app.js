import cluster from 'cluster';
import config from './config/config.js';
import initializeWebServer from './webserver.js';
import Log from './utils/log.js';

class Server {
  static async initialise() {
    if (cluster.isMaster) {
      for (let i = 0; i < config.NUMBER_OF_FORKS; i += 1) {
        cluster.fork();
      }
    } else {
      initializeWebServer()
        .then(() => Log.L(Log.I, 'Webserver Initialized Successfully'))
        .catch(err => Log.L(Log.E, 'Error Initializing webserver', err));
    }
  }
}

process.on('exit', (worker, _code, _signal) => {
  //  Worker died, rest in peace pal!
  Log.L(Log.E, `Worker with process id ${worker.process.pid} died`);
  cluster.fork();
});

process.on('uncaughtException', err => Log.L(Log.E, 'uncaught exception:', err));

Server.initialise();

export default Server;
