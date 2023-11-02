"use strict"

const PlumbingFixtureParameter = require(`${__dirname}/../../models/parameterModels/plumbingFixtureParameterModel.js`)

exports.getPagedPlumbingFixtureParameters = async (pageNo, docsPerPage) => {
	const totalDocs = await PlumbingFixtureParameter.countDocuments()
	const plumbingFixtureParametersData = await PlumbingFixtureParameter.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		plumbingFixtureParametersData,
	}

	return response
}

exports.createPlumbingFixtureParameter = async (pipeData) => {
	const PlumbingFixtureParameterObj = await PlumbingFixtureParameter.create(pipeData)
	return PlumbingFixtureParameterObj
}

exports.deletePlumbingFixtureParameter = async (idArr) => {
	// const isPresent = await PlumbingFixtureParameter.find({ _id: { $in: idArr } })
	try {
		return await PlumbingFixtureParameter.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchPlumbingFixtureParameter = async (id, updateData) => {
	// console.log(id, updateData)
	return await PlumbingFixtureParameter.findByIdAndUpdate({ _id: id }, updateData)
}
