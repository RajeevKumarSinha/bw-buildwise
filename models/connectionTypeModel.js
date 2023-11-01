"use strict"

const mongoose = require("mongoose")
const { errObject } = require("../helpers/helper")

const connectionTypeSchema = new mongoose.Schema({
	connectionTypeName: {
		type: String,
		unique: [true, "Same connection name already used"],
		required: true,
	},
	connectionTypeCode: {
		type: String,
		unique: [true, "Same connection code exists"],
		required: true,
		maxLength: 8,
	},
})

connectionTypeSchema.pre("findOneAndUpdate", async function (next) {
	const toUpdate = findOne(this._conditions._id._id)

	// return a error if toUpdate is null
	if (!toUpdate) return next(errObject("Invalid Id", 400))

	next()
})

const ConnectionType = mongoose.model("ConnectionType", connectionTypeSchema)

module.exports = ConnectionType

// fields( connectionTypeName, connectionTypeCode(max. 8 char.))
// both fields will be unique.
