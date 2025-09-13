'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('product_v4', {
      product_id: { type: Sequelize.UUID, primaryKey: true },
      store_id: { type: Sequelize.UUID, allowNull: false },
      price_in_cents: { type: Sequelize.INTEGER, allowNull: false },
      name: { type: Sequelize.TEXT, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      keywords: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true, defaultValue: [] },
      category: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });

    await queryInterface.addIndex('product_v4', ['store_id', 'product_id']);
    await queryInterface.addIndex('product_v4', ['store_id', 'name']);

    await queryInterface.createTable('product_v7', {
      product_id: { type: Sequelize.UUID, primaryKey: true },
      store_id: { type: Sequelize.UUID, allowNull: false },
      price_in_cents: { type: Sequelize.INTEGER, allowNull: false },
      name: { type: Sequelize.TEXT, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      keywords: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true, defaultValue: [] },
      category: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await queryInterface.addIndex('product_v7', ['store_id', 'product_id']);
    await queryInterface.addIndex('product_v7', ['store_id', 'name']);

    await queryInterface.createTable('product_serial', {
      product_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      store_id: { type: Sequelize.BIGINT, allowNull: false },
      price_in_cents: { type: Sequelize.INTEGER, allowNull: false },
      name: { type: Sequelize.TEXT, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      keywords: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true, defaultValue: [] },
      category: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await queryInterface.addIndex('product_serial', ['store_id', 'product_id']);
    await queryInterface.addIndex('product_serial', ['store_id', 'name']);

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('product_v4');
    await queryInterface.dropTable('product_v7');
    await queryInterface.dropTable('product_serial');
  }
};
