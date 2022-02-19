'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Address.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        division: DataTypes.STRING,
        district: DataTypes.STRING,
        upazilla: DataTypes.STRING,
        details: DataTypes.STRING,
        default: DataTypes.STRING,
        usernumber: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Address',
    });
    return Address;
};