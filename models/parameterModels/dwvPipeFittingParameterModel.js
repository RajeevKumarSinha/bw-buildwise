"use strict"

const mongoose = require("mongoose")
const dwvPipeFittingParameterSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		required: true,
		enum: ["Date", "Number", "Boolean", "Image"],
	},
	mandatoryField: {
		type: String,
		enum: ["Yes", "No"],
	},
	notes: String,
})

const DWVPipeFittingParameter = mongoose.model("DWVPipeFittingParameter", dwvPipeFittingParameterSchema)

module.exports = DWVPipeFittingParameter
