"use strict"

const ManufacturerProdRange = require(`${__dirname}/../models/manufacturerProdRangeModel`)
const { errObject } = require(`${__dirname}/../helpers/helper`)

exports.getPagedManufacturerProdRanges = async (pageNo, docsPerPage) => {
	try {
		const totalDocs = await ManufacturerProdRange.countDocuments()
		const genericPipeData = await ManufacturerProdRange.find()
			.populate("manufacturer")
			.populate("productType")
			.populate("materialType")
			.populate("connectionType")
			.populate("pipeSizesAvailable")
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		const response = {
			total: totalDocs,
			genericPipeData,
		}

		return response
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.createManufacturerProdRange = async (pipeData) => {
	try {
		const manufacturerProdRangeObj = await ManufacturerProdRange.create(pipeData)
		return manufacturerProdRangeObj
	} catch (error) {
		if (error.code !== 11000) throw error

		error.statusCode = 400
		error.message = "A manufacturer product range with the same data already exists."
		throw error
	}
}

exports.deleteManufacturerProdRange = async (idArr) => {
	// const isPresent = await ManufacturerProdRange.find({ _id: { $in: idArr } })
	try {
		return await ManufacturerProdRange.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchManufacturerProdRange = async (id, updateData) => {
	// const isPresent = await ManufacturerProdRange.find({ _id: id })
	// if (isPresent.length === 0) return new errObject("Invalid connection type Id.", 400)
	try {
		// console.log(id, updateData)
		return await ManufacturerProdRange.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		// if passed data is already present inside the connection then throw error. but first check if error code is 11000
		if (error.code !== 11000) throw error

		error.statusCode = 400
		error.message = "A manufacturer product range with the same data already exists."
		throw error
	}
}
