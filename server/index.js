const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const upload = require('multer')({ dest: 'uploads/' });
const path = require('path');
require('dotenv').config({path: '.env'});

app.use(cors());
app.post('/upload', upload.array('ava'), (req, res) => {
  console.log('upload', req.files);
  if (req.files && req.files[0] && req.files[0].filename) {
    console.log('send');
    return res.send(process.env.hostUrl+req.files[0].filename);
  } else {
    return res.sendStatus(500);
  }
})

app.use('/', express.static(path.resolve(__dirname, 'uploads')))

http.listen(9999,() => {
  console.log('starting ***', 9999, process.env.hostUrl);
})