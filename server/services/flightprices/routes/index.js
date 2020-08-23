const router = require('express').Router()
const flightControllers = require('../controllers/flightControllers')

router.post('/flightPrice', flightControllers.getFlightData)

module.exports = router;
