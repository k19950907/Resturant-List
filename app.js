const express = require("express")
const app = express()
const port = 3000
const {engine} = require("express-handlebars")
const methodOverride = require('method-override')


const db = require("./models")
const { DataTypes, STRING } = require("sequelize")
const Restaurant = db.Restaurant

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", "./views")
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

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

//page for creating restaurant
app.get("/restaurants/new", (req, res) => {
  res.render("new", {})
})

//creating restaurant
app.post("/restaurants", (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect("/restaurants"))
    .catch((err) => console.log(err))
})

//page for updating a restaurant
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((restaurant) => res.render("update", { restaurant }))
    .catch((err) => res.status(422).json(err))
})

//update restaurant
app.put("/restaurants/:id", (req, res) => {
  const id = req.params.id
  const body = req.body
  console.log(req.body)
  return Restaurant.update({
    name: body.name,
    name_en: body.name_en,
    category: body.category,
    image: body.image,
    location: body.location,
    phone: body.phone,
    google_map: body.google_map,
    rating: body.rating,
    description: body.description
    }, {where: { id }})
    .then(() => res.redirect(`/restaurants/${id}`))
})

//delete restaurant
app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id } })
    .then(() => res.redirect("/restaurants"))
})

//show details
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw:true
  })
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

app.listen(port, () => {
  console.log("server running on express.js")
})