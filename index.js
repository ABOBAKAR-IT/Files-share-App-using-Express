const express = require('express');
const multer = require('multer');
const os = require('os');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), async(req, res) => {

const interfaces = os.networkInterfaces();
const addresses = [];
  for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log(addresses[0]);
  res.send(`<div><h1 style="display:block">File uploaded and saved.</h1><button style="display: block;
  background-color: lightgray;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 1px auto;
  padding: 10px;
  margin-top: 10px;
  width: 50%;
  font-size: 16px;
  text-decoration: none;
  color: gray;
  transition: color 0.3s ease;" onclick="window.location.href = 'http://${addresses[0]}:3000'">Go to URL</button> </div>`);
});

app.get('/files', (req, res) => {
  const fs = require('fs');
  const path = './uploads/';
  fs.readdir(path, (err, files) => {
    res.json(files);
  });
});

app.get('/download', (req, res) => {
  const file = `./uploads/${req.query.filename}`;
  res.download(file);
});









app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
