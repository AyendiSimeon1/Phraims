const express = require('express');

const app = express();

PORT = 3000;

app.get('/', (res, req => {
    res.send('Hello World')
}))

app.listen(PORT, () => {
    console.log("Server is on");
})