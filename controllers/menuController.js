const Menu = require('../models/Menu')
const Restaurant = require('../models/Restaurant')
exports.addMenu = async (req, res) => {
    const { name, image, description, cost, veg, kcal, Carbs, Sugar, Fat, Protein, Sodium, Saturated_fat, Contains, restro_id } = req.body
    try {
        const res_id = await Restaurant.findByPk(restro_id)
        if (!res_id) {
            return res.status(403).json({ message: 'Restaurant Not found' })
        }
        const menu = await Menu.create({
            name, image, description, cost, veg, kcal, Carbs, Sugar, Fat, Protein, Sodium, Saturated_fat, Contains, restro_id
        })
        res.status(201).json({ message: 'Menu is added to specific restaurant', menuId: menu.id })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.editMenu = async (req, res) => {
    const { id, name, image, description, cost, veg, kcal, Carbs, Sugar, Fat, Protein, Sodium, Saturated_fat, Contains, restro_id } = req.body
    try {
        const res_id = await Restaurant.findByPk(restro_id)
        if (!res_id) {
            return res.status(403).json({ message: 'Restaurant Not found' })
        }
        const menu = await Menu.findByPk(id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        const Menu = await Menu.update({
            name, image, description, cost, veg, kcal, Carbs, Sugar, Fat, Protein, Sodium, Saturated_fat, Contains, restro_id
        })
        res.status(201).json({ message: 'Menu is updated', menuId: Menu.id })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteMenu = async (req, res) => {
    const { id } = req.query
    try {
        const menuId = await Menu.findByPk(id)
        if (!menuId) {
            return res.status(403).json({ message: 'Menu not found' })
        }
        await Menu.destroy();
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.getMenus = async (req, res) => {
    const { restro_id } = req.params;
    const RestroId = await Restaurant.findByPk(restro_id)
    try {
        if (!RestroId)
            return res.status(403).json({ message: 'Restaurant NOT FOUND' })
        const AllMenu = await Restaurant.findAll({
            attributes: ['id', 'name', 'image', 'description', 'cost', 'veg', 'kcal', 'Carbs', 'Sugar', 'Fat', 'Protein', 'Sodium', 'Saturated_fat', 'Contains', 'restro_id']
        })
        if(AllMenu.length==0){
            return res.status(400).json({message:'Data Not Found'})
        }
    }

    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}