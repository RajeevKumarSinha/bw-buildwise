"use strict"

const Country = require("../models/countryModel")

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

exports.getPagedCountries = async (pageNo, docsPerPage, dropdown) => {
	let countriesData
	const totalDocs = await Country.countDocuments()

	if (dropdown === "yes") {
		countriesData = await Country.find()
	} else {
		countriesData = await Country.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)
	}

	const response = {
		total: totalDocs,
		countriesData,
	}

	return response
}

exports.createCountry = async (countryData) => {
	const country = await Country.create(countryData)
	return country
}

exports.deleteCountry = async (idArr) => {
	// return await Country.deleteOne({ _id: countryId })
	return await Country.deleteMany({ _id: { $in: idArr } })
}

exports.patchCountry = async (id, updateData) => {
	// check if country is present with given id
	const isPresent = await Country.findOne({ _id: id })

	// if country with given id is not present then throw error
	if (!isPresent) throw errObject("Invalid Id", 400)
	return await Country.findByIdAndUpdate({ _id: id }, updateData)
}
