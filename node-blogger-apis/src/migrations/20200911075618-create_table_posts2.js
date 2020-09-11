'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.createTable('posts_2', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        title: {
          type: Sequelize.STRING(2000),
          defaultValue: '',
        },
        parent: {
          type: Sequelize.UUID,
          references: { model: 'posts_2', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          defaultValue: null,
        },
        content: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        slug: {
          type: Sequelize.STRING,
          required: true,
        },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        commentStatus: {
          type: Sequelize.ENUM(['open', 'closed']),
          defaultValue: 'open',
        },
        rating: {
          type: Sequelize.INTEGER,
          max: 5,
          min: 1,
        },
        likes: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        isPrivate: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        isPremium: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        postStatus: {
          type: Sequelize.ENUM(['draft', 'published', 'unpublished']),
          defaultValue: 'draft',
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return await queryInterface.dropTable('posts_2');
  },
};
