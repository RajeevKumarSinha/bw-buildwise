// "use strict"

"use strict"

const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const countryRouter = require("./routes/countryRoute") // country route path
const manufacturerRouter = require("./routes/manufacturerRoute") // manufacturer route path
const productTypeRouter = require("./routes/productTypeRoute") // product route path
const { errorHandler } = require(`./helpers/helper.js`)

const morgan = require("morgan") // for development only

dotenv.config({ path: `./config.env` })

const DATABASE = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD)

const app = express()
app.use(express.json())

// When a web page makes an XMLHttpRequest or fetch API request to a different domain,
// the browser performs a preflight check to determine whether the requested domain allows cross-origin requests.
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*") // Update this with your desired domain
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
	res.header("Access-Control-Allow-Headers", "Content-Type")
	next()
})

////////////////////////////////////////////
app.use(morgan("dev"))
/////////////////////////////////////////////

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

// use manufacturer router
app.use("/manufacturers", manufacturerRouter)

// use product router
app.use("/productTypes", productTypeRouter)

// use materials router
app.use("/materials", materialsRouter)

app.all("*", (req, res, next) => {
	const err = new Error(`can't find ${req.originalUrl} on the server`)
	err.statusCode = 404

	next(err)
})

app.use(errorHandler)
