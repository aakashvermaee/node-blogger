// Initializes the `posts2` service on path `/posts-2`
const { Posts2 } = require('./posts2.class');
const createModel = require('../../models/posts2.model');
const hooks = require('./posts2.hooks');

module.exports = function (app) {
  const options = {
    app,
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/posts-2', new Posts2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('posts-2');

  service.hooks(hooks);
};
