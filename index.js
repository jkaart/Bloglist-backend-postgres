require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    res.json(blog)
  }
  catch (error) {
    res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const returnedCount = await Blog.destroy({ where: { id: req.params.id } })
  if (returnedCount === 0) {
    return res.status(404).end()
  }
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/* const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
} */
/* 
main() */

