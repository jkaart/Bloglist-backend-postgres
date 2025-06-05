const router = require('express').Router()

const { User, Blog } = require('../models')

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['id', 'author', 'url', 'title', 'likes']
    },
  })
  res.json(users)
})

router.put('/:username', async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ where: { username } })
  if (!user) {
    return res.status(404).json({ error: 'Username not found' })
  }
  user.username = req.body.username

  await user.save()
  res.json(user)
})


module.exports = router
