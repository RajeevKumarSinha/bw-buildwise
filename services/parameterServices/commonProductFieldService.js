"use strict"

const CommonProductField = require(`${__dirname}/../../models/parameterModels/commonProductFieldModel.js`)

exports.getPagedCommonProductFields = async (pageNo, docsPerPage, dropdown) => {
	let commonProductFieldsData
	const totalDocs = await CommonProductField.countDocuments()
	if (dropdown === "yes") commonProductFieldsData = await CommonProductField.find()

	if (dropdown === null)
		commonProductFieldsData = await CommonProductField.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

	const response = {
		total: totalDocs,
		commonProductFieldsData,
	}

	return response
}

exports.createCommonProductField = async (pipeData) => {
	const commonProductFieldObj = await CommonProductField.create(pipeData)
	return commonProductFieldObj
}

exports.deleteCommonProductField = async (idArr) => {
	// const isPresent = await CommonProductField.find({ _id: { $in: idArr } })
	try {
		return await CommonProductField.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchCommonProductField = async (id, updateData) => {
	// console.log(id, updateData)
	return await CommonProductField.findByIdAndUpdate({ _id: id }, updateData)
}
