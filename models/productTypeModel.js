"use strict"

const mongoose = require("mongoose")
const { errObject } = require("../helpers/helper")

const productSchema = mongoose.Schema({
	masterCategory: {
		type: String,
		required: true,
	},
	mainCategory: { type: String, required: true },
	subCategory: { type: String, required: true },
	notes: String,
})

// middleware to handle duplicate data.
productSchema.pre("save", async function (next) {
	const reqBody = { ...this._doc }
	delete reqBody._id
	const product = await ProductType.find(reqBody)
	if (product.length === 0) return next()

	return next(errObject("Provided productType already exists", 400))
})

// productSchema.pre("findOneAndUpdate", async function (next) {
// 	try {
// 		// (this._conditions._id._id) gives id of current document which will be updated.
// 		const productType = await ProductType.findOne({ _id: this._conditions._id._id })

// 		// if countryCode is present, proceed to next middleware.
// 		// if (!this._update.countryCode) return next()
// 		console.log(productType, this._update)

// 		// Check if `productType` exists and if the `countryRegionCode` of the existing productType
// 		// is different from the new `countryCode` provided in the update (this._update.countryCode).
// 		// if (productType && productType.country.countryRegionCode !== this._update.countryCode) {
// 		// 	const country = await Country.findOne({ countryRegionCode: this._update.countryCode })
// 		// 	this._update.countryCode = country.countryRegionCode // Update the countryCode field with the countryRegionCode
// 		// 	this._update.country = country // Update the country with new country.
// 		// 	return next()
// 		// }
// 	} catch (error) {
// 		next(errObject(`Country with countryCode ${this._update.countryCode} not found`, 404))
// 	}
// })

const ProductType = mongoose.model("ProductType", productSchema)

module.exports = ProductType
