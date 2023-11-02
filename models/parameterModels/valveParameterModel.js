"use strict"

const mongoose = require("mongoose")
const valveParameterSchema = new mongoose.Schema({
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

const ValveParameter = mongoose.model("ValveParameter", valveParameterSchema)

module.exports = ValveParameter
