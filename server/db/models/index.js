const User = require('./user')
const Note = require('./note')
const Share = require('./share')

Note.hasMany(Share)
Note.belongsTo(User)
User.hasMany(Note)
// User.hasMany(Share)

Share.belongsTo(Note)
Share.belongsTo(User)

// User.hasMany(Share)
/*

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Note,
  Share
}
