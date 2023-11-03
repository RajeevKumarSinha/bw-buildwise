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

const PipeParameter = mongoose.model("PipeParameter", pipeParameterSchema)

module.exports = PipeParameter
