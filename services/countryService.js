"use strict"

const Country = require("../models/countryModel")

exports.getAllCountries = async () => {
	try {
		const countries = await Country.find()
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
		error.message = "Country details cannot be empty" // Let the error handler handle it
		throw error
	}
}

exports.deleteCountry = async (countryId) => {
	try {
		return await Country.deleteOne({ _id: countryId })
	} catch (error) {
		error.statusCode = 400
		error.message = "Invalid Id"
		throw error // Let the error handler handle it
	}
}

exports.patchCountry = async (id, updateData) => {
	try {
		return await Country.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		error.statusCode = 400
		error.message = "Invalid Id"
		throw error // Let the error handler handle it
	}
}
