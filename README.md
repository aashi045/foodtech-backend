# foodtech-backend
# Food Delivery Website Backend code


  <!-- try{
          const deletedCount = await Restaurant.destroy({
            where: { id }
        });

  try{
        const menuId=await Menu.findByPk(id)
        if(!menuId){
            return res.status(403).json({message:'Menu not found'})
        }
    } -->


<!-- which one is to be used  -->

//delete data by destroy  (this will return destory count and doesn't return any deleted row)

Restaurant.destroy({ where: { id } })

Purpose: Permanently deletes the row(s) that match the condition.

Return value: The number of rows deleted (deletedCount).

When to use:

If you actually want to delete the record from the database.

Example: A vendor wants to remove their restaurant completely.

// delete data by using "findByPk"

Menu.findByPk(id)

Purpose: Fetch a record by its primary key (PK).

Return value: The model instance if found, otherwise null.

When to use:

If you just want to check existence or fetch details before performing another action (like update, delete, or validation).

Example: Check if a Menu exists before deleting or updating it.


# update and save Sequelize query
        await restaurant.update({
            name, logo, description, contact, address,
            location, openTime, closeTime, speciality,specialDiscount
        });


n this api we use update function to fetch updated record

        order.status = status;
        await order.save();

   
in this api we use save() to update status, what is the difference between both

-- update ()-Jab ek hi baar me multiple fields update karni ho
            - direct update table without fetching it

-- save()- Jab aap pehle record fetch karke uski properties manually change karte ho
        - 	Fetch → Modify → Save

# which one is used then to update table
- update () -Jab aapko object ki puri instance load karne ki zarurat nahi hai.
            - Ye faster hai kyunki sidha ek UPDATE query run hoti hai.

-save() - Jab aapne record pehle se fetch kar rakha hai aur uski kuch properties change karni hain
        - useful jab ek-do fields change karne ho, ya object pe pehle kuch aur logic apply karna ho.

# onDelete: 'CASCADE'
-- If you set this up in your associations, deleting an Order will automatically delete its related OrderItems.

# association foreign key name , and key name for this key value in model should be same ; otherwise it creates two column for the same

#    include:  { model: Menu, as: 'menus' },
            include:{model:User}

-- the issue is , response return user data not menu, so we can do it as 
    include:[{model:Menu, as:'menus'},{model:User}]

# // Hash password before saving ----and what does it mean in signup

        This is a Sequelize hook.

It automatically hashes the password whenever you create a new user through Sequelize.

You don’t have to manually hash if you’re using User.create({ password: 'plainText' }).