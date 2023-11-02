"use strict"

const express = require("express")

const pipeFittingTypeRouter = express.Router()

const pipeFittingType = require(`${__dirname}/../../controllers/parameterControllers/pipeFittingTypeController`)

pipeFittingTypeRouter
	.route("/")
	.get(pipeFittingType.getPipeFittingTypes)
	.post(pipeFittingType.setPipeFittingType)
	.delete(pipeFittingType.removePipeFittingType)

pipeFittingTypeRouter.route("/:id").patch(pipeFittingType.updatePipeFittingType)

module.exports = pipeFittingTypeRouter
