"use strict"

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const manufacturerService = require(`${__dirname}/../services/manufacturerService`)

exports.getManufacturers = async (req, res, next) => {
	try {
		const manufacturer = await manufacturerService.getAllManufacturer()
		res.status(200).json({
			status: "success",
			data: manufacturer,
		})
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
		const manufacturerId = req.body.id

		if (!manufacturerId || !manufacturerId.length) {
			return next(errObject(400, "Manufacturer id cannot be empty"))
		}

		await manufacturerService.deleteManufacturer(manufacturerId)
		res.status(204).json({
			status: "success",
			message: `Manufacturer with manufacturerId: ${manufacturerId} deleted successfully`,
		})
	} catch (error) {
		next(errObject(400, "can't delete country with manufacturerId: ${manufacturerId}"))
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
		const updateDetail = req.body
		// res.status(200).json({ req: req.body })
		if (!updateDetail.id) return next(errObject(400, "Manufacturer Id is required to update country details"))

		if (!updateDetail.manufacturerName && !updateDetail.manufacturerCode)
			return next(errObject(400, "Manufacturer Name & Manufacturer Code is required to update country details"))

		const dataToUpdate = {}
		for (const key in updateDetail) {
			if (updateDetail[key]) dataToUpdate[key] = updateDetail[key]
		}
		// if (updateDetail.manufacturerCode) dataToUpdate.countryRegionCode = updateDetail.manufacturerCode
		// console.log(dataToUpdate)
		await manufacturerService.patchManufacturer(updateDetail.id, dataToUpdate)
		res.status(200).json({ status: "success", message: `country with ${updateDetail.id} updated successfully` })
	} catch (error) {
		next(error)
	}
}
