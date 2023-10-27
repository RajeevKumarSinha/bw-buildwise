"use strict"

const express = require("express")
const materialRouter = express.Router()
const materialTypeController = require(`${__dirname}/../controllers/materialTypeController`) // Check the path to the controller
// const upload = require("../helpers/bwHelper")

materialRouter
	.route("/")
	.get(materialTypeController.getMaterialTypes)
	.post(materialTypeController.setMaterialType)
	.delete(materialTypeController.removeMaterialType)

materialRouter.route("/:id").patch(materialTypeController.updateMaterialType)
// materialRouter.route("/import", upload.single("file")).post(materialTypeController.importCountries)

module.exports = materialRouter
