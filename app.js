const express = require("express")
const app = express()
const port = 3000

//set up the root
app.get("/", (req, res) => {
  res.redirect("/restaurants")
})

app.use(express.static("public"))
//list all restaurants
app.get("/restaurants", (req, res) => {
  res.send("restaurant will render here")
})

app.listen(port, () => {
  console.log("server running on express.js")
})