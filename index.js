const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

//app.use(logger); //init middleware

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

//handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json()); //Body parser middleware
app.use(express.urlencoded({ extended: false }));

//homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members: members,
  })
);

app.use(express.static(path.join(__dirname, "public"))); //set static folder
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000; //check the env port first

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
