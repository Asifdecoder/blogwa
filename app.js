//requiring express to create a server
const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//setting the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//to use static files
app.use(express.static(path.join(__dirname, "public")));
//body parser for form
app.use(express.urlencoded({ extended: true }));
// creating blogs array

blogs = [
  {
    id: uuid(),
    title: "first blog",
    content: "anything you want my first blog to be",
  },
  {
    id: uuid(),
    title: "Second blog",
    content: "anything you want my first blog to be",
  },
  {
    id: uuid(),
    title: "Third blog",
    content: "anything you want my first blog to be",
  },
];

//creating a root route
app.get("/", (req, res) => {
  res.render('index',{blogs});
});
//First task of displaying all the blogs
app.get("/blogs", (req, res) => {
  // rendering the page for all the blogs
  res.render("index", { blogs });
});
//create form to add a new blog

app.get("/blog/new", (req, res) => {
  res.render("create");
});
app.post("/blogs", (req, res) => {
  let { title, content } = req.body;

  blogs.push({ title, content, id: uuid() });

  res.redirect("/blogs");
});
app.get("/blogs/:blogId", (req, res) => {
  let { blogId } = req.params;

  let result = blogs.find((value) => value.id == blogId);

  res.render("show", { result });
});
app.get("/blogs/:blogId/edit", (req, res) => {
  let { blogId } = req.params;
  let result = blogs.find((value) => value.id == blogId);
  res.render("edit", { result });
});
//using the patch request
app.patch("/blogs/:blogId", (req, res) => {
  let { blogId } = req.params;
  let { title, content } = req.body;
  let result = blogs.find((value) => value.id == blogId);
  result.title = title;
  result.content = content;
  console.log(title,content)

  res.redirect("/blogs");
});
//Deleting items
app.delete("/blogs/:blogId", (req, res) => {
  let { blogId } = req.params;
  let newBlowgArray = blogs.filter((ne) => ne.id != blogId);

  blogs = newBlowgArray;
  res.redirect("/blogs");
});

//starting server on port 8080

app.listen(8080, () => {
  console.log("listening on port 8080");
});
