"use strict"

const express = require("express")
const countryRouter = express.Router()
const countryController = require("../controllers/countryController") // Check the path to the controller
// const upload = require("../helpers/bwHelper")

countryRouter
	.route("/")
	.get(countryController.getCountries)
	.post(countryController.setCountries)
	.delete(countryController.removeCountry)

countryRouter.route("/:id").patch(countryController.updateCountry)
// countryRouter.route("/import", upload.single("file")).post(countryController.importCountries)

module.exports = countryRouter
