"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../helpers/helper.js`)

const masterPipeService = require(`${__dirname}/../services/masterPipeService`)

exports.getMasterPipes = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const unit = req.query.unit || null

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

		const response = await masterPipeService.getPagedMasterPipes(pageNo, docsPerPage, unit)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching masterPipesData"))
	}
}

exports.setMasterPipe = async (req, res, next) => {
	try {
		let masterPipeReq = req.body

		// convert the masterPipeReq object to titleCase
		masterPipeReq = titleCaseObject(masterPipeReq)

		const createdMasterPipeObj = await masterPipeService.createMasterPipe(masterPipeReq)
		res.status(201).json({
			status: "success",
			message: "New master pipe created successfuly.",
			data: createdMasterPipeObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A master pipe with the same data already exists.", 400))
	}
}

/**
 *	removeMasterPipe
 *
 *	Description: removes a masterPipe by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeMasterPipe = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids
		// console.log(idArr)

		// if masterPipe ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("MasterPipe ids array cannot be empty", 400))
		}

		await masterPipeService.deleteMasterPipe(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete masterPipe arrays", 400))
	}
}

/**
 *	updateMasterPipe
 *
 *	Description: Updates a masterPipe by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateMasterPipe = async (req, res, next) => {
	try {
		const id = req.params.id

		let masterPipeReq = req.body

		if (!id) return next(errObject("MasterPipe Id is required to update masterPipe details", 400))

		if (Object.keys(masterPipeReq).length === 0)
			return next(errObject("masterPipe update details Can't be empty.", 400))

		// convert the masterPipeReq object to titleCase
		masterPipeReq = titleCaseObject(masterPipeReq)

		const isUpdated = await masterPipeService.patchMasterPipe(id, masterPipeReq)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(200).json({ status: "success", message: `Master pipe updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A master pipe with the same data already exists.", 400))
	}
}
