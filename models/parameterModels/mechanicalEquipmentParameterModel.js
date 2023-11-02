"use strict"

const mongoose = require("mongoose")
const mechanicalEquipmentParameterSchema = new mongoose.Schema({
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

const MechanicalEquipmentParameter = mongoose.model("MechanicalEquipmentParameter", mechanicalEquipmentParameterSchema)

module.exports = MechanicalEquipmentParameter
