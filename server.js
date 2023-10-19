// "use strict"

"use strict"

const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const countryRouter = require("./routes/countryRoute") // Updated route path
const { errorHandler } = require(`./helpers/helper.js`)

dotenv.config({ path: `./config.env` })

const DATABASE = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD)

const app = express()
app.use(express.json())

// Connect to the database and start listening
const connectToDbStartListening = async () => {
	try {
		await mongoose.connect(DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log("Db connected successfully")
		app.listen(3030, () => console.log("Listening on port 3030"))
	} catch (error) {
		console.log("Authentication Failed: wrong UserName/Password", error)
	}
}

connectToDbStartListening()

// Use the country router
app.use("/countries", countryRouter)

app.all("*", (req, res, next) => {
	const err = new Error(`can't find ${req.originalUrl} on the server`)
	err.statusCode = 404

	next(err)
})

app.use(errorHandler)
