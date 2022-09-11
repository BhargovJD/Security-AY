const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;
 
const app = express();
 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');

// Connection URL and create database 
const url = 'mongodb://localhost:27017/userDB';
mongoose.connect(url)


// Schema For collection
const userSchema = new mongoose.Schema({
    email:String,
    password:String,
  });


// Collection
const User = mongoose.model("User", userSchema);
 

 
app.get("/", function(req,res){
    res.render("home")
})

app.get("/login", function(req,res){
    res.render("login")
})

app.get("/register", function(req,res){
    res.render("register")
})

// REGISTER
app.post("/register", function(req,res){
    const newUser  = new User({
        email:req.body.username,
        password:req.body.password,
    })

    newUser.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.render("secrets")
        }
    })
})


// LOGIN
app.post("/login", function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username}, function(err,foundUser){
        if(err){
            console.log(err)
        }
        else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets")
                }
            }
        }
    })
})



 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});