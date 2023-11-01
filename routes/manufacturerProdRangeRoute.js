"use strict"

const express = require("express")
const manufacturerProdRangeRouter = express.Router()
const manufacturerProdRangeController = require(`${__dirname}/../controllers/manufacturerProdRangeController`) // Check the path to the controller
// const upload = require("../helpers/bwHelper")

manufacturerProdRangeRouter
	.route("/")
	.get(manufacturerProdRangeController.getManufacturerProdRanges)
	.post(manufacturerProdRangeController.setManufacturerProdRange)
	.delete(manufacturerProdRangeController.removeManufacturerProdRange)

manufacturerProdRangeRouter.route("/:id").patch(manufacturerProdRangeController.updateManufacturerProdRange)
// manufacturerProdRangeRouter.route("/import", upload.single("file")).post(manufacturerProdRangeController.importCountries)

module.exports = manufacturerProdRangeRouter
