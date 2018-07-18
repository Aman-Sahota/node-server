const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getYear',() =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

//view engine
app.set('view engine','hbs');

//setting up enviroment var for heroku
const port=process.env.PORT || 3000;

//middleware
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log('unable to save log');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs');
// });

//static files
app.use(express.static(__dirname+'/public'));

//http methods
app.get('/',(req,res)=>{
    res.render('home',{
        pageTitle:'Obito Uchiha',
        welcomeText:'I am gonna be hokage one day!!!'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        pageTitle:'Obito Uchiha',
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to connect'
    });
});


app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});