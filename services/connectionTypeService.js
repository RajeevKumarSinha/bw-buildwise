"use strict"

const ConnectionType = require("../models/connectionTypeModel")
const { errObject } = require(`${__dirname}/../helpers/helper`)

exports.getPagedConnectionTypes = async (pageNo, docsPerPage) => {
	const totalDocs = await ConnectionType.countDocuments()
	const connectionsTypes = await ConnectionType.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		connectionsTypes,
	}

	return response
}

exports.createConnectionType = async (connectionData) => {
	const connectionObj = await ConnectionType.create(connectionData)
	return connectionObj
}

exports.deleteConnectionType = async (idArr) => {
	// const isPresent = await ConnectionType.find({ _id: { $in: idArr } })
	return await ConnectionType.deleteMany({ _id: { $in: idArr } })
}

exports.patchConnectionType = async (id, updateData) => {
	// console.log(id, updateData)
	return await ConnectionType.findByIdAndUpdate({ _id: id }, updateData)
}
