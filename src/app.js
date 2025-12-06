import "dotenv/config";
import express from 'express'
import getData from './get-data.js'


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/data', async (req, res) => {
    const data = await getData()
    let response = []
    for (let i = 0; i < 2; i++){
        response.push(data[i]);
    }
    res.send(response)
})

app.post('/visualize', async (req, res) => {
    const data = await getData()
    const temperature = data[0].temperature
    const humidity = data[0].humidity
    const pressure = data[0].pressure
    const response = {
        temperature,
        humidity,
        pressure
    }
    res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})