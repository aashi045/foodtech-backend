const Restaurant = require('./Restaurant');
const Menu = require('./Menu');
const sequelize = require('../config/db'); 

// A restaurant can have many menus
Restaurant.hasMany(Menu, { foreignKey: 'restro_id', as: 'menus' });

// Each menu belongs to a restaurant
Menu.belongsTo(Restaurant, { foreignKey: 'restro_id', as: 'restaurant' });

module.exports = { Restaurant, Menu };
