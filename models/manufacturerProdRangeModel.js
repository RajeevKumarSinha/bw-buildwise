"use strict"

const mongoose = require("mongoose")

const manufacturerProdRangeSchema = new mongoose.Schema({
	manufacturer: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "Manufacturer",
	},
	country: {
		type: String,
		required: true,
	},
	manufacturerCode: {
		// currently manufacturer will be duplicated.
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "Manufacturer",
	},
	productType: {
		// this will also be duplicated.
		main: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductType",
		},
		sub: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductType",
		},
	},
	rangeName: {
		main: {
			required: true,
			type: String,
		},
		sub: {
			required: true,
			type: String,
		},
	},
	materialType: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "MaterialType",
	},
	connectionType: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "ConnectionType",
	},
	pipeSizesAvailable: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "MasterPipe",
	},
	UnitType: {
		required: true,
		enum: ["mm", "inches"],
	},
})

const ManufacturerProdRangeModel = mongoose.model("ManufacturerProdRangeModel", manufacturerProdRangeSchema)

module.exports = ManufacturerProdRangeModel
