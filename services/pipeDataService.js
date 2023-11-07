"use strict"

const PipeData = require(`${__dirname}/../models/pipeDataModel.js`)
const { errObject, isValidDate } = require("./../helpers/helper")

// const {pipeParameterSchema} = require(`./../models/parameterModels/pipeParameterModel`)
// const { Schema } = require("mongoose")
const PipeParameter = require(`./../models/parameterModels/pipeParameterModel`)

const validateAndFilterPipeData = async function (dataProd) {
	// Fetch all mandatory pipe parameters
	let mandatoryPipeParameters = await PipeParameter.find({ mandatoryField: "Yes" })
	const params = Object.keys(dataProd.param)
	let itemsPresent = []
	// loop over and check if dataProd.parma are present in pipeParameters and are of valid types.
	mandatoryPipeParameters.forEach((item) => {
		// item.type === "Text" ? (item.type = "String") : item.type

		if (params.includes(item.description)) {
			// push the matched item in itemsPresent
			itemsPresent.push(item.description)

			if (item.type === `Text` && typeof dataProd.param[item.description] !== "string")
				throw errObject(`${item.description} is not a valid ${item.type}`, 400)

			if (item.type === "Date" && !isValidDate(dataProd.param[item.description]))
				throw errObject(`${item.description} is not a valid ${item.type}`, 400)

			if (item.type === "Number" && typeof dataProd.param[item.description] !== "number")
				throw errObject(`${item.description} is not a valid ${item.type}`, 400)

			if (item.type === "Boolean" && typeof dataProd.param[item.description] !== "boolean")
				throw errObject(`${item.description} is not a valid ${item.type}`, 400)

			// for image it is not done yet.
		}
	})

	// delete those properties from reqBody which are not present in pipeParameters
	params.forEach((param) => {
		if (!itemsPresent.includes(param)) delete dataProd.param[param]
	})

	return dataProd
}

exports.createPipeData = async (dataProd) => {
	const pipeDataToCreate = await validateAndFilterPipeData(dataProd)

	// console.log(dataProd, mandatoryPipeParameters)

	// return dataProd
	return await PipeData.create(pipeDataToCreate)
	// console.log(mandatoryPipeParameters)

	// Create a new Mongoose schema to define dynamic fields
	// const pipeParameter = new Schema()

	// Iterate through the mandatory pipe parameters and add dynamic fields to the schema
	// mandatoryPipeParameters.forEach((field) => {
	// 	// Use the `add` method to add a dynamic field to the schema
	// 	pipeParameterSchema.add({ [field.description]: [field.type] })
	// })

	// Create and return new PipeData document with dynamic fields
	//************************************************************************************************* */
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
	if (!updateData.param) return await PipeData.findByIdAndUpdate({ _id: id }, updateData)

	const filteredUpdateData = await validateAndFilterPipeData(updateData)

	return await PipeData.findByIdAndUpdate({ _id: id }, filteredUpdateData)
}

exports.deletePipeData = async (idArr) => {
	return await PipeData.deleteMany({ _id: { $in: idArr } })
}
