"use strict"

function errorHandler(err, req, res, next) {
	// Handle and serve the error
	const statusCode = err.statusCode != null || 500
	const status = `${statusCode}`.startsWith("4") ? "fail" : "error"
	const message = err.message || "Something went wrong"

	// Send the error response
	res.status(statusCode).json({
		status,
		message,
	})
}

const errObject = (message, statusCode = null) => {
	const err = new Error(message)
	err.statusCode = statusCode
	return err
}

module.exports = { errorHandler, errObject }
