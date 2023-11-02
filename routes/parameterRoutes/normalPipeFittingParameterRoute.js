"use strict"

const express = require("express")

const normalPipeFittingParameterRouter = express.Router()

const normalPipeFittingParameter = require(`${__dirname}/../../controllers/parameterControllers/normalPipeFittingParameterController`)

normalPipeFittingParameterRouter
	.route("/")
	.get(normalPipeFittingParameter.getNormalPipeFittingParameters)
	.post(normalPipeFittingParameter.setNormalPipeFittingParameter)
	.delete(normalPipeFittingParameter.removeNormalPipeFittingParameter)

normalPipeFittingParameterRouter.route("/:id").patch(normalPipeFittingParameter.updateNormalPipeFittingParameter)

module.exports = normalPipeFittingParameterRouter
