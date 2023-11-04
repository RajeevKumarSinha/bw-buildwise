"use strict"

/**
 *	errorHandler
 *
 *	Description: Middleware function that handles errors.
 *
 * @param {object} err - error object encountered during middleware execution.
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - function which enables the next middleware execution.
 *
 **/

function errorHandler(err, req, res, next) {
	// Handle and serve the error
	const statusCode = err.statusCode != null ? err.statusCode : 500
	const status = `${statusCode}`.startsWith("4") ? "fail" : "error"
	const message = err.message || "Something went wrong"

	// Send the error response
	res.status(statusCode).json({
		status,
		message,
	})
}

/**
 *	errObject
 *
 *	Description: create a new error object.
 *
 * @param {number} errCode - Error code
 * @param {string} message - Error message
 *
 **/

const errObject = (message, statusCode = null) => {
	const err = new Error(message)
	err.statusCode = statusCode
	return err
}

function titleCase(inputString) {
	let titleCased = ""
	let capitalizeNext = true // Flag to capitalize the next character

	for (let i = 0; i < inputString.length; i++) {
		const char = inputString[i]

		if (char === " ") {
			// If the character is a space, set the flag to capitalize the next character
			capitalizeNext = true
			titleCased += " "
		} else if (capitalizeNext) {
			// If the flag is set, capitalize the current character
			titleCased += char.toUpperCase()
			capitalizeNext = false // Reset the flag
		} else {
			// Otherwise, add the character in lowercase
			titleCased += char.toLowerCase()
		}
	}

	return titleCased
}

const titleCaseObject = (object) => {
	for (const key in object) {
		// continue if code is encountered
		if (/code/i.test(key)) continue

		// if unit is encountered, continue
		if (/unit/i.test(key)) continue

		// if key type is object
		// if (typeof object[key] === "object") continue

		// convert everyString to TitleCase.
		if (typeof object[key] === "string") object[key] = titleCase(object[key])
		// console.log(object[key])
	}
	return object
}

// console.log(titleCase("hanthi , mere saathi"))

module.exports = { errorHandler, errObject, titleCase, titleCaseObject }
