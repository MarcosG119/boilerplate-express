let express = require('express');
let app = express();
require('dotenv').config();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: false}));


app.post("/name", function(req, res) {
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
});


app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    var { 
        first: firstName, last: lastName 
    } = req.query;
    res.json({
      name: `${firstName} ${lastName}`
    });
  });


app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });



app.get(
    "/now",
    (req, res, next) => {
      req.time = new Date().toString();
      next();
    },
    (req, res) => {
      res.send({
        time: req.time
      });
    }
  );


let absolutePath = __dirname + "/views/index.html";





app.use(function middleware(req,res,next) {
    let str = req.method + " " + req.path + " - " + req.ip;
    console.log(str);
    next();
  });

app.get("/json", function(req, res) {
    //res.send("Hello Express");

    
    if (process.env.MESSAGE_STYLE === "uppercase"){
        res.json({
            "message":"HELLO JSON"
        });      
    }else{
        res.json({
            "message":"Hello json"
        }); 
    }


  });


  app.use("/public",express.static(__dirname + "/public"))



console.log("Hello World")



 module.exports = app;
