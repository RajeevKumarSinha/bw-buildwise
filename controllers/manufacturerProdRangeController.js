"use strict"

const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const manufacturerProdRangeService = require(`${__dirname}/../services/manufacturerProdRangeService`)

exports.getManufacturerProdRanges = async (req, res, next) => {
	try {
		const pageNo = parseInt(req.query.pageNo) || 0
		const docsPerPage = parseInt(req.query.docsPerPage) || 10
		const response = await manufacturerProdRangeService.getPagedManufacturerProdRanges(pageNo, docsPerPage)

		res.status(200).json(response)
	} catch (error) {
		// Pass the error to the next middleware for centralized error handling
		next(errObject("Error while fetching manufacturerProdRanges Data."))
	}
}

exports.setManufacturerProdRange = async (req, res, next) => {
	try {
		const manufacturerProdRangeReq = req.body
		// console.log(manufacturerProdRangeReq)
		const createdManufacturerProdRangeObj = await manufacturerProdRangeService.createManufacturerProdRange(
			manufacturerProdRangeReq
		)
		res.status(201).json({
			status: "success",
			message: "New manufacturer product range created successfully.",
			data: createdManufacturerProdRangeObj,
		})
	} catch (error) {
		if (error.code !== 11000) next(error)

		throw errObject("A manufacturer product range with the same data already exists.", 400)
	}
}

/**
 *	removeManufacturerProdRange
 *
 *	Description: removes manufacturerProdRange by their ids.
 *
 * There should be an array of ids and its length should be greater than 0.
 *
 **/

exports.removeManufacturerProdRange = async (req, res, next) => {
	try {
		if (!req.body.ids) return next(errObject("ids not found", 400))

		const idArr = req.body.ids

		// if manufacturerProdRange ids length is 0 throw an error
		if (idArr.length === 0) {
			return next(errObject("Can't delete collection as none is selected.", 400))
		}

		await manufacturerProdRangeService.deleteManufacturerProdRange(idArr)
		res.status(204).json() //204 - No Content: The request was successful, but there is no additional information to send back
	} catch (error) {
		next(errObject("Can't delete manufacturerProdRange arrays", 400))
	}
}

/**
 *	updatemanufacturerProdRange
 *
 *	Description: Updates a manufacturerProdRange by its id.
 *
 * There should be an id and any one of the field to update.
 *
 **/

exports.updateManufacturerProdRange = async (req, res, next) => {
	try {
		const id = req.params.id

		const updateDetail = req.body

		if (!id) return next(errObject("Generic pipe Id is required to update manufacturerProdRange details", 400))

		if (Object.keys(updateDetail).length === 0)
			return next(errObject("manufacturerProdRange type update details Can't be empty.", 400))

		await manufacturerProdRangeService.patchManufacturerProdRange(id, updateDetail)
		res.status(200).json({ status: "success", message: `manufacturerProdRange updated successfully.` })
	} catch (error) {
		if (error.code !== 11000) next(error)

		throw errObject("A manufacturer product range with the same data already exists.", 400)
	}
}
