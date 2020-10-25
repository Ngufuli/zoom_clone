const express = require('express');
const app = express();
const server = require('http').Server(app);

app.get('/', (req, res)=>{
    res.send('HELLO WORLD!');
})

const PORT = process.env.PORT || 4321;
server.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})