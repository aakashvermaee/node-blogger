// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const posts2 = sequelizeClient.define(
    'posts_2',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: DataTypes.STRING(2000),
        required: true,
      },
      content: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      slug: {
        type: DataTypes.STRING,
        required: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      commentStatus: {
        type: DataTypes.ENUM(['open', 'closed']),
        defaultValue: 'open',
      },
      rating: {
        type: DataTypes.INTEGER,
        max: 5,
        min: 1,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      postStatus: {
        type: DataTypes.ENUM(['draft', 'published', 'unpublished']),
        defaultValue: 'draft',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  posts2.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    posts2.belongsTo(models.posts_2, {
      foreignKey: 'parent',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    posts2.hasMany(models.comments_2, {
      foreignKey: 'postId',
      as: 'comments',
    });
  };

  return posts2;
};
