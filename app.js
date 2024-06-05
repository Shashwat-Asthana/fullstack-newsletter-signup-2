// const express = require("express");
// const app = express();
// const request = require("request");
// const bodyParser = require("body-parser");
// const https = require("https");//to get or post the api data
// // const request = require("http");
// //to access the static files or material
// app.use(express.static("public"));//here we have to keep in mind that file will be searched from public as starting point

// app.use(bodyParser.urlencoded({extended:true}));// to get the input entered by the user on website.

// app.listen(3000,function(){ //port = 3000
//     console.log("Server is running");
// });

// app.get("/",function(req,res){
//     res.sendFile(__dirname + "/signup.html");
// });

// app.post("/",function(req,res){
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;
//     // console.log(firstName+" "+lastName+" "+email);//to check the post req
//     //now we are creating javascript object
//     const data ={
//         members: [
//            {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//            } 
//         ]
//     };
//     const jsonData = JSON.stringify(data);
//     const url = "https://us17.api.mailchimp.com/3.0/lists/63657a4560";
//     const options = {
//         method: "POST",
//         auth: "asthanago22@gmail.com:c5f909fc90df9867db3ad5f76ff4fc4b-us17"//auth is a function in node for authentication
//     }
//     const request1 = https.request(url,options,function(response){//here is a conflict as two request can not process together.
//         response.on("data",function(data){
//             console.log(JSON.parse(data));
//         })
//     })
//     request1.write(jsonData);
// });

//api key
//c5f909fc90df9867db3ad5f76ff4fc4b-us17

//list id
//63657a4560


const express = require("express");
const app = express();
const reqPackage = require("request");
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/63657a4560";
  const options = {
    method: "POST",
    auth: "asthanago22@gmail.com:c5f909fc90df9867db3ad5f76ff4fc4b-us17",
  };
  const request = https.request(url, options, function (response) {

    if(response.statusCode === 200){
        // res.send("Successfully Subscribed!");
        res.sendFile(__dirname + "/success.html");
    }else{
        // res.send("There was an error with signing up,please try again!");
        res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end(); // Add this line to properly end the request
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

// Variable Name Conflict: You had a variable name conflict where request was used for both the request package and the HTTPS request. This can cause unexpected behavior and errors. To resolve the conflict, one of the variables should be renamed. In the provided solution, the variable const reqPackage = require("request"); was introduced to avoid the conflict.

// Missing request.end(): After writing the request payload using request.write(jsonData);, it's important to call request.end() to complete the request. This was missing in your code, which could have caused the request to hang and not be sent properly.

app.listen(3000, function () {//now we want to put our code on someones else server:
  //we replace 3000 with process.env.PORT--in above line for dynamically select port provided.-->in heroku-->if we want to run project on both local server and rented server so we can use ||
  console.log("Server is running");
});

