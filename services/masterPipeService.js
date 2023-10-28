"use strict"

const MasterPipe = require("../models/masterPipeModel")

exports.getPagedMasterPipes = async (pageNo, docsPerPage) => {
	try {
		const totalDocs = await MasterPipe.countDocuments()
		const masterPipesData = await MasterPipe.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		const response = {
			total: totalDocs,
			masterPipesData,
		}

		return response
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.createMasterPipe = async (masterPipeData) => {
	try {
		const masterPipeObj = await MasterPipe.create(masterPipeData)
		return masterPipeObj
	} catch (error) {
		throw error
	}
}

exports.deleteMasterPipe = async (idArr) => {
	try {
		return await MasterPipe.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchMasterPipe = async (id, updateData) => {
	try {
		// console.log(id, updateData)
		return await MasterPipe.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		throw error // Let the error handler handle it
	}
}
