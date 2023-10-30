"use strict"

const GenericPipe = require("../models/genericPipeModel")
const { errObject } = require(`${__dirname}/../helpers/helper`)

// we get unitType as inches and sizes array with ids for reference.
// 1. change add pipes to save array of ids in sizes.✅
// 2. change get pipes to get the referenced data derived from the ids of sizes from master pipe.

exports.getPagedGenericPipes = async (pageNo, docsPerPage) => {
	try {
		const totalDocs = await GenericPipe.countDocuments()
		const genericPipeData = await GenericPipe.find()
			.populate("sizes")
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		const response = {
			total: totalDocs,
			genericPipeData,
		}

		return response
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.createGenericPipe = async (pipeData) => {
	try {
		const genericPipeObj = await GenericPipe.create(pipeData)
		return genericPipeObj
	} catch (error) {
		if (error.code !== 11000) throw error

		error.statusCode = 400
		error.message = "A generic pipe with the same data already exists."
		throw error
	}
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
	// const isPresent = await GenericPipe.find({ _id: id })
	// if (isPresent.length === 0) return new errObject("Invalid connection type Id.", 400)
	try {
		// console.log(id, updateData)
		return await GenericPipe.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		// if passed data is already present inside the connection then throw error. but first check if error code is 11000
		if (error.code !== 11000) throw error

		error.statusCode = 400
		error.message = "A genericPipe with the same data already exists."
		throw error
	}
}
