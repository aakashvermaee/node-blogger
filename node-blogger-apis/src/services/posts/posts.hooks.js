const { authenticate } = require('@feathersjs/authentication').hooks;
const { Forbidden } = require('@feathersjs/errors');
const _ = require('lodash');

module.exports = {
  before: {
    all: [
      async (hook) => {
        await canComment(hook);
      },
    ],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
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

async function canComment(hook) {
  const { method, app, params } = hook;

  if (_.includes(['get', 'find'], _.toLower(method))) return hook;

  const mongooseClient = app.get('mongooseClient');
  const postId = _.get(hook, 'data.postId', hook.id);

  const post = await mongooseClient.models.posts.findOne({
    _id: postId,
  });

  if (params.query.comments && _.toLower(post.commentStatus) === 'closed') {
    throw new Forbidden('Comments Status Closed');
  }
}
