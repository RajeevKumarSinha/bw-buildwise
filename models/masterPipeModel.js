"use strict"

const mongoose = require("mongoose")
const { errObject } = require("../helpers/helper")

const masterPipeSchema = new mongoose.Schema({
	imperialText: {
		type: String,
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

// Middleware function triggered before saving the document
masterPipeSchema.pre("save", async function (next) {
	console.log(this)
	// when both inches & mm value is not present throw an error
	if (!this.odInches && !this.odMm) return next(errObject("Atleast one of odInches or odMm must be specified", 400))

	// Calculate odInches if not provided, based on the odMm value
	if (!this.odInches) this.odInches = +(this.odMm * 0.039701).toFixed(3)

	// Calculate odMm if not provided, based on the odInches value
	if (!this.odMm) this.odMm = +(this.odInches * 25.4).toFixed(2)

	// when both present, check if they are not equal then throw error.
	if (Math.round(this.odMm) !== Math.round(this.odInches * 25.4))
		return next(errObject("odInches & odMm values are not equal", 400))

	// Create a clone of the current document and delete the _id property
	const copyOfthis = structuredClone(this._doc)
	delete copyOfthis._id
	console.log(copyOfthis)

	// Check if there are any documents with the same details as the current one in the database
	const isPresent = await MasterPipe.find(copyOfthis)

	// If there are documents with the same details, throw an error
	if (isPresent.length !== 0) return next(errObject("masterPipe with this detail already exists in db.", 400))

	return next()
})

// middleware triggered before updating via findOneAndUpdate.
masterPipeSchema.pre("findOneAndUpdate", async function (next) {
	//clone current document
	const currentDoc = structuredClone(this._update)

	// check if any document with same detail already exists in db
	const isPresent = await MasterPipe.find(currentDoc)
	console.log(isPresent)
	// if there is any document with same detail, throw error
	if (isPresent.length !== 0) return next(errObject("masterPpipe with this detail already exists in db.", 400))

	return next()
})

const MasterPipe = mongoose.model("MasterPipe", masterPipeSchema)

module.exports = MasterPipe
