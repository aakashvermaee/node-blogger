const assert = require('assert');
const app = require('../../src/app');

describe('\'posts2\' service', () => {
  it('registered the service', () => {
    const service = app.service('posts-2');

    assert.ok(service, 'Registered the service');
  });
});
