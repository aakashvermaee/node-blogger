const { Service } = require('feathers-sequelize');

exports.Posts2 = class Posts2 extends Service {
  constructor(options) {
    super(options);
    this.app = options.app;
  }

  async find(params) {
    const seqClient = this.app.get('sequelizeClient');

    const posts = await this.Model.findAll({
      include: [
        {
          model: seqClient.models.comments_2,
          as: 'comments',
        },
      ],
    });

    return { total: posts.length, data: posts };
  }
};
