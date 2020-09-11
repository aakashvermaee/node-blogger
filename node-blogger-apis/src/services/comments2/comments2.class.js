const { Service } = require('feathers-sequelize');

exports.Comments2 = class Comments2 extends Service {
  constructor(options) {
    super(options);
    this.app = options.app;
  }
};
