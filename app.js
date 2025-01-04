const express = require("express")
const app = express()
const port = 3000
const {engine} = require("express-handlebars")
const router = require("./routers")
const flash = require("connect-flash")
const session = require("express-session")

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
  secret: "ThisIsSecret",
  resave: false,
  saveUninitialized: false
}))

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", "./views")
app.use(router)

app.listen(port, () => {
  console.log("server running on express.js")
})