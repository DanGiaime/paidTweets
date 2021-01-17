const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('frontend'));
var bodyParser = require('body-parser')
  
// create application/json parser
var jsonParser = bodyParser.json()

const {findRetweeters} = require('./function');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.post('/retweeters', jsonParser, async (req, res) => {
  console.log(req.body);
  let usernames = await findRetweeters(`${req.body.tweetURL}/retweets`);
  if(usernames) {
    res.send(usernames);
  }
  else {
    res.send(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});