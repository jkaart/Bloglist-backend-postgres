const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Blog, User } = require('../models')

const errorHandler = (error, req, res, next) => {
  console.error(`${error.name}: ${error.message}`)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.message })
  } if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), SECRET)
    const user = await User.findByPk(decodedToken.id)
    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }
    req.user = user
  }
  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }
  req.blog = blog
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  blogFinder,
}
