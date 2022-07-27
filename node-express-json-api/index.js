const express = require("express");
const cors = require("cors");
const data = require("./restaurants.json");

const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(4000, () => console.log("Our API running on 4000"));

console.log(data);

// // app.get("hi class", (req, res) => {
// //   res.send(data);
// });

 app.get("/", (req, res) => {
  res.send(data);
});

//get all items from JSON

// add new restaurant
app.post("/add-restaurant", (req, res) => {
    console.log('this is body',req.body)

  const newRestaurant = {
    rating: "3",
    name: "Mateos Chilly Hotdogs",
    address: "Uncles garage",
  }
  
  
data.push(newRestaurant)
const dataJson =JSON.stringify(data)

fs.writeFile('restaurants.json', dataJson, err => console.error(err))
res.send(data)
});

//find and update restaurant
app.patch('/update-restaurant', (req, res) => {

    console.log('req.query', req.query)
    const { name } = req.query
    console.log(name)
    //find item to update req.query
    const itemFound = data.find(eachRestaurant => eachRestaurant.name === name)

    const indexOfItem = data.indexOf(itemFound) //getting index of item found
     data[indexOfItem] = req.body //overwriting the item with req.body

    console.log('itemFound', itemFound)



    const dataJson =JSON.stringify(data) //converting back to JSON
    fs.writeFile('restaurants.json', dataJson, err => console.error(err)) //writing JSON
    res.send(data)
    

})
    


//find and delete a restaurant
app.delete('/', (req, res) => {

})