"use strict"

const mongoose = require("mongoose")
const plumbingFixtureParameterSchema = new mongoose.Schema({
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

const PlumbingFixtureParameter = mongoose.model("PlumbingFixtureParameter", plumbingFixtureParameterSchema)

module.exports = PlumbingFixtureParameter
