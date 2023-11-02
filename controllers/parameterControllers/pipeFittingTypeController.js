"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../../helpers/helper.js`)

const pipeFittingTypeService = require(`${__dirname}/../../services/parameterServices/pipeFittingTypeService`)

exports.getPipeFittingTypes = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await pipeFittingTypeService.getPagedPipeFittingTypes(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		console.log(error)
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching PipeFittingTypes Data."))
	}
}

exports.setPipeFittingType = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdPipeFittingTypeObj = await pipeFittingTypeService.createPipeFittingType(updateDetail)
		res.status(201).json({
			status: "success",
			message: "New PipeFittingType created successfuly.",
			data: createdPipeFittingTypeObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A PipeFittingType with the same data already exists.", 400))
	}
}

/**
 *	removePipeFittingType
 *
 *	Description: removes a PipeFittingType by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removePipeFittingType = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if CommonProductField ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		//const isDeleted = await pipeFittingTypeService.deletePipeFittingType(idArr)
		await pipeFittingTypeService.deletePipeFittingType(idArr)
		// console.log(isDeleted) // { acknowledged: true, deletedCount: 0 } // gives no. of deleted items.
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete PipeFittingType data.", 400))
	}
}

/**
 *	updatePipeFittingType
 *
 *	Description: Updates a PipeFittingType by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updatePipeFittingType = async (req, res, next) => {
	try {
		const id = req.params.id

		let updateDetail = req.body

		if (!id) return next(errObject("PipeFittingType Id is required to update PipeFittingType details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("PipeFittingType type update details Can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const isUpdated = await pipeFittingTypeService.patchPipeFittingType(id, updateDetail)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(200).json({ status: "success", message: `PipeFittingType updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)
		next(errObject("A PipeFittingType with the same data already exists.", 400))
	}
}
