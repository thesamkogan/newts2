const router = require('express').Router()


router.use('/users', require('./users'))
router.use('/notes', require('./notes'))
router.use('/shares', require('./shares'))

router.use((req, res, next) => {
  const error = new Error('Not Founded')
  error.status = 404
  next(error)
})

module.exports = router
