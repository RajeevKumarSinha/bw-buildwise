"use strict"

const express = require("express")
const connectionTypeRouter = express.Router()
const connectionTypeController = require(`${__dirname}/../controllers/connectionTypeController`) // Check the path to the controller
// const upload = require("../helpers/bwHelper")

connectionTypeRouter
	.route("/")
	.get(connectionTypeController.getConnectionTypes)
	.post(connectionTypeController.setConnectionType)
	.delete(connectionTypeController.removeConnectionType)

connectionTypeRouter.route("/:id").patch(connectionTypeController.updateConnectionType)
// connectionTypeRouter.route("/import", upload.single("file")).post(connectionTypeController.importCountries)

module.exports = connectionTypeRouter
