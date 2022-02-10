require("dotenv").config();

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(
    `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.ftety.mongodb.net/carwiDBB?retryWrites=true&w=majority`
  )
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany();
  })
  .then(() => {})
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Recipe.create({
//   title: "kebab",
//   level: "Amateur Chef",
//   ingredients: [
//     "lamb",
//     "onion",
//     "garlic",
//     "cumin",
//     "coriander",
//     "paprika",
//     "sunflower",
//   ],
//   cuiside: "Middle-eastern",
//   dishType: "main_course",
//   image:
//     "https://saborgourmet.com//wp-content/uploads/el-kebab-tipico-de-turquia-istock.jpg",
//   duration: 20,
//   creator: "Iskender Efendi",
// });

Recipe.insertMany(data)
  .then((allRecipes) =>
    allRecipes.forEach((recipe) => console.log(recipe.title))
  )
  .catch((error) => console.log(error));

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: "100" }
).then((recipe) => console.log(`update ${recipe.title}`));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((del) => console.log("Carrot Coke is no longer available"))
  .catch((error) => console.log(error));

 mongoose.connection.close()