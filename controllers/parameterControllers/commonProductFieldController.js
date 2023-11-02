"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../../helpers/helper.js`)

const commonProductFieldService = require(`${__dirname}/../../services/parameterServices/commonProductFieldService`)

exports.getCommonProductFields = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await commonProductFieldService.getPagedCommonProductFields(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching commonProductFields Data."))
	}
}

exports.setCommonProductField = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdCommonProductFieldObj = await commonProductFieldService.createCommonProductField(updateDetail)
		res.status(201).json({
			status: "success",
			message: "New CommonProductField created successfuly.",
			data: createdCommonProductFieldObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A CommonProductField with the same data already exists.", 400))
	}
}

/**
 *	removeCommonProductField
 *
 *	Description: removes a CommonProductField by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeCommonProductField = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if CommonProductField ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await commonProductFieldService.deleteCommonProductField(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete CommonProductField arrays", 400))
	}
}

/**
 *	updateCommonProductField
 *
 *	Description: Updates a CommonProductField by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateCommonProductField = async (req, res, next) => {
	try {
		const id = req.params.id

		let updateDetail = req.body

		if (!id) return next(errObject("CommonProductField Id is required to update CommonProductField details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("CommonProductField type update details Can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const isUpdated = await commonProductFieldService.patchCommonProductField(id, updateDetail)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(200).json({ status: "success", message: `CommonProductField updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)
		next(errObject("A CommonProductField with the same data already exists.", 400))
	}
}
