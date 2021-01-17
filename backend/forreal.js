const express = require('express');
const airKey = 'keygtXKZVXb431hwf';
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;
app.use(express.static('frontend'));
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

const { findRetweeters } = require('./function');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.post('/retweeters', jsonParser, async (req, res) => {
  console.log(req.body);
  let usernames = await findRetweeters(`${req.body.tweetURL}/retweets`);
  if (usernames) {
    res.send(usernames);
  }
  else {
    res.send(404);
  }
});

app.get('/retweetables', async (req, res) => {
  let requestOptions = {
    headers: {
    "Authorization": `Bearer ${airKey}`,
    "Content-Type": "application/json"
    },
    method: "get"
};


  const response = await fetch("https://api.airtable.com/v0/appRnW7Qkk2CsYiKW/t3", requestOptions).then(r => r.json());
  res.json(response);

});


app.post('/retweetables', jsonParser, async (req, res) => {
  console.log(req.body);

  myHeaders = {
    "Authorization": `Bearer ${airKey}`,
    "Content-Type": "application/json"
  };

  var raw = JSON.stringify(
    {
      "records": [
        {
          "fields":
          {
            "tweeturl": req.body.tweeturl,
            "budget": parseFloat(req.body.budget),
            "ppr": parseFloat(req.body.ppr)
          }
        }]
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://api.airtable.com/v0/appRnW7Qkk2CsYiKW/t3", requestOptions).then(r => r.json());
 
  res.json(response);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});