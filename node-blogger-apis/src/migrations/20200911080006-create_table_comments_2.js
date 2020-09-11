'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.createTable('comments_2', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        text: {
          type: Sequelize.STRING(2000),
          defaultValue: '',
        },
        postId: {
          type: Sequelize.UUID,
          references: { model: 'posts_2', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          required: true,
        },
        parent: {
          type: Sequelize.UUID,
          references: { model: 'comments_2', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          defaultValue: null,
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

    return await queryInterface.dropTable('comments_2');
  },
};
