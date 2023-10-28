"use strict"

const ProductType = require(`${__dirname}/../models/productTypeModel.js`)

exports.createProductType = async (dataProd) => {
	try {
		return await ProductType.create(dataProd)
	} catch (error) {
		error.statusCode = 400
		throw error
	}
}

exports.getPagedProductTypes = async (pageNo, docsPerPage) => {
	try {
		const totalDocs = await ProductType.countDocuments()

		const productTypes = await ProductType.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		const response = {
			total: totalDocs,
			productTypes,
		}

		return response
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchProductType = async (id, updateData) => {
	try {
		// console.log(id, updateData)
		return await ProductType.findByIdAndUpdate({ _id: id }, updateData)
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}

exports.deleteProductType = async (idArr) => {
	try {
		return await ProductType.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}
