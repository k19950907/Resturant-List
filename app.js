const express = require("express")
const app = express()
const port = 3000
const {engine} = require("express-handlebars")
const router = require("./routers")

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", "./views")
app.use(router)

app.listen(port, () => {
  console.log("server running on express.js")
})