"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../../helpers/helper.js`)

const specialPipeFittingParameterService = require(`${__dirname}/../../services/parameterServices/specialPipeFittingParameterService`)

exports.getSpecialPipeFittingParameters = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await specialPipeFittingParameterService.getPagedSpecialPipeFittingParameters(
			pageNo,
			docsPerPage
		)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching SpecialPipeFittingParameter Data."))
	}
}

exports.setSpecialPipeFittingParameter = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdSpecialPipeFittingParameterObj =
			await specialPipeFittingParameterService.createSpecialPipeFittingParameter(updateDetail)
		res.status(201).json({
			status: "success",
			message: "New SpecialPipeFittingParameter created successfuly.",
			data: createdSpecialPipeFittingParameterObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A SpecialPipeFittingParameter with the same data already exists.", 400))
	}
}

/**
 *	removeSpecialPipeFittingParameter
 *
 *	Description: removes a SpecialPipeFittingParameter by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeSpecialPipeFittingParameter = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if SpecialPipeFittingParameter ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await specialPipeFittingParameterService.deleteSpecialPipeFittingParameter(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete SpecialPipeFittingParameter arrays", 400))
	}
}

/**
 *	updateSpecialPipeFittingParameter
 *
 *	Description: Updates a SpecialPipeFittingParameter by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateSpecialPipeFittingParameter = async (req, res, next) => {
	try {
		const id = req.params.id

		let updateDetail = req.body

		if (!id)
			return next(
				errObject(
					"SpecialPipeFittingParameter Id is required to update SpecialPipeFittingParameter details",
					400
				)
			)

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("SpecialPipeFittingParameter type update details Can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const isUpdated = await specialPipeFittingParameterService.patchSpecialPipeFittingParameter(id, updateDetail)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(200).json({ status: "success", message: `SpecialPipeFittingParameter updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)
		next(errObject("A SpecialPipeFittingParameter with the same data already exists.", 400))
	}
}
