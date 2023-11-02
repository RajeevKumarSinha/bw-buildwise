"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../../helpers/helper.js`)

const valveParameterService = require(`${__dirname}/../../services/parameterServices/valveParameterService`)

exports.getValveParameters = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await valveParameterService.getPagedValveParameters(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching ValveParameters Data."))
	}
}

exports.setValveParameter = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdValveParameterObj = await valveParameterService.createValveParameter(updateDetail)
		res.status(201).json({
			status: "success",
			message: "New ValveParameter created successfuly.",
			data: createdValveParameterObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A ValveParameter with the same data already exists.", 400))
	}
}

/**
 *	removeValveParameter
 *
 *	Description: removes a ValveParameter by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeValveParameter = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if ValveParameter ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await valveParameterService.deleteValveParameter(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete ValveParameter arrays", 400))
	}
}

/**
 *	updateValveParameter
 *
 *	Description: Updates a ValveParameter by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateValveParameter = async (req, res, next) => {
	try {
		const id = req.params.id

		let updateDetail = req.body

		if (!id) return next(errObject("ValveParameter Id is required to update ValveParameter details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("ValveParameter type update details Can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const isUpdated = await valveParameterService.patchValveParameter(id, updateDetail)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(200).json({ status: "success", message: `ValveParameter updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)
		next(errObject("A ValveParameter with the same data already exists.", 400))
	}
}
