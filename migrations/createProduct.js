'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.TEXT
      },
      store_name: {
        type: Sequelize.TEXT
      },
      store_id: {
        type: Sequelize.TEXT
      },
      product_id: {
        type: Sequelize.TEXT
      },
      product_name: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.TEXT
      },
      subcategory: {
        type: Sequelize.TEXT
      },
      sub_subcategory: {
        type: Sequelize.TEXT
      },
      brand: {
        type: Sequelize.TEXT
      },
      unit_type: {
        type: Sequelize.TEXT //10
      },
      product_type: {
        type: Sequelize.TEXT
      },
      thumbnail: {
        type: Sequelize.TEXT
      },
      gallery: {
        type: Sequelize.TEXT
      },
      unit_price: {
        type: Sequelize.TEXT
      },
      in_stock: {
        type: Sequelize.TEXT
      },
      discount: {
        type: Sequelize.TEXT
      },
      discount_type: {
        type: Sequelize.TEXT
      },
      vat: {
        type: Sequelize.TEXT
      },
      vat_type: {
        type: Sequelize.TEXT
      },
      product_description: {
        type: Sequelize.TEXT //20
      },
      description_image: {
        type: Sequelize.TEXT
      },
      description_video: {
        type: Sequelize.TEXT
      },
      free_shipping: {
        type: Sequelize.TEXT
      },
      ship_in_dhaka: {
        type: Sequelize.TEXT
      },
      ship_out_dhaka: {
        type: Sequelize.TEXT
      },
      return_available: {
        type: Sequelize.TEXT
      },
      return_days: {
        type: Sequelize.TEXT
      },
      cod: {
        type: Sequelize.TEXT
      },
      advance_payment: {
        type: Sequelize.TEXT
      },
      cod_payment: {
        type: Sequelize.TEXT//30
      },
      min_days: {
        type: Sequelize.TEXT
      },
      max_days: {
        type: Sequelize.TEXT
      },
      slug: {
        type: Sequelize.TEXT
      },
      meta_title: {
        type: Sequelize.TEXT
      },
      meta_description: {
        type: Sequelize.TEXT
      },
      meta_image: {
        type: Sequelize.TEXT
      },
      approved: {
        type: Sequelize.TEXT
      },
      usernumber: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE   //40
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Product');
  }
};