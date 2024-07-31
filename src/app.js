const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, '../templates/views')
app.set('views', viewsDirectory);


var hbs = require('hbs');
const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)


app.get("", (req, res) => {
    res.render("index", { title: "Weather App" });
});





const forecast = require("./data1/forecast")

const geocode = require("./data1/geocode")

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { longtitude, latitude } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longtitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: req.query.address,
                longtitude: longtitude,
                latitude: latitude
            })
        })
    })

})









app.get('*', (req, res) => {
    res.send('Page not found 404')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})