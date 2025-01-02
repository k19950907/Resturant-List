const express = require("express")
const router = express.Router()

const db = require("../models")
const { DataTypes, STRING } = require("sequelize")
const Restaurant = db.Restaurant

const methodOverride = require('method-override')

router.use(methodOverride('_method'))

//list all restaurants 
router.get("/", (req, res) => {
  return Restaurant.findAll({
    raw: true
  })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((err) => res.status(422).json(err))
})

//page for creating restaurant
router.get("/new", (req, res) => {
  res.render("new", {})
})

//creating restaurant
router.post("/", (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err))
})

//page for updating a restaurant
router.get("/:id/edit", (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((restaurant) => res.render("update", { restaurant }))
    .catch((err) => res.status(422).json(err))
})

//update restaurant
router.put("/:id", (req, res) => {
  const id = req.params.id
  console.log(id)
  const body = req.body
  console.log(body)
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
  }, { where: { id } })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => res.status(422).json(err))
})

//delete restaurant
router.delete("/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id } })
    .then(() => res.redirect("/"))
})

//show details
router.get("/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((err) => res.status(422).json(err))
})

module.exports = router