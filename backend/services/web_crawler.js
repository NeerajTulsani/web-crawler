/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import axios from 'axios';
import cheerio from 'cheerio';
import config from '../config/config.js';
import Log from '../utils/log.js';
import db, { sequelize } from '../models/index.js';

const getClientDetails = async (domain, name) => {
  const parsedName = name.toLowerCase().split(' ').join('-');
  const url = `https://${domain}/company/${parsedName}`;
  const response = await axios.get(url);
  let cin,
    pinCode,
    email;
  const $ = cheerio.load(response.data);
  const cinDiv = $('div.bg-white.justify-content-between.align-items-center.p-2.border-bottom:contains("CIN")');
  const pinCodeDiv = $('div.bg-white.justify-content-between.align-items-center.p-2.border-bottom:contains("PIN Code")');
  const emailDiv = $('div.bg-white.justify-content-between.align-items-center.p-2.border-bottom:contains("Email")');
  const cinHtml = cinDiv.html();
  const pinCodeHtml = pinCodeDiv.html();
  const emailHtml = emailDiv.html();
  const cinCheerio = cheerio.load(cinHtml)('h6.mb-0.pt-1.text-left');
  const pinCodeCheerio = cheerio.load(pinCodeHtml)('h6.mb-0.pt-1.text-left');
  const emailCheerio = cheerio.load(emailHtml)('h6.mb-0.pt-1.text-left');
  cinCheerio.each((index, element) => {
    cin = element.children[0].data.trim();
  });
  pinCodeCheerio.each((index, element) => {
    pinCode = element.children[0].data.trim();
  });
  emailCheerio.each((index, element) => {
    email = element.children[0].data.trim();
  });
  if (!(cin.length === 21)) {
    throw new Error('CIN is not valid');
  }
  if (!(pinCode.length === 6)) {
    throw new Error('PINCODE is not valid');
  }
  return [cin, pinCode, email];
};

const run = async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    Log.L(Log.E, 'error executing sync: %s, %s', err.message, err.stack);
  }

  const clientsUrl = config.CLIENTS_URL;
  const response = await axios.get(clientsUrl);
  let originalUrl = response.request.res.responseUrl;
  Log.L(Log.I, 'Redirected new URL %s', originalUrl);
  originalUrl = new URL(originalUrl);
  const domain = originalUrl.hostname;
  const $ = cheerio.load(response.data);
  const clients = [];

  Log.L(Log.I, 'Starting web crawler with cheerio');
  $('a.fs-6.text-uppercase').each((index, element) => {
    const name = element.children[0].data;
    clients.push(name);
  });
  Log.L(Log.I, 'Total clients %d', clients.length);

  const batchSize = config.BATCH_SIZE;
  for (let i = 0; i < clients.length; i += batchSize) {
    const batch = clients.slice(i, i + batchSize);
    await Promise.all(batch.map(async (client) => {
      try {
        const [cin, pinCode, email] = await getClientDetails(domain, client);
        await db.Clients.create({
          name: client,
          cin,
          pincode: pinCode,
          email,
        });
      } catch (error) {
        Log.L(Log.E, 'Error getting client details for client %s', client, error);
      }
    }));
  }
};

run()
  .then(() => {
    Log.L(Log.I, 'Script completed');
    process.exit(0);
  })
  .catch((err) => {
    Log.L(Log.E, 'Error executing web crawler script', err);
    process.exit(-1);
  });
