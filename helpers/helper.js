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

module.exports = { errorHandler, errObject }
