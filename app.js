// jshint esversion: 6
const express = require ("express")
const https = require("https")
const bodyParser= require("body-parser")
const app = express()
const dotenv = require("dotenv")

dotenv.config();

const apikey = process.env.apikey;

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
    
})

app.post("/",(req,res)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&appid="+apikey+"&units="+req.body.unit+"&lang="+req.body.lang
    https.get(url,(response)=>{
        console.log(response.statusCode)
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            const icon="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
            console.log(weatherData.main.temp)
            
            res.write("<h1>Today's weather : " + weatherData.weather[0].description + "</br>"+" and temprature will be " + weatherData.main.temp + " degrees</h1>")
            res.write("<img src="+icon+">")
            res.send()
        })
    })
})




app.listen(PORT,()=>{console.log("Server is running.")})