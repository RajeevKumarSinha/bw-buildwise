"use strict"

const mongoose = require("mongoose")
const Country = require("./countryModel.js")
const helper = require(`${__dirname}/../helpers/helper.js`)

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
})

// Before saving the manufacturer, find the corresponding country and get its countryRegionCode
manufacturerSchema.pre("save", async function (next) {
	const country = await Country.findOne({ countryRegionCode: this.countryCode })
	if (country) {
		this.countryCode = country.countryRegionCode // Update the countryCode field with the countryRegionCode
		this.countryID = country._id
		next()
	}

	next(helper.errObject(`Country with countryCode ${this.countryCode} not found`, 404))
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
