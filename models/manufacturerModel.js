"use strict"

const mongoose = require("mongoose")
const Country = require(`${__dirname}/countryModel.js`)
const { errObject } = require(`${__dirname}/../helpers/helper.js`)

const manufacturerSchema = new mongoose.Schema({
	manufacturerName: {
		unique: true,
		type: String,
		required: true,
	},
	countryCode: {
		type: String,
		ref: "Country",
	},
	// countryID: String,
	manufacturerCode: {
		unique: true,
		type: String,
		required: true,
	},
	compositeCode: {
		type: String,
		required: true,
	},
	unitType: {
		type: String,
		enum: ["mm", "inches"], // only these two values are supported.
	},
	notes: String,
	country: Object,
})

// Before saving || updating the manufacturer, find the corresponding country and get its countryRegionCode
// and save it under country field in the document.
manufacturerSchema.pre(`findOneAndUpdate`, async function (next) {
	try {
		// (this._conditions._id._id) gives id of current document which will be updated.
		const manufacturer = await Manufacturer.findOne({ _id: this._conditions._id._id })

		// if countryCode is present, proceed to next middleware.
		if (!this._update.countryCode) return next()

		// Check if `manufacturer` exists and if the `countryRegionCode` of the existing manufacturer
		// is different from the new `countryCode` provided in the update (this._update.countryCode).
		if (manufacturer && manufacturer.country.countryRegionCode !== this._update.countryCode) {
			const country = await Country.findOne({ countryRegionCode: this._update.countryCode })
			this._update.countryCode = country.countryRegionCode // Update the countryCode field with the countryRegionCode
			this._update.country = country // Update the country with new country.
			return next()
		}
	} catch (error) {
		next(errObject(`Country with countryCode ${this._update.countryCode} not found`, 404))
	}
})

manufacturerSchema.pre(`save`, async function (next) {
	// console.log(this)
	const country = await Country.findOne({ countryRegionCode: this.countryCode })

	// console.log(country)
	if (country) {
		this.countryCode = country.countryRegionCode // Update the countryCode field with the countryRegionCode
		this.countryID = country._id
		this.country = country
		next()
	}

	next(errObject(`Country with countryCode ${this.countryCode} not found`, 404))
})

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

// mongod kya h, background me kitna chalta h , 2 chala sakte h
// document sahi karna h
// add karna h examples postman me
