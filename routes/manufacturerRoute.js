"use strict"

const express = require("express")
const manufacturerRouter = express.Router()
const manufacturerController = require(`${__dirname}/../controllers/manufacturerController`)

manufacturerRouter.route("/").get(manufacturerController.getManufacturers).post(manufacturerController.setManufacturer)

manufacturerRouter
	.route("/:id")
	.delete(manufacturerController.removeManufacturer)
	.patch(manufacturerController.updateManufacturer)

module.exports = manufacturerRouter
