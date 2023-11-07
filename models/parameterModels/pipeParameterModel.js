"use strict"

const mongoose = require("mongoose")

const pipeParameterSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		required: true,
		enum: ["Date", "Number", "Text", "Boolean", "Image"],
	},
	mandatoryField: {
		type: String,
		enum: ["Yes", "No"],
	},
	notes: String,
})

// pipeParameterSchema.post("save", async function (doc) {
// 	console.log(doc)
// 	addDynamicFields()
// })

const PipeParameter = mongoose.model("PipeParameter", pipeParameterSchema)
module.exports = PipeParameter
// addDynamicFields()
// console.log("added")
