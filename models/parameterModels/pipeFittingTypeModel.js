"use strict"

const mongoose = require("mongoose")
const pipeFittingTypeSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		unique: true,
	},
	noOfConnections: {
		type: Number,
		required: true,
		enum: [0, 1, 2, 3],
	},
	mandatoryField: {
		type: String,
		enum: ["Yes", "No"],
	},
	notes: String,
})

const PipeFittingType = mongoose.model("PipeFittingType", pipeFittingTypeSchema)

module.exports = PipeFittingType
