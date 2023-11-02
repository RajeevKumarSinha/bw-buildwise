"use strict"

const mongoose = require("mongoose")

const manufacturerProdRangeSchema = new mongoose.Schema({
	manufacturer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Manufacturer",
	},
	country: {
		type: String,
		required: true,
	},
	productType: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "ProductType",
	},
	rangeName: {
		type: String,
		required: true,
	},
	materialType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "MaterialType",
		required: true,
	},
	connectionType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ConnectionType",
		required: true,
	},
	pipeSizesAvailable: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "MasterPipe",
		required: true,
	},
	unitType: {
		type: String,
		enum: ["mm", "inches"],
		required: true,
	},
	notes: String,
})

const ManufacturerProdRange = mongoose.model("ManufacturerProdRange", manufacturerProdRangeSchema)

module.exports = ManufacturerProdRange
