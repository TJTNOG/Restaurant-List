// app.js
// require packages used in the project
const express = require("express");
// require handlebars in the project
const exphbs = require("express-handlebars");

const restaurantList = require("./restaurant.json").results;

const app = express();
const port = 3000;

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurantList: restaurantList });
});

// Page
app.get("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  const restaurantsList = restaurantList.find(
    (data) => data.id.toString() === restaurantId
  );
  res.render("show", { restaurant: restaurantsList });
});

// Search
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/");
  }

  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();

  const filterRestaurantList = restaurantList.filter(
    (data) =>
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  );

  res.render("index", {
    restaurantList: filterRestaurantList,
    keywords: keywords,
  });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
