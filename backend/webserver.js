import express, { urlencoded } from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import { createServer } from 'http';
import config from './config/config.js';
import Log from './utils/log.js';
import { sequelize } from './models/index.js';
import apis from './apis/index.js';

const { json } = pkg;

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

async function initialize() {
  const httpPort = config.WEB_SERVER.PORT;
  let httpServer = null;
  try {
    await sequelize.sync();
  } catch (err) {
    Log.L(Log.E, 'error executing sync: %s, %s', err.message, err.stack);
  }
  Log.L(Log.I, 'Starting http server on port %d', httpPort);
  httpServer = createServer(app);
  httpServer.listen(httpPort, () => {
    Log.L(Log.I, 'Web server is listening at http://%s:%s', config.WEB_SERVER.HOST, httpPort);
  });

  app.use('/ping', (req, res) => {
    res.send('pong');
  });

  app.use('/clients', apis);
}

export default initialize;
