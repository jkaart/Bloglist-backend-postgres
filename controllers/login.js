const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { User } = require('../models/')
const { SECRET } = require('../util/config')
const Session = require('../models/session')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: {
      username: username
    }
  })
  const passwordCorrect = password === 'salainen'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return res.status(401).json({ error: 'unauthorized user' })
  }

  const userForToken = {
    id: user.id,
    username: user.username,
  }
  const token = jwt.sign(userForToken, SECRET)

  await Session.destroy({ where: { userId: user.id } })

  const session = await Session.create({ userId: user.id, token })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router

