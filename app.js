const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');

const slotRoutes = require('./routes/slotRoutes');

const db = require('./utils/database');
const scheduler =require('./utils/scheduler');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json({ extended: false }));

app.use('/slot',slotRoutes);

db.sync()
    .then(result => {
        app.listen(3000);
        console.log("Success");
    })
    .catch(err => {
        console.log(err);
    })



//Schedule the deletion task of old Slot from DB to run every day at midnight
cron.schedule('0 0 * * *', scheduler.deleteOldSlot);