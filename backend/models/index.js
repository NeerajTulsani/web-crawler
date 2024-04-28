import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import _ from 'lodash';
import Sequelize from 'sequelize';
import config from '../config/config.js';

const db = {};
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize(
  config.DATABASE.NAME, config.DATABASE.USER, config.DATABASE.PASSWORD, {
    host: config.DATABASE.HOST,
    port: config.DATABASE.PORT,
    dialect: config.DATABASE.DIALECT,
    dialectOptions: {
      multipleStatements: true,
    },
    logging: false,
    pool: {
      min: 0,
      max: 25,
      idle: 30000,
      acquire: 60000,
    },
  });

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(async (file) => {
    const modelPath = path.join(__dirname, file);
    const { default: model } = await import(modelPath);
    const seqModel = model(sequelize);
    db[seqModel.name] = seqModel;
    await db[seqModel.name].sync({ alter: true });
  });

export {
  sequelize,
  Sequelize,
  db as default
};
