"use strict"

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const genericPipeService = require(`${__dirname}/../services/genericPipeService`)

exports.getGenericPipes = async (req, res, next) => {
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

		const response = await genericPipeService.getPagedGenericPipes(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching GenericPipes Data."))
	}
}

exports.setGenericPipe = async (req, res, next) => {
	try {
		const genericPipeReq = req.body
		const createdGenericPipeObj = await genericPipeService.createGenericPipe(genericPipeReq)
		res.status(201).json({
			status: "success",
			message: "New generic pipe created successfuly.",
			data: createdGenericPipeObj,
		})
	} catch (error) {
		next(error)
	}
}

/**
 *	removeGenericPipe
 *
 *	Description: removes a genericPipe by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeGenericPipe = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if genericPipe ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await genericPipeService.deleteGenericPipe(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete genericPipe arrays", 400))
	}
}

/**
 *	updateGenericPipe
 *
 *	Description: Updates a genericPipe by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateGenericPipe = async (req, res, next) => {
	try {
		const id = req.params.id

		const updateDetail = req.body

		if (!id) return next(errObject("Generic pipe Id is required to update genericPipe details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("genericPipe type update details Can't be empty.", 400))

		await genericPipeService.patchGenericPipe(id, updateDetail)
		res.status(200).json({ status: "success", message: `GenericPipe updated successfully.` })
	} catch (error) {
		next(error)
	}
}
