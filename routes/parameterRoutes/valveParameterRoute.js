"use strict"

const express = require("express")

const valveParameterRouter = express.Router()

const valveParameter = require(`${__dirname}/../../controllers/parameterControllers/valveParameterController`)

valveParameterRouter
	.route("/")
	.get(valveParameter.getValveParameters)
	.post(valveParameter.setValveParameter)
	.delete(valveParameter.removeValveParameter)

valveParameterRouter.route("/:id").patch(valveParameter.updateValveParameter)

module.exports = valveParameterRouter
