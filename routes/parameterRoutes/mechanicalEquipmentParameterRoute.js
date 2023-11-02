"use strict"

const express = require("express")

const mechanicalEquipmentParameterRouter = express.Router()

const mechanicalEquipmentParameter = require(`${__dirname}/../../controllers/parameterControllers/mechanicalEquipmentParameterController`)

mechanicalEquipmentParameterRouter
	.route("/")
	.get(mechanicalEquipmentParameter.getMechanicalEquipmentParameters)
	.post(mechanicalEquipmentParameter.setMechanicalEquipmentParameter)
	.delete(mechanicalEquipmentParameter.removeMechanicalEquipmentParameter)

mechanicalEquipmentParameterRouter.route("/:id").patch(mechanicalEquipmentParameter.updateMechanicalEquipmentParameter)

module.exports = mechanicalEquipmentParameterRouter
