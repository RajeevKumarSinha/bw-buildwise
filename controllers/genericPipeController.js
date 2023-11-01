"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../helpers/helper.js`)

const genericPipeService = require(`${__dirname}/../services/genericPipeService`)

exports.getGenericPipes = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await genericPipeService.getPagedGenericPipes(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching GenericPipes Data."))
	}
}

exports.setGenericPipe = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdGenericPipeObj = await genericPipeService.createGenericPipe(updateDetail)
		res.status(201).json({
			status: "success",
			message: "New generic pipe created successfuly.",
			data: createdGenericPipeObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A generic pipe with the same data already exists.", 400))
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

		let updateDetail = req.body

		if (!id) return next(errObject("Generic pipe Id is required to update genericPipe details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("genericPipe type update details Can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		await genericPipeService.patchGenericPipe(id, updateDetail)
		res.status(200).json({ status: "success", message: `GenericPipe updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)
		next(errObject("A generic pipe with the same data already exists.", 400))
	}
}
