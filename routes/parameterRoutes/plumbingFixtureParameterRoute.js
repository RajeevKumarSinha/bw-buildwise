"use strict"

const express = require("express")

const plumbingFixtureParameterRouter = express.Router()

const plumbingFixtureParameter = require(`${__dirname}/../../controllers/parameterControllers/plumbingFixtureParameterController`)

plumbingFixtureParameterRouter
	.route("/")
	.get(plumbingFixtureParameter.getPlumbingFixtureParameters)
	.post(plumbingFixtureParameter.setPlumbingFixtureParameter)
	.delete(plumbingFixtureParameter.removePlumbingFixtureParameter)

plumbingFixtureParameterRouter.route("/:id").patch(plumbingFixtureParameter.updatePlumbingFixtureParameter)

module.exports = plumbingFixtureParameterRouter
