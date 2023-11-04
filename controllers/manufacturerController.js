"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../helpers/helper.js`)

const manufacturerService = require(`${__dirname}/../services/manufacturerService`)

exports.getManufacturers = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10

		const response = await manufacturerService.getPagedManufacturer(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// console.log(error)
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching manufacturer"))
	}
}

exports.setManufacturer = async (req, res, next) => {
	try {
		let manufacturerObj = req.body
		// console.log(manufacturerObj)
		// convert the manufacturerObj object to titleCase
		manufacturerObj = titleCaseObject(manufacturerObj)

		const createdManufacturer = await manufacturerService.createManufacturer(manufacturerObj)
		res.status(201).json({
			status: "success",
			message: "Manufacturer created Successfully",
			data: createdManufacturer,
		})
	} catch (error) {
		// console.log(error)
		if (error.code !== 11000) next(error)

		next(errObject("A manufacturer with the same data already exists.", 400))
	}
}

/**
 *	removeManufacturer
 *
 *	Description: removes a manufacturer  by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeManufacturer = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if idArr length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("manufacturer ids cannot be empty", 400))
		}

		await manufacturerService.deleteManufacturer(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject(`Can't delete manufacturers with ids array.`, 400))
	}
}

// /**
//  *	updateManufacturer
//  *
//  *	Description: Updates a manufacturer by its id.
//  *
//  * There should be an id and any one of the manufacturerCode, manufacturerName field to update.
//  *
//  **/

exports.updateManufacturer = async (req, res, next) => {
	try {
		const updateId = req.params.id
		let dataToUpdate = req.body
		// console.log(dataToUpdate)

		// if updateId is falsy , throw an error
		if (!updateId) return next(errObject("Manufacturer Id is required to update country details", 400))

		// if updateData is empty , throw an error
		if (Object.keys(dataToUpdate).length === 0)
			return next(errObject("Data is required to update Manufacturer details", 400))

		// if countryCode is present in req body make it uppercase
		// if (dataToUpdate.countryCode) dataToUpdate.countryCode = dataToUpdate.countryCode.toUpperCase()

		// convert the dataToUpdate object to titleCase
		dataToUpdate = titleCaseObject(dataToUpdate)

		const isUpdated = await manufacturerService.patchManufacturer(updateId, dataToUpdate)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(200).json({ status: "success", message: `Manufacturer updated successfully` })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A manufacturer product range with the same data already exists.", 400))
	}
}
