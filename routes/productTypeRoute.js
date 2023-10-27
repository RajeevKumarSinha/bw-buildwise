"use strict"

const express = require("express")
const productTypeRouter = express.Router()
const productTypeController = require(`${__dirname}/../controllers/productTypeController`)

productTypeRouter
	.route("/")
	.get(productTypeController.getProductType)
	.post(productTypeController.setProductType)
	.delete(productTypeController.removeProductType)

productTypeRouter.route("/:id").patch(productTypeController.updateProductType)

module.exports = productTypeRouter
