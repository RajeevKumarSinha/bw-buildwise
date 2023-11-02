"use strict"

const MasterPipe = require("../models/masterPipeModel")

exports.getPagedMasterPipes = async (pageNo, docsPerPage, unit) => {
	let masterPipesData
	const totalDocs = await MasterPipe.countDocuments()
	// for unit = mm
	if (unit === "mm")
		masterPipesData = await MasterPipe.find({}, { _id: 1, metricText: 1 })
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)
	// console.log(masterPipesData)

	// for unit = inches
	if (unit === "inches")
		masterPipesData = await MasterPipe.find({}, { _id: 1, imperialText: 1 })
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

	// when unit is null
	if (unit === null)
		masterPipesData = await MasterPipe.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

	// paging results
	masterPipesData

	const response = {
		total: totalDocs,
		masterPipesData,
	}

	return response
}

exports.createMasterPipe = async (masterPipesData) => {
	const masterPipeObj = await MasterPipe.create(masterPipesData)
	return masterPipeObj
}

exports.deleteMasterPipe = async (idArr) => {
	return await MasterPipe.deleteMany({ _id: { $in: idArr } })
}

exports.patchMasterPipe = async (id, updateData) => {
	return await MasterPipe.findByIdAndUpdate({ _id: id }, updateData)
}
