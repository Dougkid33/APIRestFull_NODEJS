const router = require('express').Router()
const Person = require('../models/Person')
const cors = require('cors');

router.use(cors());
//crete
router.post('/', async(req,res)=> {
    
    const{name,salary,approved} = req.body

    if(!name){
        res.status(422).json({error:"O nome é obritatório!!!"})
        return
    }
    const person={
        name,
        salary,
        approved
    }
    try {
        await Person.create(person)
        res.status(201).json({message:"Pessoa cadastrada com sucesso!"})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//Read - ler dados buscar todos
router.get('/getpeople', async (req, res)=>{
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error:error})
    }
})
//buscar por id
router.get('/:id', async(req,res)=>{
    //extrair o dado da requisição, pela url = req.params
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id})
        if(!person){
            res.status(422).json({message: "Usuário não foi encontrado!"})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error:error})
    }
})
//UPDATE - atualizar(PUT, PATCH)
router.patch('/:id', async (req,res) =>{
    const id = req.params.id
    const{name,salary,approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }
    try {
        const updatedPerson = await Person.updateOne({_id: id},person)
        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: "Usuário não foi encontrado!S"})
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error:error})
    }
})
//Delete - deletar dados
router.delete('/:id',  async (req,res) =>{
    const id = req.params.id
    const person = await Person.findOne({_id: id})
    if(!person){
        res.status(422).json({message: "Usuário não foi encontrado!"})
        return
    }
    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message: "Usuário deletado com sucesso!"})
    } catch (error) {
        res.status(500).json({error:error})
    }
})



module.exports = router
