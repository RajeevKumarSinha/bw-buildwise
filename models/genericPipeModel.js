"use strict"

const mongoose = require("mongoose")
const genericPipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
		set: (value) => value.toUpperCase(),
	},
	unitType: {
		type: String,
		required: true,
		enum: ["mm", "inches"],
	},
	sizes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "MasterPipe",
		},
	],
})

const GenericPipe = mongoose.model("GenericPipe", genericPipeSchema)

module.exports = GenericPipe
// name (required)
// code (required)
// unitType (required)
// sizes (calculated)
