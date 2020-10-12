const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));   // use you have local files that are linked to your web app this public folder makes sure it works//
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
  const firstname = req.body.fn;
  const lastname = req.body.ln;
  const email = req.body.En;
  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname,

        }
      }
    ]

  };
  const jsonDATA = JSON.stringify(data);
  const url = "https://us2.api.mailchimp.com/3.0/lists/f072df8032";
  const options = {
    method:"POST",
    auth: "TT:40c521a2f589fa202245472201b0e59e-us2"
  }


  const request = https.request(url, options, function(response){


    if (response.statusCode === 200){
res.sendFile(__dirname + "/success.html")

    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));

    })

  })

//this line of code is for the try again button whenever theere is a failure or the server cannot be reached//
  app.post("/failure", function(req, res){
    res.redirect("/")
  })
  request.write(jsonDATA);
  request.end();


});



// '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}'





app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
})




//list id
// f072df8032






// apikeys
// 40c521a2f589fa202245472201b0e59e-us2
