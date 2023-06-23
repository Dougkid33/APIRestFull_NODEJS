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



mongoose
    .connect("mongodb+srv://douglasaugustomsilva:Shippuden33@cluster0.y5uebon.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(()=>{
        console.log("Conectado ao Mongo")
        app.listen(3000)
    })//tratamento ou seja then quando deu certo a conexao
    .catch((err) => console.log(err))//aqui quando ha um erro
