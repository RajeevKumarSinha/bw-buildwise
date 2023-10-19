"use strict"

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const countryService = require(`${__dirname}/../services/countryService`)

const Country = require(`${__dirname}/../models/countryModel`)

exports.getCountries = async (req, res, next) => {
	try {
		const countries = await countryService.getAllCountries()
		res.status(200).json({
			status: "success",
			data: countries,
		})
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching countries"))
	}
}

exports.setCountries = async (req, res, next) => {
	try {
		const country = req.body
		const createdCountry = await countryService.createCountry(country)
		res.status(201).json({ status: "success", data: createdCountry })
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(error)
	}
}

exports.removeCountry = async (req, res, next) => {
	try {
		const countryId = req.body.id

		if (!countryId || !countryId.length) {
			return next(errObject(400, "Country id cannot be empty"))
		}

		await countryService.deleteCountry(countryId)
		res.status(204).json({
			status: "success",
			message: `Country with countryId: ${countryId} deleted successfully`,
		})
	} catch (error) {
		throw error
	}
}

exports.updateCountry = async (req, res, next) => {
	try {
		const updateDetail = req.body
		// res.status(200).json({ req: req.body })
		if (!updateDetail.id) return next(errObject(400, "Country Id is required to update country details"))

		const x = await Country.findById(updateDetail.id)
		// return next(errObject(400, "Country does not exist for given id"))

		if (!updateDetail.countryName && !updateDetail.countryCode)
			return next(errObject(400, "Country Name & Country Code is required to update country details"))

		const dataToUpdate = {}
		if (updateDetail.countryName) dataToUpdate.countryRegionName = updateDetail.countryName
		if (updateDetail.countryCode) dataToUpdate.countryRegionCode = updateDetail.countryCode
		await countryService.patchCountry(updateDetail.id, dataToUpdate)
		res.status(200).json({ status: "success", message: `country with ${updateDetail.id} updated successfully` })
	} catch (error) {
		next(error)
	}
}
