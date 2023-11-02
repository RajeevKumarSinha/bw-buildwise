"use strict"

const express = require("express")

const commonProductFieldRouter = express.Router()

const commonProductField = require(`${__dirname}/../../controllers/parameterControllers/commonProductFieldController`)

commonProductFieldRouter
	.route("/")
	.get(commonProductField.getCommonProductFields)
	.post(commonProductField.setCommonProductField)
	.delete(commonProductField.removeCommonProductField)

commonProductFieldRouter.route("/:id").patch(commonProductField.updateCommonProductField)

module.exports = commonProductFieldRouter
