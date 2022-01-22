const express = require('express');
const cors = require('cors');
const { paginatedResults, aggregateResults } = require('./middleware');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const { parsed } = require('dotenv').config();

const AttacksInfo = require('./schema');

const PORT = 3000;
const app = express();

/**
 *  Remove the server type information from the response header
 */
app.disable('x-powered-by');

/**
 * Add some middlewares
 */
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

/**
 * GET /attacks
 */
app.get('/attacks', paginatedResults(AttacksInfo), (_, res) => {
  res.json(res.paginatedResults);
});

/**
 * GET /aggregate
 */
app.get('/aggregate', aggregateResults(AttacksInfo), (_, res) => {
  res.json(res.resultResponse);
});

// Define Server
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${parsed.DB_USERNAME}:${parsed.DB_PASSWORD}@cluster0.v1dir.mongodb.net/${parsed.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log('Database connected successfully');
      }
    );

    app.listen(parsed.PORT, () => {
      console.log(`Howdy! server is running on PORT: ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
