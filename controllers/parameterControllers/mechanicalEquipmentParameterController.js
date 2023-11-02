"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../../helpers/helper.js`)

const mechanicalEquipmentParameterService = require(`./../../services/parameterServices/mechanicalEquipmentParameterService.js`)

exports.getMechanicalEquipmentParameters = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await mechanicalEquipmentParameterService.getPagedMechanicalEquipmentParameters(
			pageNo,
			docsPerPage
		)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching MechanicalEquipmentParameters Data."))
	}
}

exports.setMechanicalEquipmentParameter = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdMechanicalEquipmentParameterObj =
			await mechanicalEquipmentParameterService.createMechanicalEquipmentParameter(updateDetail)
		res.status(201).json({
			status: "success",
			message: "New MechanicalEquipmentParameter created successfuly.",
			data: createdMechanicalEquipmentParameterObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A MechanicalEquipmentParameter with the same data already exists.", 400))
	}
}

/**
 *	removeMechanicalEquipmentParameter
 *
 *	Description: removes a MechanicalEquipmentParameter by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeMechanicalEquipmentParameter = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if MechanicalEquipmentParameter ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await mechanicalEquipmentParameterService.deleteMechanicalEquipmentParameter(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete CommonProductField arrays", 400))
	}
}

/**
 *	updateMechanicalEquipmentParameter
 *
 *	Description: Updates a MechanicalEquipmentParameter by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateMechanicalEquipmentParameter = async (req, res, next) => {
	try {
		const id = req.params.id

		let updateDetail = req.body

		if (!id)
			return next(
				errObject(
					"MechanicalEquipmentParameter Id is required to update MechanicalEquipmentParameter details",
					400
				)
			)

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("MechanicalEquipmentParameter type update details Can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		await mechanicalEquipmentParameterService.patchMechanicalEquipmentParameter(id, updateDetail)
		res.status(200).json({ status: "success", message: `MechanicalEquipmentParameter updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)
		next(errObject("A MechanicalEquipmentParameter with the same data already exists.", 400))
	}
}
