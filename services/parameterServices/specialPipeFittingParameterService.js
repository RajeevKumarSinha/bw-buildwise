"use strict"

const SpecialPipeFittingParameter = require(`${__dirname}/../../models/parameterModels/specialPipeFittingParameterModel.js`)

exports.getPagedSpecialPipeFittingParameters = async (pageNo, docsPerPage) => {
	const totalDocs = await SpecialPipeFittingParameter.countDocuments()
	const specialPipeFittingParametersData = await SpecialPipeFittingParameter.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		specialPipeFittingParametersData,
	}

	return response
}

exports.createSpecialPipeFittingParameter = async (pipeData) => {
	const specialPipeFittingParameterObj = await SpecialPipeFittingParameter.create(pipeData)
	return specialPipeFittingParameterObj
}

exports.deleteSpecialPipeFittingParameter = async (idArr) => {
	// const isPresent = await specialPipeFittingParameter.find({ _id: { $in: idArr } })
	try {
		return await SpecialPipeFittingParameter.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchSpecialPipeFittingParameter = async (id, updateData) => {
	// console.log(id, updateData)
	return await SpecialPipeFittingParameter.findByIdAndUpdate({ _id: id }, updateData)
}
