const express = require("express")
const app = express()
const port = 3000
const {engine} = require("express-handlebars")

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
  res.redirect("/restaurants")
})

//list all restaurants 
app.get("/restaurants", (req, res) => {
  return Restaurant.findAll({
    raw: true
  })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((err) => res.status(422).json(err))
})

//show details
app.get("/restaurants/:id", (req, res) => {
  const id = Number(req.params.id)
  return Restaurant.findAll({
    raw:true
  })
    .then((restaurants) => restaurants.find((restaurant) => (restaurant.id === id)))
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((err) => res.status(422).json(err))
  
})

//show searched restaurants (only search in name or category)
app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase()
  return Restaurant.findAll({
    raw: true
  })
    .then((restaurants) => restaurants.filter((restaurant) => (restaurant.name.includes(keyword) || restaurant.category.includes(keyword))))
    .then((restaurant) => res.render("index", {restaurants: restaurant, keyword}))
    .catch((err) => res.status(422).json(err))
})

//render by selected categories
//app.post("/restaurants", (req, res) => {
//  const selectedCategories = req.body.categories
//  const sortedRestaurants = restaurants.filter((restaurant) => selectedCategories.includes(restaurant.category))
//  if(sortedRestaurants.length > 0){
//    res.json({restaurants: sortedRestaurants})
//  }else{
//    res.json({restaurants: restaurants})
//  }
//})

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

app.listen(port, () => {
  console.log("server running on express.js")
})