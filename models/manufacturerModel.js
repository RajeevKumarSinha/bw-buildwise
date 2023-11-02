"use strict"

const mongoose = require("mongoose")
const Country = require(`${__dirname}/countryModel.js`)
const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const manufacturerSchema = new mongoose.Schema({
	manufacturerName: {
		type: String,
		required: true,
	},
	countryID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Country",
	},
	// countryID: String,
	manufacturerCode: {
		unique: true,
		type: String,
		required: true,
		set: (value) => value.toUpperCase(),
	},
	compositeCode: {
		type: String,
		required: true,
		unique: true,
		set: (value) => value.toUpperCase(),
	},
	unitType: {
		type: String,
		enum: ["mm", "inches"], // only these two values are supported.
	},
	notes: String,
	country: Object,
})

// Before saving the manufacturer, find the corresponding country and get its countryRegionCode
// and save it under country field in the document.
// manufacturerSchema.pre(`findOneAndUpdate`, async function (next) {
// 	// (this._conditions._id._id) gives id of current document which will be updated.0

// 	// if countryCode is not present, proceed to next middleware.
// 	if (!this._update.countryCode) return next()

// 	const manufacturer = await Manufacturer.findOne({ _id: this._conditions._id._id })
// 	if (manufacturer.country.countryRegionCode === this._update.countryRegionCode) return next()

// 	//fetch country with the new countryCode
// 	const country = await Country.findOne({ countryRegionCode: this._update.countryCode })
// 	if (!country) return next(errObject("Provided country code is not available in the country List.", 400))

// 	this._update.countryCode = country.countryRegionCode // Update the countryCode field with the countryRegionCode
// 	this._update.country = country // Update the country with new country.
// 	return next()
// })

// Before saving the manufacturer, find the corresponding country and get its countryRegionCode
// and save it under country field in the document.
// manufacturerSchema.pre(`save`, async function (next) {
// 	// add try catch here and reduce nesting❌
// 	// console.log(this)
// 	const country = await Country.findOne({ countryRegionCode: this.countryCode }) // if written under try throws error in case and we are unable to handle its error.

// 	// console.log(country)
// 	if (!country) return next(errObject(`Country not found`, 404))

// 	try {
// 		this.countryCode = country.countryRegionCode // Update the countryCode field with the countryRegionCode
// 		// this.countryID = country._id
// 		this.country = country
// 		next()
// 	} catch (error) {
// 		next(error)
// 	}
// })

// before sending the query response check if the country code has changed or not using id.
// manufacturerSchema.find()

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema)

module.exports = Manufacturer

/**
 * fields(manufacturerName, countryCodeInput(from countries_list), manufacturerCode, compositeCode, unitType(mm/inches), notes).
 * manufacturer code & manufacturer name should be unique.
 * country code will be linked to countries collection's country code
 * unit type will be either mm or inches
 *
 */

// for creating reference between countrycodes , what we can do is store another ref varible which will store the countries document id
// for that particular countryCodeInput.

// TODO: add a reference variable which will store the _id of the countryCode;
