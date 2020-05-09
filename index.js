// npm init
// npm install express
// npm install mongoose
// npm install nodemon --save-dev
// npm run start-dev

//restapidb
//yyZOfbmpaGrp9UB6
//mongodb+srv://restapidb:yyZOfbmpaGrp9UB6@cluster0-6rw9k.mongodb.net/test?retryWrites=true&w=majority

// TestiData:
// {
// 	"tool_name": "Jyrsijä 6000",
// 	"material":"timantti",
// 	"cutting_speed":120,
// 	"feed_rate":100
// }

//Testi komentoja
// POST     localhost:8080/api/machining-parameter-set          //plus TestiData
// GET      localhost:8080/api/machining-parameter-sets         
// GET      localhost:8080/api/machining-parameter-set/5eb66763034ec015141a9d12     //ID:llä joka löytyy tietokannasta
// DELETE   localhost:8080/api/machining-parameter-set/5eb66763034ec015141a9d13     //ID:llä joka löytyy tietokannasta
// PUT      localhost:8080/api/machining-parameter-set/5eb66f5a034ec015141a9d15     //muutetulla TestiDatalla



const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();
const body_parser = require('body-parser');
const machining_parameter_set_controller = require('./machining-parameter-set_controller');

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({ extended: true })); // material/id

app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
}); // GET /api/materials

app.use("/", express.static("public")); //GET /index.html // --> /public/index.html

app.post(  "/api/machining-parameter-set",     machining_parameter_set_controller.api_post_machining_parameter_set);//CREATE
app.get(   "/api/machining-parameter-sets",    machining_parameter_set_controller.api_get_machining_parameter_sets);// READ //api.domain.com/materials
app.get(   "/api/machining-parameter-set/:id", machining_parameter_set_controller.api_get_machining_parameter_set);// READ ONE//api.domain.com/material
app.put(   "/api/machining-parameter-set/:id", machining_parameter_set_controller.api_put_machining_parameter_set);// UPDATE //app.patch korvaa vain tietyt kentät //app.put korvaa koko tiedon
app.delete("/api/machining-parameter-set/:id", machining_parameter_set_controller.api_delete_machining_parameter_set);// DELETE

//const database_uri = "mongodb+srv://server:6P1nPAsahRSZORPy@cluster0-i0gtd.mongodb.net/materialdb?retryWrites=true&w=majority";
const database_uri = "mongodb+srv://restapidb:yyZOfbmpaGrp9UB6@cluster0-6rw9k.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});