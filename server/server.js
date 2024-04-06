const express = require('express');
const router= require('./router');
const app = express();

PORT = 3000;

app.use('/', router);

app.listen(PORT, () => {
    console.log( "Server is on" );
})