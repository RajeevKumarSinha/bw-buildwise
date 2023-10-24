"use strict"

const { errObject, errorHandler } = require(`${__dirname}/../helpers/helper.js`)

const Manufacturer = require(`${__dirname}/../models/manufacturerModel.js`)

const manufacturerService = require(`${__dirname}/../services/manufacturerService`)

exports.getManufacturers = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10

		const totalDocs = await Manufacturer.countDocuments()
		const manufacturers = await manufacturerService.getPagedManufacturer(pageNo, docsPerPage)

		const response = {
			total: totalDocs,
			manufacturers,
		}

		res.status(200).json(response)
	} catch (error) {
		console.log(error)
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching manufacturer"))
	}
}

exports.setManufacturer = async (req, res, next) => {
	try {
		const manufacturerObj = req.body
		const createdManufacturer = await manufacturerService.createManufacturer(manufacturerObj)
		res.status(201).json({ status: "success", data: createdManufacturer })
	} catch (error) {
		next(error)
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
		const manufacturerId = req.params.id

		// manufacturerId shouldn't be undefined and its length should be greater than 0.
		if (!manufacturerId || !manufacturerId.length) return next(errObject(400, "Manufacturer id cannot be empty"))

		// if manufacturer is not present throw an error
		if ((await Manufacturer.find({ _id: manufacturerId })).length === 0)
			return next(errObject(404, "Manufacturer id is Invalid"))

		await manufacturerService.deleteManufacturer(manufacturerId)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject(400, `can't delete country with manufacturerId: ${manufacturerId}`))
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
		const dataToUpdate = req.body
		await Manufacturer.findOne({ _id: updateId }) // throws Cast to ObjectId failed error if id is not valid

		// console.log(await Manufacturer.findOne({ _id: updateId }))

		// if updateId is falsy , throw an error
		if (!updateId) return next(errObject(400, "Manufacturer Id is required to update country details"))

		// if updateData is empty , throw an error
		if (Object.keys(dataToUpdate).length === 0)
			return next(errObject(400, "Data is required to update Manufacturer details"))

		// if ((
		// ).length === 0) {
		// return next(errObject(400, "Invalid id"))
		// }

		// if countryCode is present in req body make it uppercase
		if (dataToUpdate.countryCode) dataToUpdate.countryCode = dataToUpdate.countryCode.toUpperCase()

		await manufacturerService.patchManufacturer(updateId, dataToUpdate)
		res.status(200).json({ status: "success", message: `Manufacturer with ${updateId} updated successfully` })
	} catch (error) {
		next(error)
	}
}
