"use strict"

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const MasterPipe = require(`${__dirname}/../models/masterPipeModel.js`)

const masterPipeService = require(`${__dirname}/../services/masterPipeService`)

exports.getMasterPipes = async (req, res, next) => {
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

		const totalDocs = await MasterPipe.countDocuments()
		const masterPipesData = await masterPipeService.getPagedMasterPipes(pageNo, docsPerPage)

		const response = {
			total: totalDocs,
			masterPipesData,
		}

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching masterPipesData"))
	}
}

exports.setMasterPipe = async (req, res, next) => {
	try {
		const masterPipeReq = req.body
		const createdMasterPipeObj = await masterPipeService.createMasterPipe(masterPipeReq)
		res.status(201).json({ status: "success", message: "new masterPipe is created.", data: createdMasterPipeObj })
	} catch (error) {
		next(error)
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
		const updateDetail = req.body

		if (!id) return next(errObject("MasterPipe Id is required to update masterPipe details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("masterPipe update details Can't be empty.", 400))

		await masterPipeService.patchMaterialType(id, updateDetail)
		res.status(200).json({ status: "success", message: `masterPipe with ${id} updated successfully` })
	} catch (error) {
		next(error)
	}
}
