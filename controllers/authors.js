const { fn, col } = require('sequelize')
const { Blog } = require('../models')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: ['author', [fn('COUNT', col('author')), 'blogs'], [fn('SUM', col('likes')), 'likes']],
    group: ['author'],
    order: [['likes', 'DESC']]
  })
  res.json(authors)
})

module.exports = router
