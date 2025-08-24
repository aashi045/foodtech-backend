const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User')
const Restaurant = require('./Restaurant')

const Orders = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
    restroId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },

    totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 }
}, {
    tableName: 'Orders',
    timestamps: true
})

module.exports = Orders