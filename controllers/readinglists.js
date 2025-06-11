const { ReadLists } = require('../models')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const read = await ReadLists.create({ blogId: req.body.blog_id, userId: req.body.user_id })

  console.log(read)
  res.json(read)
})

module.exports = router
