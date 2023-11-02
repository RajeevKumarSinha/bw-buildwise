"use strict"

const PipeFittingType = require(`${__dirname}/../../models/parameterModels/pipeFittingTypeModel.js`)

exports.getPagedPipeFittingTypes = async (pageNo, docsPerPage) => {
	const totalDocs = await PipeFittingType.countDocuments()
	const pipeFittingTypesData = await PipeFittingType.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		pipeFittingTypesData,
	}

	return response
}

exports.createPipeFittingType = async (pipeData) => {
	const PipeFittingTypeObj = await PipeFittingType.create(pipeData)
	return PipeFittingTypeObj
}

exports.deletePipeFittingType = async (idArr) => {
	// const isPresent = await PipeFittingType.find({ _id: { $in: idArr } })
	try {
		return await PipeFittingType.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchPipeFittingType = async (id, updateData) => {
	// console.log(id, updateData)
	return await PipeFittingType.findByIdAndUpdate({ _id: id }, updateData)
}
