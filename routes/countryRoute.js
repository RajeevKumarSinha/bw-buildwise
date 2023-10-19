"use strict"

// const express = require("express")
// const { getCountries, setCountries, importCountries } = require("../controllers/countryControllers")
// const upload = require(`${__dirname}/../helpers/bwHelper.js`)

// const countryRouter = express.Router()

// countryRouter.route("/").get(getCountries).post(setCountries)
// countryRouter.route("/import", upload.single("file")).post(importCountries)
// module.exports = countryRouter

// app/routes/countryRoute.js
const express = require("express")
const countryRouter = express.Router()
const countryController = require("../controllers/countryController") // Check the path to the controller
// const upload = require("../helpers/bwHelper")

countryRouter
	.route("/")
	.get(countryController.getCountries)
	.post(countryController.setCountries)
	.delete(countryController.removeCountry)
	.patch(countryController.updateCountry)
// countryRouter.route("/import", upload.single("file")).post(countryController.importCountries)

module.exports = countryRouter
