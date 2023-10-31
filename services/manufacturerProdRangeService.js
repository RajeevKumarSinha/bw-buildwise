"use strict"

const ManufacturerProdRange = require(`${__dirname}/../models/manufacturerProdRangeModel`)
const { errObject } = require(`${__dirname}/../helpers/helper`)

exports.getPagedManufacturerProdRanges = async (pageNo, docsPerPage) => {
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
}

exports.createManufacturerProdRange = async (pipeData) => {
	const manufacturerProdRangeObj = await ManufacturerProdRange.create(pipeData)
	return manufacturerProdRangeObj
}

exports.deleteManufacturerProdRange = async (idArr) => {
	return await ManufacturerProdRange.deleteMany({ _id: { $in: idArr } })
}

exports.patchManufacturerProdRange = async (id, updateData) => {
	// console.log(id, updateData)
	return await ManufacturerProdRange.findByIdAndUpdate({ _id: id }, updateData)
}
