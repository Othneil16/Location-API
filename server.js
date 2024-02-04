const express = require('express')
const config =  require('./dbConfig/dbConfig')
const locationRout = require('./routers/locationRout.js');

const cors = require('cors')

const port = process.env.port || 2003
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api",locationRout)
app.use('/', (req, res)=>{
    res.send('Testing APPLICATION ')
})

app.listen(port,()=>{
    console.log(`Server is listening on port:${port}`)
})


