"use strict"

const ConnectionType = require("../models/connectionTypeModel")
const { errObject } = require(`${__dirname}/../helpers/helper`)

exports.getPagedConnectionTypes = async (pageNo, docsPerPage) => {
	try {
		const totalDocs = await ConnectionType.countDocuments()
		const connectionsData = await ConnectionType.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		const response = {
			total: totalDocs,
			connectionsData,
		}

		return response
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.createConnectionType = async (connectionData) => {
	try {
		const connectionObj = await ConnectionType.create(connectionData)
		return connectionObj
	} catch (error) {
		if (error.code !== 11000) throw error

		error.statusCode = 400
		error.message = "A connection with the same name or code already exists."
		throw error
	}
}

exports.deleteConnectionType = async (idArr) => {
	// const isPresent = await ConnectionType.find({ _id: { $in: idArr } })
	try {
		return await ConnectionType.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchConnectionType = async (id, updateData) => {
	// const isPresent = await ConnectionType.find({ _id: id })
	// if (isPresent.length === 0) return new errObject("Invalid connection type Id.", 400)
	try {
		// console.log(id, updateData)
		return await ConnectionType.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		// if passed data is already present inside the connection then throw error. but first check if error code is 11000
		if (error.code !== 11000) throw error

		error.statusCode = 400
		error.message = "A connection with the same name or code already exists."
		throw error
	}
}
