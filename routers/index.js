const express = require("express")
const router = express.Router()
const restaurants = require("./restaurants")

const db = require("../models")
const { DataTypes, STRING } = require("sequelize")
const Restaurant = db.Restaurant

router.use("/restaurants", restaurants)

//set up the root
router.get("/", (req, res) => {
  res.redirect("/restaurants")
})

//show searched restaurants (only search in name or category)
router.get("/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase()
  return Restaurant.findAll({
    raw: true
  })
    .then((restaurants) => restaurants.filter((restaurant) => (restaurant.name.includes(keyword) || restaurant.category.includes(keyword))))
    .then((restaurant) => res.render("index", { restaurants: restaurant, keyword }))
    .catch((err) => res.status(422).json(err))
})

module.exports = router