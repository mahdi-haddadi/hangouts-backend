const router = require('express').Router()

const { handleSignup ,handleActive} = require('../controllers/userController')

router.post('/signup',handleSignup)
router.post('/active',handleActive)

module.exports = router