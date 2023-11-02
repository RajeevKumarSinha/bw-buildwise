"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../helpers/helper.js`)

const productTypeService = require(`${__dirname}/../services/productTypeService.js`)

exports.setProductType = async (req, res, next) => {
	try {
		let updateDetail = req.body
		if (!updateDetail.masterCategory && !updateDetail.mainCategory && !updateDetail.subCategory)
			return next(
				errObject("masterCategory & mainCategory & subCategory are required to add a new ProductType", 400)
			)

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const addedProdType = await productTypeService.createProductType(updateDetail)
		return res
			.status(201)
			.json({ status: "success", message: "New product type added successfully.", data: addedProdType })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A product type with the same data already exists.", 400))
	}
}

exports.getProductType = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10

		const response = await productTypeService.getPagedProductTypes(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching productTypes"))
	}
}
exports.updateProductType = async (req, res, next) => {
	try {
		const id = req.params.id
		let updateDetail = req.body

		if (!id) return next(errObject("ProductType Id is required to update ProuductType details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("ProductType request body can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		await productTypeService.patchProductType(id, updateDetail)
		res.status(200).json({ status: "success", message: `Prouduct type updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A product type with the same data already exists.", 400))
	}
}
exports.removeProductType = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if idArr length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("ProductType ids array cannot be empty", 400))
		}

		const isUpdated = await productTypeService.deleteProductType(idArr)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete ids array", 400))
	}
}
