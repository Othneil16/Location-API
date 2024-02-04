const { saveLocation } = require("../controllers/locationCont");

const router = require("express").Router()

router.get('/v1/getlocation',saveLocation);
module.exports = router
