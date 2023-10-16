"use strict";

const express = require("express");

const app = express();
app.use(express.json());

app.listen(3030, () => console.log("Listening on port 3030"));
