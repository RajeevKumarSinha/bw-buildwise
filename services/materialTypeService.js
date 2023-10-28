"use strict"

const MaterialType = require("../models/materialTypeModel")

exports.getPagedMaterialTypes = async (pageNo, docsPerPage) => {
	try {
		const totalDocs = await MaterialType.countDocuments()
		const materialTypesData = await MaterialType.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		const response = {
			total: totalDocs,
			materialTypesData,
		}

		return response
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.createMaterialType = async (materialTypeData) => {
	try {
		const materialTypeObj = await MaterialType.create(materialTypeData)
		return materialTypeObj
	} catch (error) {
		error.statusCode = 400
		throw error
	}
}

exports.deleteMaterialType = async (idArr) => {
	try {
		return await MaterialType.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}

exports.patchMaterialType = async (id, updateData) => {
	try {
		// console.log(id, updateData)
		return await MaterialType.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}
