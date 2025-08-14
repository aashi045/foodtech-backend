const Restaurant = require('../models/Restaurant');
const User = require('../models/User')

console.log('controller file')
exports.addRestaurant = async (req, res) => {
    console.log('add restro')
    const { name, logo, description, contact, address, location, openTime, closeTime, speciality, vendorId: vendorIdFromBody } = req.body
    const vendorId = req.vendorId || vendorIdFromBody //we take vendorId: vendorIdFromBody because when we hit api through postman we can't get vendor id through token
    try {
        const user = await User.findByPk(vendorId);
        console.log(user,'user')
        if (!user) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // 2️⃣ Check role
        if (user.role !== 'vendor') {
            return res.status(403).json({ message: "Only vendors can create restaurants" });
        }
        const restaurant = await Restaurant.create({
            name, logo, description, contact, address, location, openTime, closeTime, speciality, vendorId
        })
        res.status(201).json({ message: 'Restaurant created, pending admin approval', restaurantId: restaurant.id })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}


exports.getRestaurants = async (req, res) => {
    try {
        const restaurant = await Restaurant.findAll({
            attributes: ['id', 'name', 'logo', 'description', 'contact', 'address', 'location', 'openTime', 'closeTime', 'isApproved', 'rating', 'vendorId', 'speciality']
        })
        res.status(200).json({ message: 'Data Fetched Successfully', restaurant })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getRestaurantsWithApprove = async (req, res) => {
    try {
        const restaurant = await Restaurant.findAll({
            where: { isApproved: true },
            attributes: ['id', 'name', 'logo', 'description', 'contact', 'address', 'location', 'openTime', 'closeTime', 'isApproved', 'rating', 'vendorId', 'speciality'],
            order: [['rating', 'DESC']],
        })
        if(restaurant.length==0){
            return res.status(200).json({message:'No approved restaurants available yet. Please check back soon.'})
        }
        res.status(200).json({ message: 'Data Fetched Successfully', restaurant })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//approve by admin
exports.approveRestaurant = async (req, res) => {
    const { restaurantId, approve } = req.body
    try {
        const restaurant = await Restaurant.findByPk(restaurantId)
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant Not Found' })
        }
        restaurant.isApproved = approve
        await restaurant.save();
        res.status(200).json({ message: `Restaurant ${approve ? 'approved' : 'rejected'}` });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}