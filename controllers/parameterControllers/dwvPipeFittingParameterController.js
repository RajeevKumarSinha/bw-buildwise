"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../../helpers/helper.js`)

const dwvPipeFittingParameterService = require(`${__dirname}/../../services/parameterServices/dwvPipeFittingParameterService`)

exports.getdwvPipeFittingParameters = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await dwvPipeFittingParameterService.getdwvPagedPipeFittingParameters(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching dwvPipeFittngParameter Data."))
	}
}

exports.setdwvPipeFittingParameter = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createddwvPipeFittingParameterObj = await dwvPipeFittingParameterService.createdwvPipeFittingParameter(
			updateDetail
		)
		res.status(201).json({
			status: "success",
			message: "New dwvPipeFittingParameter created successfuly.",
			data: createddwvPipeFittingParameterObj,
		})
	} catch (error) {
		console.log(error)
		if (error.code !== 11000) next(error)
		next(errObject("A dwvPipeFittingParameter with the same data already exists.", 400))
	}
}

/**
 *	removedwvPipeFittingParameter
 *
 *	Description: removes a dwvPipeFittingParameter by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removedwvPipeFittingParameter = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if CommonProductField ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await dwvPipeFittingParameterService.deletedwvPipeFittingParameter(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete dwvPipeFittingParameter arrays", 400))
	}
}

/**
 *	updatedwvPipeFittingParameter
 *
 *	Description: Updates a dwvPipeFittingParameter by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updatedwvPipeFittingParameter = async (req, res, next) => {
	try {
		const id = req.params.id

		let updateDetail = req.body

		if (!id)
			return next(
				errObject("dwvPipeFittingParameter Id is required to update dwvPipeFittingParameter details", 400)
			)

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("dwvPipeFittingParameter type update details Can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		await dwvPipeFittingParameterService.patchdwvPipeFittingParameter(id, updateDetail)
		res.status(200).json({ status: "success", message: `dwvPipeFittingParameter updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)
		next(errObject("A dwvPipeFittingParameter with the same data already exists.", 400))
	}
}
