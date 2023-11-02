"use strict"

const express = require("express")

const dwvpipeFittingTypeRouter = express.Router()

const dwvPipeFittingParameter = require(`${__dirname}/../../controllers/parameterControllers/dwvPipeFittingParameterController`)

// console.log(dwvPipeFittingParameter)
dwvpipeFittingTypeRouter
	.route("/")
	.get(dwvPipeFittingParameter.getdwvPipeFittingParameters)
	.post(dwvPipeFittingParameter.setdwvPipeFittingParameter)
	.delete(dwvPipeFittingParameter.removedwvPipeFittingParameter)

dwvpipeFittingTypeRouter.route("/:id").patch(dwvPipeFittingParameter.updatedwvPipeFittingParameter)

module.exports = dwvpipeFittingTypeRouter
