const express = require("express")
const app = express()
const port = 3000
const {engine} = require("express-handlebars")
const restaurants = require("./public/jsons/restaurant.json").results

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", "./views")

//set up the root
app.get("/", (req, res) => {
  res.redirect("/restaurants")
})

app.use(express.static("public"))

//list all restaurants
app.get("/restaurants", (req, res) => {
  res.render("index", {restaurants})
})

//show details
app.get("/restaurants/:id", (req, res) => {
  res.render("show")
})

app.listen(port, () => {
  console.log("server running on express.js")
})