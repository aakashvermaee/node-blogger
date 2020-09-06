// Application hooks that run for every service
const { Forbidden } = require('@feathersjs/errors');
const _ = require('lodash');

module.exports = {
  before: {
    all: [
      async (hook) => {
        const { app, params } = hook;

        if (!_.has(params.headers, 'x-api-key')) {
          throw new Forbidden('REST API Key Not Found');
        } else if (_.has(params.headers, 'x-api-key')) {
          const x_api_key = app.get('x-api-key');

          if (x_api_key !== _.get(params.headers, 'x-api-key')) {
            throw new Forbidden('REST API Key Mismatch');
          }
        }
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
