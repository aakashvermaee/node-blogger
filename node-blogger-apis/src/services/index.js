const users = require('./users/users.service.js');
const posts = require('./posts/posts.service.js');
const comments = require('./comments/comments.service.js');
const posts2 = require('./posts2/posts2.service.js');
const comments2 = require('./comments2/comments2.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(posts);
  app.configure(comments);
  app.configure(posts2);
  app.configure(comments2);
};
