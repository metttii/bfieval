const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('app'));

app.get('/questionnaire', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port${port}`);
});
