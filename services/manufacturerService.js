"use strict"

const { errObject } = require("../helpers/helper")
const Manufacturer = require("../models/manufacturerModel")

exports.getPagedManufacturer = async (pageNo, docsPerPage) => {
	try {
		const totalDocs = await Manufacturer.countDocuments()
		const manufacturers = await Manufacturer.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		const response = {
			total: totalDocs,
			manufacturers,
		}
		return response
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

exports.deleteManufacturer = async (idArr) => {
	try {
		return await Manufacturer.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		error.statusCode = 400
		error.message = "Invalid Id"
		throw error // Let the error handler handle it
	}
}

exports.patchManufacturer = async (id, updateData) => {
	//check if manufacturer is present in db with given id.
	const isPresent = await Manufacturer.findOne({ _id: id }) // This line also triggers cast to ObjectId fail error when we try to pass id with invalid format compared to mongodbId format -> this error occurs when we perform an operation that involves casting a string into an ObjectId, but the string value is not a valid ObjectId

	// if not present then throw error
	if (!isPresent) throw errObject("Invalid Manufacturer ID.", 400)

	try {
		return await Manufacturer.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		throw error // Let the error handler handle it
	}
}
