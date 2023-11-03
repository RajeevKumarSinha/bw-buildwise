"use strict"

const DWVPipeFittingParameter = require(`${__dirname}/../../models/parameterModels/dwvPipeFittingParameterModel.js`)

exports.getdwvPagedPipeFittingParameters = async (pageNo, docsPerPage) => {
	const totalDocs = await DWVPipeFittingParameter.countDocuments()
	const dWVPipeFittingParametersData = await DWVPipeFittingParameter.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		dWVPipeFittingParametersData,
	}

	return response
}

exports.createdwvPipeFittingParameter = async (pipeData) => {
	const PipeFittingParameterObj = await DWVPipeFittingParameter.create(pipeData)
	return PipeFittingParameterObj
}

exports.deletedwvPipeFittingParameter = async (idArr) => {
	// const isPresent = await DWVPipeFittingParameter.find({ _id: { $in: idArr } })
	try {
		return await DWVPipeFittingParameter.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchdwvPipeFittingParameter = async (id, updateData) => {
	// console.log(id, updateData)
	return await DWVPipeFittingParameter.findByIdAndUpdate({ _id: id }, updateData)
}
