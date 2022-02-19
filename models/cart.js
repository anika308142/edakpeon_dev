'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cart_id: DataTypes.STRING,
    pid: DataTypes.STRING,
    variant_id: DataTypes.STRING,
    quantity: DataTypes.STRING,
    status: DataTypes.STRING,
    usernumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};