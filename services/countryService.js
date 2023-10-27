"use strict"

const Country = require("../models/countryModel")

exports.getPagedCountries = async (pageNo, docsPerPage) => {
	try {
		const countries = await Country.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		return countries
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
	try {
		// console.log(id, updateData)
		return await Country.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}
