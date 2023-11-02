"use strict"

const { errObject } = require("../helpers/helper")
const Manufacturer = require("../models/manufacturerModel")

exports.getPagedManufacturer = async (pageNo, docsPerPage) => {
	const totalDocs = await Manufacturer.countDocuments()
	const manufacturersData = await Manufacturer.find()
		.populate("countryID")
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		manufacturersData,
	}
	return response
}

exports.createManufacturer = async (manufacturerData) => {
	const manufacturer = await Manufacturer.create(manufacturerData)
	return manufacturer
}

exports.deleteManufacturer = async (idArr) => {
	return await Manufacturer.deleteMany({ _id: { $in: idArr } })
}

exports.patchManufacturer = async (id, updateData) => {
	//check if manufacturer is present in db with given id.
	const isPresent = await Manufacturer.findOne({ _id: id }) // This line also triggers cast to ObjectId fail error when we try to pass id with invalid format compared to mongodbId format -> this error occurs when we perform an operation that involves casting a string into an ObjectId, but the string value is not a valid ObjectId

	// if not present then throw error
	if (!isPresent) throw errObject("Invalid Manufacturer ID.", 400)

	return await Manufacturer.findByIdAndUpdate({ _id: id }, updateData)
}
