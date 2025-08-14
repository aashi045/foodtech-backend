const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

console.log('model file')

const Restaurant = sequelize.define('Restaurant', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    logo: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING,allowNull:false,validate: {
        is: /^[0-9+]+$/ 
    } },
    address: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },      // latitude, longitude
    openTime: { type: DataTypes.TIME },
    closeTime: { type: DataTypes.TIME },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false }, // approved by admin
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },            // default rating
    vendorId: { type: DataTypes.INTEGER, allowNull: false },
    speciality:{type: DataTypes.ARRAY(DataTypes.STRING)}
}, {
    tableName: 'Restaurant',
    timestamps: true
})

module.exports = Restaurant