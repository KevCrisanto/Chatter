var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/', function(req, res){
  console.log(req.body);
  
  if(req.body.queryResult.action == "checkVote"){
    var age = req.body.queryResult.parameters.age;
    console.log(age);
    
    var response = "";
    
    if(age.amount >= 18){
      response = "Yes";
    } else {
      response = "No";
    }
    
    res.json({
      "fulfillmentText": response
    })
  } else if(req.body.queryResult.action == "Add"){
    var number1 = parseFloat(req.body.queryResult.parameters.number1);
    var number2 = parseFloat(req.body.queryResult.parameters.number2);
    var sum = number1 + number2;
    var responseText = "The sum of " + number1 + " and " + number2 + " is " + sum;
    
    res.json({
      "fulfillmentText": responseText
    });
  } else if(req.body.queryResult.action == "Subtract"){
    var number1 = parseFloat(req.body.queryResult.parameters.number1);
    var number2 = parseFloat(req.body.queryResult.parameters.number2);
    var difference = number1 - number2;
    var responseText = "The difference between " + number1 + " and " + number2 + " is " + difference;
    
    res.json({
      "fulfillmentText": responseText
    });
  } else if(req.body.queryResult.action == "Multiply"){
    var number1 = parseFloat(req.body.queryResult.parameters.number1);
    var number2 = parseFloat(req.body.queryResult.parameters.number2);
    var product = number1 * number2;
    var responseText = "The product of " + number1 + " and " + number2 + " is " + product;
    
    res.json({
      "fulfillmentText": responseText
    });
  } else if(req.body.queryResult.action == "Divide"){
    var number1 = parseFloat(req.body.queryResult.parameters.number1);
    var number2 = parseFloat(req.body.queryResult.parameters.number2);
    if (number1 != 0){
      var quo = number2 / number1;
      var responseText = number2 + " divided by " + number1 + " is " + quo;
    } else{
      var responseText = "You cannot divide by 0";
    }

    
    res.json({
      "fulfillmentText": responseText
    });
  }
});

app.listen(port, ip);