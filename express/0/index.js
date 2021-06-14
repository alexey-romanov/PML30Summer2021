const express = require('express')
const bodyParser = require('body-parser');


const app = express()
const port = 8000

let someData = "";

app.use(bodyParser.text());
app.use(express.static('public'))

app.get('/getData', (req, res) => {
    res.status(200).send(someData);
})

app.post('/sendData', (req, res) => {
    someData += req.body;
    res.sendStatus(200);
})


app.listen(port, () => {
    console.log(`Server listening at port: ${port}`)
})