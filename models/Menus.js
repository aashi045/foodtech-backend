const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


exports.Menus = sequelize.define('Menus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    cost:{type:DataTypes.FLOAT,defaultValue:0},
    veg:{type:DataTypes.BOOLEAN,allowNull:false},
    kcal:{type:DataTypes.FLOAT,defaultValue:0},
    Carbs:{type:DataTypes.FLOAT,defaultValue:0},
    Sugar:{type:DataTypes.FLOAT,defaultValue:0},
    Fat:{type:DataTypes.FLOAT,defaultValue:0},
    Protein:{type:DataTypes.FLOAT,defaultValue:0},
    Sodium:{type:DataTypes.FLOAT,defaultValue:0},
    Saturated_fat:{type:DataTypes.FLOAT,defaultValue:0},
    Contains:{type:DataTypes.ARRAY(DataTypes.STRING)},
    restro_id:{type:DataTypes.INTEGER,allowNull:false}
},{
    tableName:'Menu',
    timestamps:true
})