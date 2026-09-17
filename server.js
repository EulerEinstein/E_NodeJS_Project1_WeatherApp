const express = require("express");
const { router } = require("./routers");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();


// Tells Express to automatically 
// parse incoming JSON request bodies
app.use(express.json());

/*************************
 EJS Setup Config
 ************************/
// Set EJS as the templating engine
app.set("view engine", "ejs");
// Set views directory
app.set("views", path.join(__dirname, "views"));
// Serve static files
app.use(express.static(path.join(__dirname, "public")));

/*************************
 Mount router at the root path
 ************************/
app.use("/", router);

/*************************
 Start the Express server
 ************************/
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});