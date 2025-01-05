const express = require("express")
const router = express.Router()

const db = require("../models")
const { DataTypes, STRING } = require("sequelize")
const Restaurant = db.Restaurant

const methodOverride = require('method-override')

router.use(methodOverride('_method'))

//list all restaurants 

router.get("/", (req, res) => {
  try {

    return Restaurant.findAll({
    raw: true

  })
    .then((restaurants) => {

      res.render("index", { 
        restaurants, 
        successMessage: req.flash("success"), 
        failMessage: req.flash("fail") })

    })

    .catch((error) => {

      console.error(error)
      req.flash("fail", "Loading page failed")
      return res.redirect("back")

    })

  } catch(error) {

    console.error(error)
    req.flash("fail", "Loading page failed")
    return res.redirect("back")

  }
})

//page for creating restaurant

router.get("/new", (req, res) => {
  try {

    res.render("new", { failMessage: req.flash("fail") })

  } catch(error) {

    console.error(error)
    req.flash("fail", "Loading page failed")
    return res.redirect("back")

  }
})

//creating restaurant

router.post("/", (req, res) => {
  try {

    return Restaurant.create(req.body)
      .then(() => {

        req.flash("success", "Creating new restaurant succeed")
        res.redirect("/")
      })
      .catch((error) => {

        console.error(error)
        req.flash("fail", "Creating new restaurant failed")
        return res.redirect("back")

      })

  } catch (error) {

    console.log(error)
    req.flash("fail", "Creating new restaurant failed")
    return res.redirect("back")

  }
})

//page for updating a restaurant

router.get("/:id/edit", (req, res) => {
  try {

    const id = req.params.id
    return Restaurant.findByPk(id, {
      raw: true
    })

      .then((restaurant) => {

        res.render("update", { 
          
          restaurant,
          failMessage: req.flash("fail")

         })
      })

      .catch((error) => {

        console.error(error)
        req.flash("fail", "Updating restaurant failed")
        return res.redirect("back")

      })

  } catch (error) {

    console.log(error)
    req.flash("fail", "Updating restaurant failed")
    return res.redirect("back")

  }
  
})

//update restaurant
router.put("/:id", (req, res) => {
  try {

    const id = req.params.id
    const body = req.body
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
      .catch((error) => {
        console.error(error)
        req.flash("fail", "Updating restaurant failed")
        return res.redirect("back")
      })

  } catch (error) {

    console.log(error)
    req.flash("fail", "Updating restaurant failed")
    return res.redirect("back")

  }
  
})

//delete restaurant

router.delete("/:id", (req, res) => {
  try {

    const id = req.params.id
    return Restaurant.destroy({ where: { id } })

      .then(() => {
        req.flash("success", "Deleting restaurant succeed")
        res.redirect("/")

      })

      .catch((error) => {

        console.error(error)
        req.flash("fail", "Deleting restaurant failed")
        return res.redirect("back")

      })
  } catch (error) {

    console.log(error)
    req.flash("fail", "Deleting restaurant failed")
    return res.redirect("back")
  } 
})

//show details
router.get("/:id", (req, res) => {
  try {

    const id = req.params.id
    return Restaurant.findByPk(id, {
      raw: true

    })

      .then((restaurant) => res.render("show", {

        restaurant,
        successMessage: req.flash("success"),

      }))
      .catch((error) => {

        console.error(error)
        req.flash("fail", "Loading page failed")
        return res.redirect("back")

      })

  } catch (error) {

    console.error(error)
    req.flash("fail", "Loading page failed")
    return res.redirect("back")
    
  }
})

module.exports = router