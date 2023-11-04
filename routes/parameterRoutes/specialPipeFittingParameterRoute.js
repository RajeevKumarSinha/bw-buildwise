"use strict"

const express = require("express")

const specialPipeFittingParameterRouter = express.Router()

const specialPipeFittingParameter = require(`${__dirname}/../../controllers/parameterControllers/specialPipeFittingParameterController`)

specialPipeFittingParameterRouter
	.route("/")
	.get(specialPipeFittingParameter.getSpecialPipeFittingParameters)
	.post(specialPipeFittingParameter.setSpecialPipeFittingParameter)
	.delete(specialPipeFittingParameter.removeSpecialPipeFittingParameter)

specialPipeFittingParameterRouter.route("/:id").patch(specialPipeFittingParameter.updateSpecialPipeFittingParameter)

module.exports = specialPipeFittingParameterRouter
