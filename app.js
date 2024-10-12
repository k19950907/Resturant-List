const express = require("express")
const app = express()
const port = 3000
const {engine} = require("express-handlebars")
let restaurants = require("./public/jsons/restaurant.json").results

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

//show searched restaurants (only search in name or category)
app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase()
  const matchedRestaurants = restaurants.filter((restaurant) => (restaurant.name.includes(keyword) || restaurant.category.includes(keyword)))
  
  res.render("index", {restaurants: matchedRestaurants})
})

//show details
app.get("/restaurants/:id", (req, res) => {
  const id = Number(req.params.id)
  const restaurant = restaurants.find((restaurant) => (restaurant.id === id))
  console.log(restaurant)
  res.render("show", {restaurant})
})

app.listen(port, () => {
  console.log("server running on express.js")
})