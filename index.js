const express = require('express')
const axios =  require('axios')


const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('forms')
})


app.post('/reset/:key/', async (req, res) => {
  var key = req.params.key;
    console.log("reseting")
    console.log(key.toUpperCase())
    axios.get(`https://dizuplus.com/wp-json/lmfwc/v2/licenses/deactivate/${key.toUpperCase()}?consumer_key=ck_f22b0bc8a09e87f0f96ea963691e12daaa9cdda0&consumer_secret=cs_79b6bce91438560c29873f1457599d0d4851f3e2`)
    .then(resp => {
      return res.send(resp.success);
    }).catch(err => {
      console.log(err.response.data)

      if(err.response.data.message.includes("has not been activated yet")){
        return res.status(200).send(true);
      }
      return res.status(500).send();
    })
})

const port = 9001
app.listen(port, '0.0.0.0', function () {
  console.log('Listening on port ' + port)
})
