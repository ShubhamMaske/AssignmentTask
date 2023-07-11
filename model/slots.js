const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Slots = sequelize.define('slot',{
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATE,
      allowNull : false
    },
    startTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })

  module.exports = Slots;