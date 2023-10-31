"use strict"

const MaterialType = require("../models/materialTypeModel")

exports.getPagedMaterialTypes = async (pageNo, docsPerPage) => {
	const totalDocs = await MaterialType.countDocuments()
	const materialTypes = await MaterialType.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		materialTypes,
	}

	return response
}

exports.createMaterialType = async (materialTypeData) => {
	const materialTypeObj = await MaterialType.create(materialTypeData)
	return materialTypeObj
}

exports.deleteMaterialType = async (idArr) => {
	return await MaterialType.deleteMany({ _id: { $in: idArr } })
}

exports.patchMaterialType = async (id, updateData) => {
	return await MaterialType.findByIdAndUpdate({ _id: id }, updateData)
}
