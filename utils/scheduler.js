const {op} = require('sequelize');
const Slot = require('../model/slots');

exports.deleteOldSlot = async()=> {
    try{
        //get the current date.
        const currentDateTime = new Date().toISOString().split('T')[0];

        //delete old slots which has expired date.
        const deleteSlots = await Slot.destroy({
            where: {
                date:{[op.lt]: currentDateTime}
            }
        })
    }
    catch(err){
        console.log(err);
    }
}