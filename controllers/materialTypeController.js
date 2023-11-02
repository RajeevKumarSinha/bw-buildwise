"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../helpers/helper.js`)

const materialTypeService = require(`${__dirname}/../services/materialTypeService`)

exports.getMaterialTypes = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10

		//////////////////////////////////////////////////////////////fuzzy search on hold.
		// const searchQuery = req.query.search || "" // Change to your specific query parameter name

		// Build a dynamic query for the fuzzy search
		// const query = {
		// 	$or: [
		// 		{ property1: { $regex: searchQuery, $options: "i" } }, // Adjust property names
		// 		{ property2: { $regex: searchQuery, $options: "i" } },
		// 		// Add more properties as needed
		// 	],
		// }
		///////////////////////////////////////////////////////////////////////////

		const response = await materialTypeService.getPagedMaterialTypes(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching materialTypesData"))
	}
}

exports.setMaterialType = async (req, res, next) => {
	try {
		const updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdMaterialObj = await materialTypeService.createMaterialType(updateDetail)
		res.status(201).json({
			status: "success",
			message: "New material type data is created successfully.",
			data: createdMaterialObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A material type with the same data already exists.", 400))
	}
}

/**
 *	removeMaterialType
 *
 *	Description: removes a materialType by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeMaterialType = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if materialType ids is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("MaterialType ids array cannot be empty", 400))
		}

		await materialTypeService.deleteMaterialType(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete materialtype arrays", 400))
	}
}

/**
 *	updateMaterialType
 *
 *	Description: Updates a materialType by its id.
 *
 * There should be an id and any one of the materialTypeCode, materialTypeName field to update.
 *
 **/

exports.updateMaterialType = async (req, res, next) => {
	try {
		const id = req.params.id
		let updateDetail = req.body

		if (!id) return next(errObject("MaterialType Id is required to update materialType details", 400))

		if (!updateDetail.materialTypeName && !updateDetail.materialTypeCode)
			return next(
				errObject("MaterialType Name & MaterialType Code is required to update materialType details", 400)
			)

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const isUpdated = await materialTypeService.patchMaterialType(id, updateDetail)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(200).json({ status: "success", message: `Material type updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A material type with the same data already exists.", 400))
	}
}
