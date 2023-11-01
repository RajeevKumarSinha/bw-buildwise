"use strict"

const GenericPipe = require("../models/genericPipeModel")
const { errObject } = require(`${__dirname}/../helpers/helper`)

// we get unitType as inches and sizes array with ids for reference.
// 1. change add pipes to save array of ids in sizes.✅
// 2. change get pipes to get the referenced data derived from the ids of sizes from master pipe.

exports.getPagedGenericPipes = async (pageNo, docsPerPage) => {
	const totalDocs = await GenericPipe.countDocuments()
	const genericPipesData = await GenericPipe.find()
		.populate("sizes")
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		genericPipesData,
	}

	return response
}

exports.createGenericPipe = async (pipeData) => {
	const genericPipeObj = await GenericPipe.create(pipeData)
	return genericPipeObj
}

exports.deleteGenericPipe = async (idArr) => {
	// const isPresent = await GenericPipe.find({ _id: { $in: idArr } })
	try {
		return await GenericPipe.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchGenericPipe = async (id, updateData) => {
	// console.log(id, updateData)
	return await GenericPipe.findByIdAndUpdate({ _id: id }, updateData)
}
