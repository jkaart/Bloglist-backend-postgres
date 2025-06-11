const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { tokenExtractor, blogFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    console.log(req.query.search)
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}$`
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  })
  //console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  //console.log('body:', req.body)

  const blog = await Blog.create({ ...req.body, userId: req.user.id })
  res.status(201).json(blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.user.id !== req.blog.userId) {
    return res.status(401).send({ error: 'unauthorized user' })
  }
  await req.blog.destroy()
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = Number(req.body.likes)
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router
