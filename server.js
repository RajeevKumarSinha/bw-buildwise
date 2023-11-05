"use strict"

const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const countryRouter = require("./routes/countryRoute") // country route path
const manufacturerRouter = require("./routes/manufacturerRoute") // manufacturer route path
const productTypeRouter = require("./routes/productTypeRoute") // product route path
const materialTypeRouter = require("./routes/materialTypeRoute") // material route path
const masterPipeRouter = require("./routes/masterPipeRoute") // master route path
const connectionTypeRouter = require("./routes/connectionTypeRoute") // connections route path
const genericPipeRouter = require("./routes/genericPipeRoute") // generic route path
const manufacturerProdRangeRouter = require("./routes/manufacturerProdRangeRoute") // manufacturerProdRange route path

// parameters router
const commonProductFieldRouter = require("./routes/parameterRoutes/commonProductFieldRoute") // common product route path
const dwvPipeFittingParameterRouter = require("./routes/parameterRoutes/dwvPipeFittingParameterRoute") // dwvPipe Fitting parameter route path
const mechanicalEquipmentParameterRouter = require("./routes/parameterRoutes/mechanicalEquipmentParameterRoute") //Mechanical equipment parameter route path
const normalPipeFittingParameterRouter = require("./routes/parameterRoutes/normalPipeFittingParameterRoute") // Normal pipe Fitting parameter route path
const pipeFittingTypeRouter = require("./routes/parameterRoutes/pipeFittingTypeRoute") // Pipefitting type route path
const pipeParameterRouter = require("./routes/parameterRoutes/pipeParameterRoute") // PipeParameter route path
const plumbingFixtureParameterRouter = require("./routes/parameterRoutes/plumbingFixtureParameterRoute") // plumbing Fixture parameter
const valveParameterRouter = require("./routes/parameterRoutes/valveParameterRoute") // valve Fixture parameter route path
const specialPipeFittingParametersRouter = require("./routes/parameterRoutes/specialPipeFittingParameterRoute") // special pipe Fitting parameters route path

// Advanced routers
const pipeDataRouter = require("./routes/pipeDataRoute.js") // routes data route path

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
	res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH")
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
app.use("/materialTypes", materialTypeRouter)

// use masterPipe router
app.use("/masterPipes", masterPipeRouter)

// use connections router
app.use("/connectionTypes", connectionTypeRouter)

// use genericPipes router
app.use("/genericPipeSystems", genericPipeRouter)

// use manufacturerProdRange router
app.use("/manufacturerProductRanges", manufacturerProdRangeRouter)

// these are parameter routers
app.use("/dWVPipeFittingParameters", dwvPipeFittingParameterRouter)
app.use("/mechanicalEquipmentParameters", mechanicalEquipmentParameterRouter)
app.use("/normalPipeFittingParameters", normalPipeFittingParameterRouter)
app.use("/pipeParameters", pipeParameterRouter)
app.use("/plumbingFixtureParameters", plumbingFixtureParameterRouter)
app.use("/valveParameters", valveParameterRouter)
app.use("/specialPipeFittingParameters", specialPipeFittingParametersRouter)

// commonProductFields
app.use("/commonProductFields", commonProductFieldRouter)

// pipesData
app.use("/pipeDatas", pipeDataRouter)

// pipefittngTypes
app.use("/pipeFittingTypes", pipeFittingTypeRouter)

app.all("*", (req, res, next) => {
	const err = new Error(`can't find ${req.originalUrl} on the server`)
	err.statusCode = 404

	next(err)
})

app.use(errorHandler)

// Tasks

// mongod kya h, background me kitna chalta h , 2 chala sakte h
// document sahi karna h
// add karna h examples postman me
