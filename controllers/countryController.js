"use strict"

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const Country = require(`${__dirname}/../models/countryModel.js`)

const countryService = require(`${__dirname}/../services/countryService`)

exports.getCountries = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10

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

		const totalDocs = await Country.countDocuments()
		const countries = await countryService.getPagedCountries(pageNo, docsPerPage)

		const response = {
			total: totalDocs,
			countries,
		}

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching countries"))
	}
}

exports.setCountries = async (req, res, next) => {
	try {
		const country = req.body
		const createdCountry = await countryService.createCountry(country)
		res.status(201).json({ status: "success", message: "new country is created.", data: createdCountry })
	} catch (error) {
		next(error)
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
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if idArr length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Country ids cannot be empty", 400))
		}

		await countryService.deleteCountry(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete countries inside ids array", 400))
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
		const id = req.params.id
		const updateDetail = req.body

		if (!id) return next(errObject("Country Id is required to update country details", 400))

		if (!updateDetail.countryRegionName && !updateDetail.countryRegionCode)
			return next(errObject("Country Name & Country Code is required to update country details", 400))

		await countryService.patchCountry(id, updateDetail)
		res.status(200).json({ status: "success", message: `country with ${id} updated successfully` })
	} catch (error) {
		next(error)
	}
}
