"use strict"

const Country = require("../models/countryModel")

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

exports.getPagedCountries = async (pageNo, docsPerPage) => {
	try {
		const totalDocs = await Country.countDocuments()
		const countries = await Country.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		const response = {
			total: totalDocs,
			countries,
		}

		return response
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.createCountry = async (countryData) => {
	try {
		const country = await Country.create(countryData)
		return country
	} catch (error) {
		error.statusCode = 400
		throw error
	}
}

exports.deleteCountry = async (idArr) => {
	try {
		// return await Country.deleteOne({ _id: countryId })
		return await Country.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}

exports.patchCountry = async (id, updateData) => {
	// check if country is present with given id
	const isPresent = await Country.findOne({ _id: id })

	// if country with given id is not present then throw error
	if (!isPresent) throw errObject("Invalid Id", 400)
	try {
		return await Country.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}
