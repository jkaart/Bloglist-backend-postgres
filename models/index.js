const Blog = require('./blog')
const User = require('./user')
const ReadLists = require('./read_lists')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadLists, as: 'readings' })

User.hasMany(ReadLists)
User.hasOne(Session)

module.exports = {
  Blog,
  User,
  ReadLists,
  Session
}
