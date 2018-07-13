

const Sequelize = require('sequelize')
const db = require('../db')

const Share = db.define('share', {
  readonly: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Share
