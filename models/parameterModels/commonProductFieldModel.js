"use strict"

const mongoose = require("mongoose")
const commonProductFieldSchema = new mongoose.Schema({
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
	notes: String,
})

const CommonProductField = mongoose.model("CommonProductField", commonProductFieldSchema)

module.exports = CommonProductField
