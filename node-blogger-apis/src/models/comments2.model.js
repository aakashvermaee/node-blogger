// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const comments2 = sequelizeClient.define(
    'comments_2',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
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
  comments2.associate = async function (models) {
    // parent PostId
    comments2.belongsTo(models.posts_2, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // parent CommentId
    comments2.belongsTo(models.comments_2, {
      foreignKey: 'parent',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return comments2;
};
