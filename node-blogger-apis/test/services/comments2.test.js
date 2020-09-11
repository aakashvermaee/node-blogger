const assert = require('assert');
const app = require('../../src/app');

describe('\'comments2\' service', () => {
  it('registered the service', () => {
    const service = app.service('comments-2');

    assert.ok(service, 'Registered the service');
  });
});
