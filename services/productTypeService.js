"use strict"

const ProductType = require(`${__dirname}/../models/productTypeModel.js`)

exports.createProductType = async (dataProd) => {
	return await ProductType.create(dataProd)
}

exports.getPagedProductTypes = async (pageNo, docsPerPage) => {
	const totalDocs = await ProductType.countDocuments()

	const productTypesData = await ProductType.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		productTypesData,
	}

	return response
}

exports.patchProductType = async (id, updateData) => {
	// console.log(id, updateData)
	return await ProductType.findByIdAndUpdate({ _id: id }, updateData)
}

exports.deleteProductType = async (idArr) => {
	return await ProductType.deleteMany({ _id: { $in: idArr } })
}
