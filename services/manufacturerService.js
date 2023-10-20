"use strict"

const Manufacturer = require("../models/manufacturerModel")

exports.getAllManufacturer = async () => {
	try {
		const manufacturers = await Manufacturer.find({})
		return manufacturers
	} catch (error) {
		console.log(error)
		throw error
	}
}

exports.createManufacturer = async (manufacturerData) => {
	try {
		const manufacturer = await Manufacturer.create(manufacturerData)
		return manufacturer
	} catch (error) {
		console.log(error)
		error.statusCode = 400
		error.message = "Manufacturer details cannot be empty"
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
		error.message = "Invalid Id"
		throw error // Let the error handler handle it
	}
}
