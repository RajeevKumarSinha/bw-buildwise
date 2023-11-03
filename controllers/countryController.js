"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../helpers/helper.js`)

const countryService = require(`${__dirname}/../services/countryService`)

exports.getCountries = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const dropdown = req.query.dropdown === "Yes" ? "Yes" : null

		//////////////////////////////////////////////////////////////fuzzy search on hold.
		// const searchQuery = req.query.search || "" // Change to your specific query parameter name

		// Build a dynamic query for the fuzzy search
		// const query = {
		// 	$or: [
		// 		{ property1: { $regex: searchQuery, $options: "i" } }, // Adjust property names
		// 		{ property2: { $regex: searchQuery, $options: "i" } },
		// 		// Add more properties as needed
		// 	],
		// }
		///////////////////////////////////////////////////////////////////////////

		//  never write query in controller , it should be inside service✅
		const response = await countryService.getPagedCountries(pageNo, docsPerPage, dropdown)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(error)
	}
}

exports.setCountries = async (req, res, next) => {
	try {
		let updateDetail = req.body

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const createdCountry = await countryService.createCountry(updateDetail)
		res.status(201).json({ status: "success", message: "Country created Succesfully", data: createdCountry })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A country with the same data already exists.", 400))
	}
}

/**
 *	removeCountry
 *
 *	Description: removes a country by its id.
 *
 * There should be an id and its length should be greater than 0.
 *
 **/

exports.removeCountry = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("Cannot remove country with invalid ID", 400))

		const idArr = req.body.ids

		// if idArr length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Country ids cannot be empty.", 400))
		}

		await countryService.deleteCountry(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(error)
	}
}

/**
 *	updateCountry
 *
 *	Description: Updates a country by its id.
 *
 * There should be an id and any one of the countryCode, countryName field to update.
 *
 **/

exports.updateCountry = async (req, res, next) => {
	try {
		const id = req.params.id // Get the country ID from the request parameters.
		let updateDetail = req.body // Get the update details from the request body.

		// Check if the country ID is provided; if not, send a 400 Bad Request response.
		if (!id) return next(errObject("Country Id is required to update country details", 400))

		// if both the country name or country code is not present, throw an error.
		if (!updateDetail.countryRegionName && !updateDetail.countryRegionCode)
			return next(errObject("Country Name & Country Code is required to update country details", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		// Use the countryService to update the country details.
		const isUpdated = await countryService.patchCountry(id, updateDetail)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		// Send a 200 OK response indicating a successful update.
		res.status(200).json({ status: "success", message: `Country updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A country with the same data already exists.", 400))
	}
}
