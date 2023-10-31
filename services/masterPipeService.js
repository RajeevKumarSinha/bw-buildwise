"use strict"

const MasterPipe = require("../models/masterPipeModel")

exports.getPagedMasterPipes = async (pageNo, docsPerPage) => {
	const totalDocs = await MasterPipe.countDocuments()
	const masterPipesData = await MasterPipe.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		masterPipesData,
	}

	return response
}

exports.createMasterPipe = async (masterPipeData) => {
	const masterPipeObj = await MasterPipe.create(masterPipeData)
	return masterPipeObj
}

exports.deleteMasterPipe = async (idArr) => {
	return await MasterPipe.deleteMany({ _id: { $in: idArr } })
}

exports.patchMasterPipe = async (id, updateData) => {
	return await MasterPipe.findByIdAndUpdate({ _id: id }, updateData)
}
