const express = require("express")
const app = express()
const port = 3000
const {engine} = require("express-handlebars")
const restaurants = require("./public/jsons/restaurant.json").results

const db = require("./models")
const { DataTypes, STRING } = require("sequelize")
const Restaurant = db.Restaurant

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", "./views")
app.use(express.json())
app.use(express.static("public"))

//set up the root
app.get("/", (req, res) => {
  //res.redirect("/restaurants")
  return Restaurant.findAll()
    .then((restaurants) => res.send ({ restaurants }))
    .catch((err) => res.status(422).json(err))
})

//list all restaurants 
app.get("/restaurants", (req, res) => {
  //get categories
  const categories = [...new Set(restaurants.map((restaurant) => (restaurant.category)))]
  res.render("index", {restaurants, categories})
})

//show details
app.get("/restaurants/:id", (req, res) => {
  const id = Number(req.params.id)
  const restaurant = restaurants.find((restaurant) => (restaurant.id === id))
  res.render("show", { restaurant })
})

//show searched restaurants (only search in name or category)
app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase()
  const matchedRestaurants = restaurants.filter((restaurant) => (restaurant.name.includes(keyword) || restaurant.category.includes(keyword)))
  res.render("index", {restaurants: matchedRestaurants, keyword})
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

//page for creating restaurant
app.get("/restaurants/new", (req, res) => {
  res.send("this is the page where you can add new restaurant")
})

//creating restaurant
app.post("/restaurants", (req, res) => {
  res.send("add new restaurant")
})

//page for updating a restaurant
app.get("/restaurants/:id/edit", (req, res) => {
  res.send("this is the page to update restaurant")
})

//update restaurant
app.put("/restaurants/:id", (req, res) => {
  res.send("update restaurant")
})

//delete restaurant
app.delete("/restaurants/:id", (req, res) => {
  res.send("delete restaurant")
})