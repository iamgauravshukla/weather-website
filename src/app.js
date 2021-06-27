const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 8000

// Setting up the directories
const staticWeb = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialFiles = path.join(__dirname,'../templates/partials');

//serving static files
app.use(express.static(staticWeb));
//setting up template engine
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialFiles)


app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/weather',(req,res)=>{
    res.render('weather')
});

app.get('/about/*',(req,res)=>{
    res.render('error');
});

app.get('*',(req,res)=>{
    res.render('error');
});




app.listen(port,()=>{
    console.log('Server started at port 8000');
})
