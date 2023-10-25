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
		const productTypes = await ProductType.find()
			.skip(pageNo * docsPerPage)
			.limit(docsPerPage)

		return productTypes
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

exports.deleteProductType = async (productTypeId) => {
	try {
		return await ProductType.deleteOne({ _id: productTypeId })
	} catch (error) {
		error.statusCode = 400
		throw error // Let the error handler handle it
	}
}
