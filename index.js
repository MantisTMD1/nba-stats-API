const PORT = 3030

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { request } = require('express')

//this line calls express function & all its dependencies, stored in app variable
const app = express()

const standings = []

//homepage for the data 
app.get('/', (req, res) => {
    res.json('Welcome to NBA standings API')
})


//pulling html data from nba.com with axios
app.get('/data', (req, res) => {

    axios.get('https://www.nytimes.com/')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('h3', html).each(function () {
                const numbers = $(this).text()
                standings.push({
                    numbers
                })
            })
            res.json(standings)
            console.log(standings)
        }).catch((err) => console.log(err))
})





//testing backend server in console
app.listen(PORT, () => console.log('server runnning on port ${PORT}'))


