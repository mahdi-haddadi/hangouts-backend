const router = require('express').Router()

const { handleSignup } = require('../controllers/user/signup')

router.post('/signup',handleSignup)

module.exports = router