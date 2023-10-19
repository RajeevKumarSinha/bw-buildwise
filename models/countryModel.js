"use strict"

const mongoose = require("mongoose")

const countrySchema = new mongoose.Schema({
	countryRegionName: {
		type: String,
		required: [true, "A country name must be provided."],
		unique: true,
	},
	countryRegionCode: {
		type: String,
		unique: true,
		maxlength: 8,
		set: (value) => value.toUpperCase(),
	},
	notes: String,
})

countrySchema.pre(`${"save" || "update"}`, function (next) {
	if (!this.countryRegionCode) this.countryRegionCode = this.countryRegionName.slice(0, 3)
	next()
})

const Country = mongoose.model("Country", countrySchema)

module.exports = Country
