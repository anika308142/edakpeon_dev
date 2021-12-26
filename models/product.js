'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pid: DataTypes.TEXT,
    store_name: DataTypes.TEXT,
    store_id: DataTypes.TEXT,
    product_id: DataTypes.TEXT,
    product_name: DataTypes.TEXT,
    category: DataTypes.TEXT,
    subcategory: DataTypes.TEXT,
    sub_subcategory: DataTypes.TEXT,
    brand: DataTypes.TEXT,
    unit_type: DataTypes.TEXT,//10
    product_type: DataTypes.TEXT,
    thumbnail: DataTypes.TEXT,
    gallery: DataTypes.TEXT,
    unit_price: DataTypes.TEXT,
    in_stock: DataTypes.TEXT,
    discount: DataTypes.TEXT,
    discount_type: DataTypes.TEXT,
    vat: DataTypes.TEXT,
    vat_type: DataTypes.TEXT,
    product_description: DataTypes.TEXT,//20
    description_image: DataTypes.TEXT,
    description_video: DataTypes.TEXT,
    free_shipping: DataTypes.TEXT,
    ship_in_dhaka: DataTypes.TEXT,
    ship_out_dhaka: DataTypes.TEXT,
    return_available: DataTypes.TEXT,
    return_days: DataTypes.TEXT,
    cod: DataTypes.TEXT,
    advance_payment: DataTypes.TEXT,
    cod_payment: DataTypes.TEXT,//30
    min_days: DataTypes.TEXT,
    max_days: DataTypes.TEXT,
    slug: DataTypes.TEXT,
    meta_title: DataTypes.TEXT,
    meta_description: DataTypes.TEXT,
    meta_image: DataTypes.TEXT,
    approved: DataTypes.TEXT,
    usernumber: DataTypes.TEXT,//38
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};