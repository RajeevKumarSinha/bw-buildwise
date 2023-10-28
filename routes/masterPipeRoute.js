"use strict"

const express = require("express")
const masterPipeRouter = express.Router()
const masterPipeController = require(`${__dirname}/../controllers/masterPipeController`) // Check the path to the controller
// const upload = require("../helpers/bwHelper")

masterPipeRouter
	.route("/")
	.get(masterPipeController.getMasterPipes)
	.post(masterPipeController.setMasterPipe)
	.delete(masterPipeController.removeMasterPipe)

masterPipeRouter.route("/:id").patch(masterPipeController.updateMasterPipe)
// masterPipeRouter.route("/import", upload.single("file")).post(masterPipeController.importCountries)

module.exports = masterPipeRouter
