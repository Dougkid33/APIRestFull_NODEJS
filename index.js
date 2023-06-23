// config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//forma de ler o JSON | middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())
//Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person',personRoutes)

//rota incial/endpoint
app.get('/', (req, res) =>{

    res.json({message:'oi Express!'})
})



//entregar uma porta onde vai disponibilizar 



