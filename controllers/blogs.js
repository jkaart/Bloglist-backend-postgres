const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  req.blog = blog
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  //console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.post('/', async (req, res) => {
  // try {
  console.log(req.body)
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
  /*   }
    catch (error) {
      res.status(400).json({ error })
    } */
})

router.delete('/:id', blogFinder, async (req, res) => {
  await req.blog.destroy()
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = Number(req.body.likes)
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router
