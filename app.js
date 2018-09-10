var express= require('express')
var parser= require('body-parser');
var fs= require('fs');

var app= express();

app.get('/', function(req,res){

    fs.readFile('./mobile.json',function(err,resmob){
        if(err) throw err;
        res.write('<script>console.log('+resmob+')</script>');
        res.end()
    });
    
})


app.get('/search', function(req,res){

    fs.readFile('./mobile.json',function(err,resmob){
        if(err) throw err;
        
        let sampleArray= [];
        let resmobjson= JSON.parse(resmob);
        
        for (let i=0; i<resmobjson.length;i++){
            if (resmobjson[i].mobPrice>=10000 && resmobjson[i].mobPrice<=50000){
                sampleArray.push(resmobjson[i])
            }
        }
        res.write('<script>console.log('+JSON.stringify(sampleArray)+')</script>')
        res.end();
    });
   
})

app.set('views','./views')
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


//add update in url to update the mobile information
app.get('/update', function(req,res){

    res.sendFile('index.html',{root:'views'});
    
    
})
app.post('/updatemobile',function(req,res){
    res.write('<h1>Updated the information Plz check the console for previous and updated information</h1>')
   
    fs.readFile('./mobile.json',function(err,resmob){
        if(err) throw err;
        res.write('<script>console.log('+resmob+')</script>');
        let resmobjson= JSON.parse(resmob);
        for (let i=0; i<resmobjson.length;i++){
            if (resmobjson[i].mobId==req.body.id){
                resmobjson[i].mobName=req.body.name
            }
        }
        res.write('<script>console.log('+JSON.stringify(resmobjson)+')</script>');
        fs.writeFile('updated.json',JSON.stringify(resmobjson))
        res.end();
    });
    
})
//enter addmobile in url to add a new mobile
app.get('/addmobile', function(req,res){

    res.sendFile('index2.html',{root:'views'});
    
    
})
app.post('/addmobile',function(req,res){
    res.write('<h1>Added the mobile Plz check the console for previous and updated information</h2>')
   
    fs.readFile('./mobile.json',function(err,resmob){
        if(err) throw err;
        res.write('<script>console.log('+resmob+')</script>');
        let resmobjson= JSON.parse(resmob);
        let newmobile={
            mobId:req.body.id,
            mobName:req.body.name,
            mobPrice:req.body.price
        }
        resmobjson.push(newmobile)
        res.write('<script>console.log('+JSON.stringify(resmobjson)+')</script>');
        res.end();
    });
    
})






app.listen(1238,()=>{
    console.log("Server has started")
})