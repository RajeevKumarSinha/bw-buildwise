"use strict"

const ValveParameter = require(`${__dirname}/../../models/parameterModels/valveParameterModel.js`)

exports.getPagedValveParameters = async (pageNo, docsPerPage) => {
	const totalDocs = await ValveParameter.countDocuments()
	const valveParametersData = await ValveParameter.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		valveParametersData,
	}

	return response
}

exports.createValveParameter = async (pipeData) => {
	const valveParameterObj = await ValveParameter.create(pipeData)
	return valveParameterObj
}

exports.deleteValveParameter = async (idArr) => {
	// const isPresent = await ValveParameter.find({ _id: { $in: idArr } })
	try {
		return await ValveParameter.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchValveParameter = async (id, updateData) => {
	// console.log(id, updateData)
	return await ValveParameter.findByIdAndUpdate({ _id: id }, updateData)
}
