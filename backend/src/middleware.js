const e = require('express');

function paginatedResults(model) {
  return async (req, res, next) => {
    const resultResponse = {};

    const page = +req.query.page;
    const limit = +req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalRecords = await model.countDocuments().exec();
    resultResponse.total = totalRecords;

    if (endIndex < totalRecords) {
      resultResponse.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      resultResponse.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      resultResponse.results = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .exec();

      res.paginatedResults = resultResponse;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

function aggregateResults(model) {
  return async (req, res, next) => {
    const { from, to } = req.query;

    try {
      const response = await model.find().exec();

      const reducedResponse = response.reduce((acc, curr) => {
        if (curr['timestamp'] in acc) {
          acc[curr['timestamp']] += 1;
        } else {
          acc[curr['timestamp']] = 1;
        }
        return acc;
      }, {});

      const filteredResponse = Object.entries(reducedResponse).filter((i) => {
        const date = new Date(i[0]);

        if (
          Date.parse(date) >= Date.parse(from) &&
          Date.parse(date) <= Date.parse(to)
        ) {
          return [date, i[1]];
        }
      });

      res.resultResponse = Object.fromEntries(filteredResponse);
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = { paginatedResults, aggregateResults };
