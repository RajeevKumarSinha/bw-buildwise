"use strict"

const express = require("express")
const countryRouter = express.Router()
const countryController = require("../controllers/countryController") // Check the path to the controller
// const upload = require("../helpers/bwHelper")

countryRouter.route("/").get(countryController.getCountries).post(countryController.setCountries)

countryRouter.route("/:id").delete(countryController.removeCountry).patch(countryController.updateCountry)
// countryRouter.route("/import", upload.single("file")).post(countryController.importCountries)

module.exports = countryRouter
