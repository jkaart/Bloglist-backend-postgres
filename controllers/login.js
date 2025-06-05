const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { User } = require('../models/')

const { SECRET } = require('../util/config')

router.post('/', async (req, res) => {
  const { body } = req

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })
  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }
  const userForToken = {
    id: user.id,
    username: user.username,
  }

  const token = jwt.sign(userForToken, SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router

