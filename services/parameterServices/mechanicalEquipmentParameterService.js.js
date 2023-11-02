"use strict"

const MechanicalEquipmentParameter = require(`${__dirname}/../../models/parameterModels/mechanicalEquipmentParameterModel.js`)

exports.getPagedMechanicalEquipmentParameters = async (pageNo, docsPerPage) => {
	const totalDocs = await MechanicalEquipmentParameter.countDocuments()
	const mechanicalEquipmentParametersData = await MechanicalEquipmentParameter.find()
		.skip(pageNo * docsPerPage)
		.limit(docsPerPage)

	const response = {
		total: totalDocs,
		mechanicalEquipmentParametersData,
	}

	return response
}

exports.createMechanicalEquipmentParameter = async (pipeData) => {
	const mechanicalEquipmentParameterObj = await MechanicalEquipmentParameter.create(pipeData)
	return mechanicalEquipmentParameterObj
}

exports.deleteMechanicalEquipmentParameter = async (idArr) => {
	// const isPresent = await MechanicalEquipmentParameter.find({ _id: { $in: idArr } })
	try {
		return await MechanicalEquipmentParameter.deleteMany({ _id: { $in: idArr } })
	} catch (error) {
		throw error // Let the error handler handle it
	}
}

exports.patchMechanicalEquipmentParameter = async (id, updateData) => {
	// console.log(id, updateData)
	return await MechanicalEquipmentParameter.findByIdAndUpdate({ _id: id }, updateData)
}
