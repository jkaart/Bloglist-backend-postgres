const router = require('express').Router()

const { Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', tokenExtractor, async (req, res) => {
  await Session.destroy({ where: { userId: req.user.id } })
  return res.status(200).end()
})

module.exports = router
