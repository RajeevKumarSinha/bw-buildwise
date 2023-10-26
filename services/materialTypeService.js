"use strict"

const MaterialType = require("../models/materialTypeModel")

exports.getPagedMaterialTypes = async (pageNo, docsPerPage) => {
	try {
		const countries = await MaterialType.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		return countries
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

exports.deleteMaterialType = async (materialTypeId) => {
	try {
		return await MaterialType.deleteOne({ _id: materialTypeId })
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
