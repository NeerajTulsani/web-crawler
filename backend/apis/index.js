/* eslint-disable no-useless-escape */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import _ from 'lodash';
import { Op } from 'sequelize';
import Log from '../utils/log.js';
import db from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  Log.L(Log.I, 'Received clients GET request');
  try {
    const clients = await db.Clients.findAll();
    res.status(200).send(clients);
  } catch (err) {
    Log.L(Log.E, 'Error getting clients', err);
    res.status(500).send({
      error: err.message,
    });
  }
});

router.get('/search', async (req, res) => {
  const search = req.query.q;
  Log.L(Log.I, 'Received clients GET search request with query %s', search);
  try {
    if (!search) {
      throw new Error('Search query is required');
    }
    const clients = await db.Clients.findAll({
      where: {
        [Op.or]: [
          { id: { [Op.like]: `%${search}%` } },
          { name: { [Op.like]: `%${search}%` } },
          { cin: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    res.status(200).send(clients);
  } catch (err) {
    Log.L(Log.E, 'Error getting clients', err);
    res.status(500).send({
      error: err.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  Log.L(Log.I, 'Received client GET request with id %s', id);
  try {
    const client = await db.Clients.findOne({
      where: {
        id,
      },
    });
    if (_.isEmpty(client)) {
      res.status(200).send({
        msg: `No client found with given id ${id}`,
      });
    } else {
      res.status(200).send(client);
    }
  } catch (err) {
    Log.L(Log.E, 'Error getting client details', err);
    res.status(500).send({
      error: err.message,
    });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  try {
    Log.L(Log.I, 'Received client create POST request with body %s', JSON.stringify(body));
    const { name, cin, email, pincode } = body;
    if (!(name && cin && cin.length === 21 && pincode && pincode.length === 6 && email)) {
      Log.L(Log.W, 'Invalid inputs in request %s', JSON.stringify(body));
      throw new Error('Invalid Inputs');
    }
    const client = await db.Clients.create({
      name,
      cin,
      email,
      pincode,
    });
    res.status(200).send(client);
  } catch (err) {
    Log.L(Log.E, 'Error creating client', err);
    res.status(500).send({
      error: err.message,
    });
  }
});

router.post('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    Log.L(Log.I, 'Received client update POST request with id %s and body %s', id, JSON.stringify(body));
    const client = await db.Clients.findOne({
      where: {
        id,
      },
    });
    if (_.isEmpty(client)) {
      throw new Error(`No client found for given id ${id}`);
    }
    await db.Clients.update(body, {
      where: {
        id,
      },
    });
    res.status(200).send({
      msg: `Updated client with id ${id}`,
    });
  } catch (err) {
    Log.L(Log.E, 'Error updating client', err);
    res.status(500).send({
      error: err.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    Log.L(Log.I, 'Received client delete request with id %s', id);
    const client = await db.Clients.findOne({
      where: {
        id,
      },
    });
    if (_.isEmpty(client)) {
      throw new Error(`No client found for given id ${id}`);
    }
    await db.Clients.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      msg: `Deleted client with id ${id}`,
    });
  } catch (err) {
    Log.L(Log.E, 'Error deleting client', err);
    res.status(500).send({
      error: err.message,
    });
  }
});

export default router;
