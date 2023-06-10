const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;

const options = {
    key: fs.readFileSync("/path/to/private.key"),
    cert: fs.readFileSync("/path/to/ssl_certificate.crt"),
    ca: [
             fs.readFileSync("/path/to/ca_root_file.crt"),
             fs.readFileSync("/path/to/ca_bundle_certificate.crt")
    ]
}
app.use(express.static('app'));

app.get('/questionnaire', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port${port}`);
});
