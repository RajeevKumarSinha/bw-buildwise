"use strict"

const { PipeData } = require(`${__dirname}/../models/pipeDataModel.js`)

exports.createPipeData = async (dataProd) => {
	return await PipeData.create(dataProd)
}

exports.getPagedPipeDatas = async (pageNo, docsPerPage) => {
	const totalDocs = await PipeData.countDocuments()

	const pipeDatasData = await PipeData.find()
		.populate("sizeDisplayText")
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		pipeDatasData,
	}

	return response
}

exports.patchPipeData = async (id, updateData) => {
	// console.log(id, updateData)
	return await PipeData.findByIdAndUpdate({ _id: id }, updateData)
}

exports.deletePipeData = async (idArr) => {
	return await PipeData.deleteMany({ _id: { $in: idArr } })
}
