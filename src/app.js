const express = require('express')
const path = require('path')
const hbs = require('hbs')

const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')

console.log(publicDirectory);

const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('/about', (req, resp) => {
    resp.render('about', {
        header: "About",
        name: "Srushtee Satardey"
    })
})

app.get('', (req, resp) => {
    resp.render('index', {
        header: 'Weather',
        name: 'Srushtee Satardey'
    })
})

app.get('/weather', (req, resp) => {

   

    const address = req.query.address

    if(!req.query.address){
        return resp.send({
            error: 'Need to give an address'
        })
    }

    geocode.geocode(address,  (err, {latitude, longitude, location} = {}) => {

        if(err){
            return resp.send({error: 'There is an error in loading the address'})
        }
       

        forecast.forecast(latitude,longitude, (error, forecastData) => {
            if(error){
               return resp.send({error})
            }
         
               resp.send({
                   forecast: forecastData,
                   location,
                   address:address
               }) 
        })
    }
    ) 
})

app.get('/products', (req, resp) => {
   
    if(!req.query.search) {
       return resp.send({
            error: 'You must provide a search term'
        })
    }
  
        console.log(req.query.search);
        resp.send({
            products: []
        })
    
  
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        header: "Help",
        name: "Created by Srushtee Satardey"
    })
})

app.get('/help/*', (req, resp) => {
    resp.render('404', {
        header: "Oops",
        name: "Not created by anyone",
        test: "Help article not found"
    })
})

app.get('*', (req, resp) => {
    resp.render('404', {
        header: "Oops again",
        name
        : "Not created by anyone gain",
        test: "Page not found"
    })
})


app.listen(port, () => {console.log(`Listening to port ${port}`);})