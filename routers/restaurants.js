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
    .then((restaurants) => {
      res.render("index", { 
        restaurants, 
        successMessage: req.flash("success"), 
        failMessage: req.flash("fail") })
    })
    .catch((err) => res.status(422).json(err))
})

//page for creating restaurant
router.get("/new", (req, res) => {
  res.render("new", {})
})

//creating restaurant
router.post("/", (req, res) => {
  return Restaurant.create(req.body)
    .then(() => {
      req.flash("success", "Creating new restaurant succeed")
      res.redirect("/")
    })
    .catch((err) => {
      req.flash("fail", "Creating new restaurant failed")
      res.status(422).json(err)
      res.redirect("/")
    })
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
    .then(() => {
      req.flash("success", "Updating restaurant succeed")
      res.redirect(`/restaurants/${id}`)
    })
    .catch((err) => {
      req.flash("fail", "Updating restaurant failed")
      res.status(422).json(err)
      res.redirect(`/restaurants/${id}`)
    })
})

//delete restaurant
router.delete("/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id } })
    .then(() => {
      req.flash("success", "Deleting restaurant succeed")
      res.redirect("/")
    })
    .catch((err) => {
      req.flash("fail", "Deleting restaurant failed")
      res.status(422).json(err)
      res.redirect("/")
    })
})

//show details
router.get("/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((restaurant) => res.render("show", { 
      restaurant, 
      successMessage: req.flash("success"),
      failMessage: req.flash("fail")
    }))
    .catch((err) => res.status(422).json(err))
})

module.exports = router