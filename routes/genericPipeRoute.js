"use strict"

const express = require("express")
const genericPipeRouter = express.Router()
const genericPipeController = require(`${__dirname}/../controllers/genericPipeController`) // Check the path to the controller
// const upload = require("../helpers/bwHelper")

genericPipeRouter
	.route("/")
	.get(genericPipeController.getGenericPipes)
	.post(genericPipeController.setGenericPipe)
	.delete(genericPipeController.removeGenericPipe)

genericPipeRouter.route("/:id").patch(genericPipeController.updateGenericPipe)
// genericPipeRouter.route("/import", upload.single("file")).post(genericPipeController.importCountries)

module.exports = genericPipeRouter
