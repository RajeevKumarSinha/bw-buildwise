"use strict"

const NormalPipeFittingParameter = require(`${__dirname}/../../models/parameterModels/normalPipeFittingParameterModel.js`)

exports.getPagedNormalPipeFittingParameters = async (pageNo, docsPerPage) => {
	const totalDocs = await NormalPipeFittingParameter.countDocuments()
	const normalPipeFittingParametersData = await NormalPipeFittingParameter.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		normalPipeFittingParametersData,
	}

	return response
}

exports.createNormalPipeFittingParameter = async (pipeData) => {
	const normalPipeFittingParameterObj = await NormalPipeFittingParameter.create(pipeData)
	return normalPipeFittingParameterObj
}

exports.deleteNormalPipeFittingParameter = async (idArr) => {
	// const isPresent = await NormalPipeFittingParameter.find({ _id: { $in: idArr } })
	try {
		return await NormalPipeFittingParameter.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchNormalPipeFittingParameter = async (id, updateData) => {
	// console.log(id, updateData)
	return await NormalPipeFittingParameter.findByIdAndUpdate({ _id: id }, updateData)
}
