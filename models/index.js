const Blog = require('./blog')
const User = require('./user')
const ReadLists = require('./read_lists')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadLists, as: 'readings' })

User.hasMany(ReadLists)

module.exports = {
  Blog,
  User,
  ReadLists
}
