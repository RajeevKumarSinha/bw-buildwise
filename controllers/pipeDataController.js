"use strict"

const { errObject, titleCaseObject } = require(`${__dirname}/../helpers/helper.js`)

const pipeDataService = require(`${__dirname}/../services/pipeDataService.js`)

exports.setPipeData = async (req, res, next) => {
	try {
		let updateDetail = req.body
		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		const addedPipeData = await pipeDataService.createPipeData(updateDetail)
		return res
			.status(201)
			.json({ status: "success", message: "New PipeData added successfully.", data: addedPipeData })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A PipeData with the same data already exists.", 400))
	}
}

exports.getPipeDatas = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10

		const response = await pipeDataService.getPagedPipeDatas(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching PipeDatas"))
	}
}
exports.updatePipeData = async (req, res, next) => {
	try {
		const id = req.params.id
		let updateDetail = req.body

		if (!id) return next(errObject("PipeData Id is required to update PipeData details", 400))

		if (Object.keys(updateDetail).length === 0) return next(errObject("PipeData request body can't be empty.", 400))

		// convert the updateDetail object to titleCase
		updateDetail = titleCaseObject(updateDetail)

		await pipeDataService.patchPipeData(id, updateDetail)
		res.status(200).json({ status: "success", message: `PipeData updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)

		next(errObject("A PipeData with the same data already exists.", 400))
	}
}
exports.removePipeData = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if idArr length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("PipeData ids array cannot be empty", 400))
		}

		const isUpdated = await pipeDataService.deletePipeData(idArr)

		//isUpdated returns two value `null` or `{updated object }` , null is when the id is invalid.
		if (!isUpdated) return next(errObject("Invalid Id", 404))

		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete ids array", 400))
	}
}
