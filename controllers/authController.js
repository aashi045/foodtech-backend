const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
//signup api
exports.signup = async (req, res) => {
    const { name, email, password, role, phone } = req.body
    try {
        const existUser = await User.findOne({ where: { email: email } });
        if (existUser) return res.status(400).json({ message: 'Email already exist' })
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password, role, phone });
        const tokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
            phone: user.phone
        };

        // If vendor, include their restaurant
        // if (user.role === 'vendor') {
        //     const restaurant = await Restaurant.findOne({ where: { vendorId: user.id } });
        //     if (restaurant) tokenPayload.restroId = restaurant.id;
        // }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });
        // const token = jwt.sign({ id: user.id, email: user.email, role: user.role, phone: user.phone },
        //     process.env.JWT_SECRET,
        //     { expiresIn: process.env.JWT_EXPIRES_IN || '1d' })
        res.status(201).json({ message: 'User registered successfully', user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone }, token })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}
//login api
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        if (!user)
            return res.status(404).json({ message: 'User not found' })
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(401).json({ message: 'Invalid password' })
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ message: 'Login successfully', token })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}