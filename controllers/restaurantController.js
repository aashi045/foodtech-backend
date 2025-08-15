const Restaurant = require('../models/Restaurant');
const User = require('../models/User')

console.log('controller file')
exports.addRestaurant = async (req, res) => {
    console.log('add restro')
    const { name, logo, description, contact, address, location, openTime, closeTime, speciality, vendorId: vendorIdFromBody,specialDiscount } = req.body
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
exports.editRestaurant = async (req, res) => {
    console.log('edit')
    const { id } = req.query; // restaurant ID from URL params
    const {
        name, logo, description, contact, address,
        location, openTime, closeTime, speciality,
        vendorId: vendorIdFromBody,
        specialDiscount
    } = req.body;

    const vendorId = req.vendorId || vendorIdFromBody;

    try {
        // 1️⃣ Check if restaurant exists
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // 2️⃣ Check vendor
        const user = await User.findByPk(vendorId);
        if (!user) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // 3️⃣ Check role
        if (user.role !== 'vendor') {
            return res.status(403).json({ message: "Only vendors can edit restaurants" });
        }

        // 4️⃣ Update restaurant
        await restaurant.update({
            name, logo, description, contact, address,
            location, openTime, closeTime, speciality,specialDiscount
        });

        res.status(200).json({ message: 'Restaurant updated successfully', restaurantId: restaurant.id });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getRestaurants = async (req, res) => {
    try {
        const restaurant = await Restaurant.findAll({
            attributes: ['id', 'name', 'logo', 'description', 'contact', 'address', 'location', 'openTime', 'closeTime', 'isApproved', 'rating', 'vendorId', 'speciality','specialDiscount']
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
            attributes: ['id', 'name', 'logo', 'description', 'contact', 'address', 'location', 'openTime', 'closeTime', 'isApproved', 'rating', 'vendorId', 'speciality','specialDiscount'],
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
// exports.approveRestaurant = async (req, res) => {
//     const { restaurantId, approve } = req.body
//     try {
//         const restaurant = await Restaurant.findByPk(restaurantId)
//         if (!restaurant) {
//             return res.status(404).json({ message: 'Restaurant Not Found' })
//         }
//         restaurant.isApproved = approve
//         await restaurant.save();
//         res.status(200).json({ message: `Restaurant ${approve ? 'approved' : 'rejected'}` });
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }

//save() - save whole db instance and run api for two times ; one for find next for save
//update () - its efficient for single update or when we don't want restro data , if we want data use return true
exports.approveRestaurant = async (req, res) => {
    const { restaurantId, approve } = req.body;
    try {
        //use array var; [updatedRes] bcz update return array
        const [updatedCount, updatedRestaurants] = await Restaurant.update(
            { isApproved: approve },
            {
                where: { id: restaurantId },
                returning: true
            }
        );

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'Restaurant Not Found' });
        }

        // updatedRestaurants[0] will be the updated restaurant instance
        res.status(200).json({
            message: `Restaurant ${approve ? 'approved' : 'rejected'}`,
            restaurant: updatedRestaurants[0]
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteRestaurant=async(req,res)=>{
    const {id}=req.params
    try{
          const deletedCount = await Restaurant.destroy({
            where: { id }
        });

        if(!deletedCount){
            return res.status(404).json({message:'Restaurant Not Found'})
        }
        return res.status(200).json({ message: 'Restaurant deleted successfully' });
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}