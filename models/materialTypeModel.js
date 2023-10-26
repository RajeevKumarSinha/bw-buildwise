"use strict"

const mongoose = require("mongoose")

const materialTypeSchema = new mongoose.Schema({
	materialTypeName: {
		type: String,
		required: [true, "A material name must be provided."],
		unique: true,
	},
	materialTypeCode: {
		type: String,
		unique: true,
		maxlength: 3,
		set: (value) => value.toUpperCase(),
	},
	notes: String,
})

materialTypeSchema.pre("save", function (next) {
	if (!this.materialTypeCode) this.materialTypeCode = this.materialTypeName.slice(0, 3)
	next()
})

const MaterialType = mongoose.model("MaterialType", materialTypeSchema)

module.exports = MaterialType
