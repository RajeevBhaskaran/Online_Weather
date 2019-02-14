const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const apiKey='f4c1ef9c4aa14f17b0051607191302'
const request = require('request');

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function(req,res){
    res.render('index', {weather: null, error: null});
   // res.send('Hello world')
})
app.post( '/',function(req,res){
    //console.log(req.body.city);
    let city=req.body.city
    let lastupdated=''
    let url = `http://api.apixu.com/v1/current.json?key=${apiKey}&q=${city}`
    let imgsource=''
    let Localtime=''
     //console.log(url)
    request(url, function (err, response, body){
      if(err)
      {
          //console.log(err)
          res.render('index',{weather:null,error:'Error,Please try again',lastupdated:'',imgUIsource:'',LocalUItime:''});
      }
      else
      {
          //console.log(body)
          let weather=JSON.parse(body)
         
          //console.log(err)
          if(weather.error)
            res.render('index',{weather:'',error:weather.error.message,lastupdated:"",imgUIsource:'',LocalUItime:''});
         else{
            Localtime=`Local Time: ${weather.location.localtime}`
            let weathertext=`Its ${weather.current.temp_c} degrees in ${weather.location.name}, ${weather.location.region} !`
            lastupdated = ` Last Updated : ${weather.current.last_updated}::::TimeZone:${weather.location.tz_id}`
              //console.log(weathertext)
              imgsource=weather.current.condition.icon
            res.render('index',{weather:weathertext,error:null,lastupdated:lastupdated,imgUIsource:imgsource,LocalUItime:Localtime})
         
           // return 
         }
           
      }

    });
   //res.render('index') 
})
app.listen(3000,function(){


    console.log('Weather app listening to port 3000')
})