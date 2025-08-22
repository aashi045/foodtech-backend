const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const Order = require('./Order')
const Menu=require('./Menu')

const OrderItem = sequelize.define('orderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    orderId: { type: DataTypes.INTEGER, allowNull: false },
    menuId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }

},{
    tableName:'OrderItems',
    timestamps:true
})

module.exports=OrderItem