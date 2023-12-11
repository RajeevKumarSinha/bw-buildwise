"use strict"

const MaterialType = require("../models/materialTypeModel")

exports.getPagedMaterialTypes = async (pageNo, docsPerPage, dropdown) => {
	let materialTypesData
	const totalDocs = await MaterialType.countDocuments()

	if (dropdown === "yes") materialTypesData = await MaterialType.find()

	if (dropdown === null)
		materialTypesData = await MaterialType.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

	const response = {
		total: totalDocs,
		materialTypesData,
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
