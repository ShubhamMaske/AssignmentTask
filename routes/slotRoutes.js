const express = require('express');
const slotController = require('../controller/bookslot');

const router = express.Router();
router.post('/createSlot',slotController.createSlot);
router.get('/listSlots',slotController.listSlots);

module.exports = router;