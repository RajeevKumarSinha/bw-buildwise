"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../helpers/helper.js`)

const connectionTypeService = require(`${__dirname}/../services/connectionTypeService`)

exports.getConnectionTypes = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const dropdown = req.query.dropdown || null

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

		const response = await connectionTypeService.getPagedConnectionTypes(pageNo, docsPerPage, dropdown)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching connectionTypes Data."))
	}
}

exports.setConnectionType = async (req, res, next) => {
	try {
		let connectionReq = req.body

		// convert the connectionReq object to titleCase
		connectionReq = titleCaseObject(connectionReq)

		const createdConnectionObj = await connectionTypeService.createConnectionType(connectionReq)
		res.status(201).json({
			status: "success",
			message: "New connection created successfuly.",
			data: createdConnectionObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A connection with the same name or code already exists.", 400))
	}
}

/**
 *	removeConnectionType
 *
 *	Description: removes a connection by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeConnectionType = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if connection ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await connectionTypeService.deleteConnectionType(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete connection arrays", 400))
	}
}

/**
 *	updateConnectionType
 *
 *	Description: Updates a connection by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateConnectionType = async (req, res, next) => {
	try {
		const id = req.params.id

		let updateDetail = req.body

		if (!id) return next(errObject("Connection type Id is required to update connection details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("connection type update details Can't be empty.", 400))

		// change updateDetail into titleCase before updating.
		updateDetail = titleCaseObject(updateDetail)

		const isUpdated = await connectionTypeService.patchConnectionType(id, updateDetail)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(200).json({ status: "success", message: `Connection updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A connection with the same name or code already exists.", 400))
	}
}
