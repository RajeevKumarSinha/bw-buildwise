"use strict"

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const MaterialType = require(`${__dirname}/../models/materialTypeModel.js`)

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

		const totalDocs = await MaterialType.countDocuments()
		const materialTypesData = await materialTypeService.getPagedMaterialTypes(pageNo, docsPerPage)

		const response = {
			total: totalDocs,
			materialTypesData,
		}

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching materialTypesData"))
	}
}

exports.setMaterialType = async (req, res, next) => {
	try {
		const materialTypeReq = req.body
		const createdMaterialObj = await materialTypeService.createMaterialType(materialTypeReq)
		res.status(201).json({ status: "success", message: "new materialType is created.", data: createdMaterialObj })
	} catch (error) {
		next(error)
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
		const materialTypeId = req.params.id

		// if materialType id is not present or if length is 0 throw an error
		if (!materialTypeId || !materialTypeId.length) {
			return next(errObject("MaterialType id cannot be empty", 400))
		}

		await materialTypeService.deleteMaterialType(materialTypeId)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject(400, "Invalid ID"))
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
		const updateDetail = req.body

		if (!id) return next(errObject("MaterialType Id is required to update materialType details", 400))

		if (!updateDetail.materialTypeName && !updateDetail.materialTypeCode)
			return next(
				errObject("MaterialType Name & MaterialType Code is required to update materialType details", 400)
			)

		await materialTypeService.patchMaterialType(id, updateDetail)
		res.status(200).json({ status: "success", message: `materialType with ${id} updated successfully` })
	} catch (error) {
		next(error)
	}
}
