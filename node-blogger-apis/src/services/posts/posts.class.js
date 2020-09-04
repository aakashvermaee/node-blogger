const { Service } = require('feathers-mongoose');
const _ = require('lodash');

exports.Posts = class Posts extends Service {
  constructor(options) {
    super(options);
    this.app = options.app;
  }

  async find(params) {
    const isPaginate = params.query.paginate || true;

    delete params.query.paginate;

    const posts = await super.find({
      ...params,
      paginate: isPaginate,
    });

    return posts;
  }

  async create(data, params) {
    if (params.query.comments) {
      data.userId = _.get(data, 'userId', params.user._id);
      data.parent = _.get(data, 'parent');

      return await this.Model.findByIdAndUpdate(
        data.postId,
        {
          $addToSet: {
            comments: data,
          },
          $inc: {
            commentCount: 1,
          },
        },
        { upsert: true, new: true }
      );
    }

    const post = {
      ...data,
      author: params.user._id,
      slug: data.title.replace(/\s+/gi, '-').trim(),
    };

    return await super.create(post, params);
  }

  async patch(id, data, params) {
    if (params.query.comments) {
      return await this.Model.findOneAndUpdate(
        {
          _id: id,
          'comments._id': data._id,
        },
        {
          $set: {
            'comments.$': data,
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
    }

    return await super.patch(id, data, params);
  }

  async update(id, data, params) {
    return await this.patch(id, data, params);
  }

  // todo: review & test
  async remove(id, params) {
    const query = {
      filters: {
        _id: id,
      },
      updateQuery: {
        $set: {
          isDeleted: true,
        },
      },
    };

    if (params.query.comments) {
      query.filters['comments._id'] = data._id;
      query.updateQuery.$set = {
        'comments.$.isDeleted': true,
      };
    }

    return await this.Model.findOneAndUpdate(
      {
        ...query.filters,
      },
      {
        ...query.updateQuery,
      },
      {
        new: true,
        upsert: true,
      }
    );
  }
};
