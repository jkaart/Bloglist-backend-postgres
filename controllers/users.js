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
      attributes: ['id', 'author', 'url', 'title', 'likes', 'year']
    },
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const { read } = req.query
  const where = {}

  if (read !== undefined) {
    where.read = read
  }

  const user = await User.findByPk(req.params.id, {
    include: [{
      model: Blog,
      as: 'readings',
      attributes: ['id', 'author', 'url', 'title', 'likes', 'year'],
      through: {
        as: 'readinglists',
        attributes: ['id', 'read'],
        where
      },
    },
    ]
  })

  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  res.json(user)
})

router.put('/:username', async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ where: { username } })

  if (!user) {
    return res.status(404).json({ error: 'username not found' })
  }
  user.username = req.body.username

  await user.save()
  res.json(user)
})

module.exports = router
