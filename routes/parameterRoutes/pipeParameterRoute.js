"use strict"

const express = require("express")

const pipeParameterRouter = express.Router()

const pipeParameter = require(`${__dirname}/../../controllers/parameterControllers/pipeParameterController`)

pipeParameterRouter
	.route("/")
	.get(pipeParameter.getPipeParameters)
	.post(pipeParameter.setPipeParameter)
	.delete(pipeParameter.removePipeParameter)

pipeParameterRouter.route("/:id").patch(pipeParameter.updatePipeParameter)

module.exports = pipeParameterRouter
