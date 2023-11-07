"use strict"

const PipeData = require(`${__dirname}/../models/pipeDataModel.js`)

const { Schema } = require("mongoose")
const PipeParameter = require(`./../models/parameterModels/pipeParameterModel`)

exports.createPipeData = async (dataProd) => {
	// Fetch all mandatory pipe parameters
	let mandatoryPipeParameters = await PipeParameter.find({ mandatoryField: "Yes" })
	mandatoryPipeParameters = mandatoryPipeParameters.map((item) => {
		item.type === "Text" ? (item.type = "String") : item.type
		return item
	})
	// console.log(mandatoryPipeParameters)

	// Create a new Mongoose schema to define dynamic fields
	const pipeParameter = new Schema()

	// Iterate through the mandatory pipe parameters and add dynamic fields to the schema
	mandatoryPipeParameters.forEach((field) => {
		// Use the `add` method to add a dynamic field to the schema
		pipeParameter.add({ [field.description]: [field.type] })
	})

	// Create and return new PipeData document with dynamic fields
	return await PipeData.create(dataProd)

	// Create a pipeline to dynamically add fields based on mandatoryPipeParameters
	// const addFieldsPipeline = []

	// mandatoryPipeParameters.forEach((field) => {
	// 	const fieldName = field.description.split(" ").join("_")

	// 	// Check if the field exists in dataProd and is not undefined
	// 	if (dataProd[fieldName] !== undefined) {
	// 		addFieldsPipeline.push({
	// 			$addFields: {
	// 				[fieldName]: dataProd[fieldName],
	// 			},
	// 		})
	// 	}
	// })

	// // Create a pipeline that first adds fields and then creates the document
	// const aggregatePipeline = [
	// 	...addFieldsPipeline,
	// 	{
	// 		$merge: {
	// 			into: "PipeData", // Specify the collection name to insert the document
	// 		},
	// 	},
	// ]

	// // Execute the aggregation pipeline to add fields and create the document
	// await PipeData.aggregate(aggregatePipeline).exec()

	// return dataProd // Return the original dataProd
}

exports.getPagedPipeDatas = async (pageNo, docsPerPage) => {
	const totalDocs = await PipeData.countDocuments()

	const pipeDatasData = await PipeData.find()
		.populate("sizeDisplayText")
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		pipeDatasData,
	}

	return response
}

exports.patchPipeData = async (id, updateData) => {
	// console.log(id, updateData)
	return await PipeData.findByIdAndUpdate({ _id: id }, updateData)
}

exports.deletePipeData = async (idArr) => {
	return await PipeData.deleteMany({ _id: { $in: idArr } })
}
