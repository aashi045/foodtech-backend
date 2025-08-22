const Restaurant = require('./Restaurant');
const Menu = require('./Menu');
const sequelize = require('../config/db'); 
const OrderItem=require('./OrderItem')
const Order=require('./Order')
const User=require('./User')
// A restaurant can have many menus
Restaurant.hasMany(Menu, { foreignKey: 'restro_id', as: 'menus' });
// Restaurant.belongsTo(User,{foreignKey:'vendorId'})

// Each menu belongs to a restaurant
Menu.belongsTo(Restaurant, { foreignKey: 'restro_id', as: 'restaurant' });

Order.belongsTo(User,{foreignKey:'customerId'}) 
Order.belongsTo(Restaurant,{foreignKey:'restroId'})
Order.hasMany(OrderItem,{foreignKey:'orderId'})


OrderItem.belongsTo(Order,{foreignKey:'orderId'});//This means one orderitem has one orderId
OrderItem.belongsTo(Menu,{foreignKey:'menuId'})//This means one orderitem has one menuId

module.exports = { Restaurant, Menu ,OrderItem};
