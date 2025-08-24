const OrderItem = require('../models/OrderItem')
const Order = require('../models/Order')
const Restaurant = require('../models/Restaurant')
const User = require('../models/User')
const Menu = require('../models/Menu')


exports.createOrder = async (req, res) => {
    const { restroId, items, vendorIdFromBody } = req.body;
    const userId = req.user.id

    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(403).json({
                message: 'User Not Found'
            })
        }
        if (user.role != 'customer') {
            return res.status(403).json({ message: "Access denied: Only Customers are allowed to place orders." })
        }
        const resId = await Restaurant.findByPk(restroId);
        if (!resId) {
            return res.status(403).json({ message: 'Restaurant Not Found' });
        }
        let totalAmount = 0;
        for (const item of items) {
            const menu = await Menu.findByPk(item.menuId);
            if (!menu) {
                return res.status(400).json({ message: `Menu item not found with id ${item.menuId}` });
            }
            const price = menu.cost * item.quantity
            totalAmount += price
            if (menu.restro_id !== restroId) {
                return res.status(400).json({ message: `Menu item ${item.menuId} does not belong to restaurant ${restroId}` });
            }
        }

        const order = await Order.create({
            customerId: req.user.id || vendorIdFromBody,
            status: 'Pending',
            restroId,
            totalAmount: totalAmount
        });

        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                menuId: item.menuId,
                quantity: item.quantity
            });
        }

        res.status(200).json({ message: 'Order placed Successfully', orderId: order.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//update order status by vendor

exports.updateStatus = async (req, res) => {
    const { orderId } = req.query
    const { status } = req.body
    const { userId } = req.user.id || req.body
    try {
        const orderId = await Order.findByPk(orderId)
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(403).json({ message: 'User does not exist' })
        }
        if (user.id != userId) {
            return res.status(403).json({ message: 'You are not a valid user' })
        }

        if (!orderId) {
            res.status(403).json({ message: 'Order Not Found' })
        }
        order.status = status;
        await order.save();

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getMyOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.findAll({
            where: { customerId: userId },
            include: [{ model: OrderItem, include: [Menu] }]
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getVendorOrders = async (req, res) => {
    const { restroId } = req.body
    try {
        const orders = await Order.findAll({
            where: { restroId: req.user.restroId || restroId },
            include: [{ model: OrderItem, include: [Menu] }]
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//delete order by customer

exports.deleteOrder = async (req, res) => {
    const { orderId } = req.query
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(403).json({ message: 'Unable to delete order!!' })
        }
        await order.destroy()
        res.status(200).json({ message: 'Order deleted successfully' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}
