export default {
  NUMBER_OF_FORKS: 1,
  IS_DEV: true,
  WEB_SERVER: {
    HOST: '0.0.0.0',
    HTTPS: false,
    PORT: 8090,
  },
  DATABASE: {
    HOST: '127.0.0.1',
    NAME: 'ss_dev',
    PASSWORD: 'root',
    USER: 'root',
    DIALECT: 'mysql',
    PORT: '3306',
  },
  CLIENTS_URL: 'https://bit.ly/3lmNMTA',
  BATCH_SIZE: 10,
};
