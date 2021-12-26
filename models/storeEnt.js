'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StoreEnt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StoreEnt.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    seid: DataTypes.STRING,
    store_name: DataTypes.STRING,
    store_number: DataTypes.STRING,
    email: DataTypes.STRING,
    logo: DataTypes.STRING,
    photos: DataTypes.STRING,
    card_name: DataTypes.STRING,
    account_details: DataTypes.STRING,
    division: DataTypes.STRING,
    district: DataTypes.STRING,
    upazilla: DataTypes.STRING,
    address_details: DataTypes.STRING,
    nid: DataTypes.STRING,
    mobile_bank: DataTypes.STRING,
    account_no: DataTypes.STRING,
    approved:DataTypes.STRING,
    usernumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'StoreEnt',
  });
  return StoreEnt;
};