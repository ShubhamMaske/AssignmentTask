const Slot = require('../model/slots');
const { Op } = require("sequelize");

//Function to check input field is valid or not
function isInputInvalid(string) {
    if (string == undefined || string.length === 0) {
        return true;
    } else {
        return false;
    }
}

//---------------------------------------------------
//Creating a new slot 
exports.createSlot = async (req, res) => {
    try {
        const { date, sTime, eTime } = req.body;

        if (isInputInvalid(date) || isInputInvalid(sTime) || isInputInvalid(eTime)) {
            res.status(400).json({ msg: " Bad Parameters", success: false })
        }

        const [month, day, year] = date.split('/');
        let convertedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        let convertedDateTime = `${convertedDate}T00:00:00.000Z`;

        //finding if slot is Already exists or not
        const findSlot = await Slot.findOne({
            where:{
                    date: {
                        [Op.eq]:convertedDateTime
                    },
                    startTime: {
                       [Op.gte]: sTime
                    },
                    
                    endTime: {
                       [Op.lte]: eTime
                    }        
            }
        });

        //console.log("--> ",findSlot);
        if (findSlot === null) {

            const createSlot = await Slot.create({ date: convertedDate, startTime: sTime, endTime: eTime });
            console.log(createSlot);
            res.status(201).json({ msg: "Slot created successfully" });
        }
        else {
            res.status(400).json({ msg: "No one booked with a slot time that already exists" })
        }

    }
    catch (err) {
        res.status(500).json({ msg: err, success: false })
    }
}

//---------------------------------------------------
//Listing the Available Slots
exports.listSlots = async(req,res) => {
    try{
        const slots = await Slot.findAll();
        res.status(200).json({AvailableSlots:slots});
    }
    catch(err){
        res.status(500).json({ msg: err, success: false })
    }
}