// Initializes the `comments2` service on path `/comments-2`
const { Comments2 } = require('./comments2.class');
const createModel = require('../../models/comments2.model');
const hooks = require('./comments2.hooks');

module.exports = function (app) {
  const options = {
    app,
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/comments-2', new Comments2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('comments-2');

  service.hooks(hooks);
};
