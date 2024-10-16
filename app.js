const express = require("express")
const app = express()
const port = 3000
const {engine} = require("express-handlebars")
const restaurants = require("./public/jsons/restaurant.json").results

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", "./views")
app.use(express.json())

//set up the root
app.get("/", (req, res) => {
  res.redirect("/restaurants")
})

app.use(express.static("public"))

//list all restaurants 
app.get("/restaurants", (req, res) => {
  //get categories
  const categories = [...new Set(restaurants.map((restaurant) => (restaurant.category)))]
  res.render("index", {restaurants, categories})
})

//show searched restaurants (only search in name or category)
app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase()
  const matchedRestaurants = restaurants.filter((restaurant) => (restaurant.name.includes(keyword) || restaurant.category.includes(keyword)))
  res.render("index", {restaurants: matchedRestaurants, keyword})
})

//show details
app.get("/restaurants/:id", (req, res) => {
  const id = Number(req.params.id)
  const restaurant = restaurants.find((restaurant) => (restaurant.id === id))
  res.render("show", {restaurant})
})

app.listen(port, () => {
  console.log("server running on express.js")
})

//render by selected categories
app.post("/restaurants", (req, res) => {
  const selectedCategories = req.body.categories
  const sortedRestaurants = restaurants.filter((restaurant) => selectedCategories.includes(restaurant.category))
  if(sortedRestaurants.length > 0){
    res.json({restaurants: sortedRestaurants})
  }else{
    res.json({restaurants: restaurants})
  }
})