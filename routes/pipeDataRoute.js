"use strict"

const express = require("express")
const pipeDataRouter = express.Router()
const pipeDataController = require(`${__dirname}/../controllers/pipeDataController`)

pipeDataRouter
	.route("/")
	.get(pipeDataController.getPipeDatas)
	.post(pipeDataController.setPipeData)
	.delete(pipeDataController.removePipeData)

pipeDataRouter.route("/:id").patch(pipeDataController.updatePipeData)

module.exports = pipeDataRouter
