"use strict"

const mongoose = require("mongoose")
const { errObject } = require("../helpers/helper")

const masterPipeSchema = new mongoose.Schema({
	imperialText: {
		type: Number,
		required: [true, "Imperial Text must be provided."],
	},
	metricText: {
		type: Number,
		required: [true, "Metric text must be provided."],
	},
	dnSize: {
		type: Number,
		required: true,
	},
	odInches: {
		type: Number,
	},
	odMm: {
		type: Number,
	},
	notes: String,
})

// imperialText (require)
// metricText (require)
// dnSize (require)
// odInches (require)
// odMm (require)

masterPipeSchema.pre("save", function (next) {
	// when both inches & mm value is not present throw an error
	if (!this.odInches && !this.odMm) return next(errObject("Atleast one of odInches or odMm must be specified", 400))

	// when inch value is not present calculate from mm value
	if (!this.odInches) this.odInches = +(this.odMm * 0.039701).toFixed(3)

	// when inch value is not present calculate from mm value
	if (!this.odMm) this.odMm = +(this.odInches * 25.4).toFixed(2)

	// when both present check if they are not equal -> throw error.
	if (Math.round(this.odMm) !== Math.round(this.odInches * 25.4))
		return next(errObject("odInches & odMm values are not equal", 400))

	return next()
})

const MasterPipe = mongoose.model("MasterPipe", masterPipeSchema)

module.exports = MasterPipe
