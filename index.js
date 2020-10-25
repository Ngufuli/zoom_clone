const express = require('express');
const app = express();
const server = require('http').Server(app);
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const {v4:uuidv4} = require('uuid') 


app.use(expressLayouts);
app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res)=>{
    res.render('index', {roomId: req.params.room})
})

const PORT = process.env.PORT || 4321;
server.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})