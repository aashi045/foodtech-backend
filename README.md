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