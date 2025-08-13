const {DataTypes}=require('sequelize');
const sequelize=require('../config/db')
const bcrypt=require('bcrypt');

const User=sequelize.define('User',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false},
    phone:{type:DataTypes.STRING,allowNull:false},
    role:{type:DataTypes.ENUM('customer','vendor','admin'),defaultValue:'customer'}
},{tableName:'users',timestamps:true})

// Hash password before saving
User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;