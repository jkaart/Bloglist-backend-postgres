const { ReadLists } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const read = await ReadLists.create({ blogId: req.body.blog_id, userId: req.body.user_id })

  res.json(read)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readList = await ReadLists.findByPk(req.params.id)

  if (!req.body?.read) {
    return res.status(400).json({ error: 'read missing from body' })
  }

  if (req.user.id !== readList.userId) {
    return res.status(401).send({ error: 'unauthorized user' })
  }

  readList.read = req.body.read
  const savedReadList = await readList.save()

  res.json(savedReadList)
})

module.exports = router
