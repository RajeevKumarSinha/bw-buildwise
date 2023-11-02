"use strict"

const PipeParameter = require(`${__dirname}/../../models/parameterModels/pipeParameterModel.js`)

exports.getPagedPipeParameters = async (pageNo, docsPerPage) => {
	const totalDocs = await PipeParameter.countDocuments()
	const pipeParametersData = await PipeParameter.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		pipeParametersData,
	}

	return response
}

exports.createPipeParameter = async (pipeData) => {
	const pipeParameterObj = await PipeParameter.create(pipeData)
	return pipeParameterObj
}

exports.deletePipeParameter = async (idArr) => {
	// const isPresent = await PipeParameter.find({ _id: { $in: idArr } })
	try {
		return await PipeParameter.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchPipeParameter = async (id, updateData) => {
	// console.log(id, updateData)
	return await PipeParameter.findByIdAndUpdate({ _id: id }, updateData)
}
