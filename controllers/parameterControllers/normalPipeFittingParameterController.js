"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../../helpers/helper.js`)

const normalPipeFittingParameterService = require(`./../../services/parameterServices/normalPipeFittingParameterService.js`)

exports.getNormalPipeFittingParameters = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await normalPipeFittingParameterService.getPagedNormalPipeFittingParameters(
			pageNo,
			docsPerPage
		)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching NormalPipeFittingParameters Data."))
	}
}

exports.setNormalPipeFittingParameter = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdNormalPipeFittingParameterObj =
			await normalPipeFittingParameterService.createNormalPipeFittingParameter(updateDetail)
		res.status(201).json({
			status: "success",
			message: "New NormalPipeFittingParameter created successfuly.",
			data: createdNormalPipeFittingParameterObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A NormalPipeFittingParameter with the same data already exists.", 400))
	}
}

/**
 *	removeNormalPipeFittingParameter
 *
 *	Description: removes a NormalPipeFittingParameter by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeNormalPipeFittingParameter = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if NormalPipeFittingParameter ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await normalPipeFittingParameterService.deleteNormalPipeFittingParameter(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete NormalPipeFittingParameter arrays", 400))
	}
}

/**
 *	updateNormalPipeFittingParameter
 *
 *	Description: Updates a NormalPipeFittingParameter by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateNormalPipeFittingParameter = async (req, res, next) => {
	try {
		const id = req.params.id

		let updateDetail = req.body

		if (!id)
			return next(
				errObject("NormalPipeFittingParameter Id is required to update NormalPipeFittingParameter details", 400)
			)

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("NormalPipeFittingParameter type update details Can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		await normalPipeFittingParameterService.patchNormalPipeFittingParameter(id, updateDetail)
		res.status(200).json({ status: "success", message: `NormalPipeFittingParameter updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)
		next(errObject("A NormalPipeFittingParameter with the same data already exists.", 400))
	}
}
