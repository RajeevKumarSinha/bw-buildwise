"use strict"

const Manufacturer = require("../models/manufacturerModel")

exports.getPagedManufacturer = async (pageNo, docsPerPage) => {
	try {
		const manufacturers = await Manufacturer.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		return manufacturers
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.createManufacturer = async (manufacturerData) => {
	try {
		const manufacturer = await Manufacturer.create(manufacturerData)
		return manufacturer
	} catch (error) {
		// console.log(error)
		throw error
	}
}

exports.deleteManufacturer = async (manufacturerId) => {
	try {
		return await Manufacturer.deleteOne({ _id: manufacturerId })
	} catch (error) {
		error.statusCode = 400
		error.message = "Invalid Id"
		throw error // Let the error handler handle it
	}
}

exports.patchManufacturer = async (id, updateData) => {
	try {
		return await Manufacturer.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}
