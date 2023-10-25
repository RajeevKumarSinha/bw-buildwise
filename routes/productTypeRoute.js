"use strict"

const express = require("express")
const productTypeRouter = express.Router()
const productTypeController = require(`${__dirname}/../controllers/productTypeController`)

productTypeRouter.route("/").get(productTypeController.getProductType).post(productTypeController.setProductType)

productTypeRouter
	.route("/:id")
	.delete(productTypeController.removeProductType)
	.patch(productTypeController.updateProductType)

module.exports = productTypeRouter
