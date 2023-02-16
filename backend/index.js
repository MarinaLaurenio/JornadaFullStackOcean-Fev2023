const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

// const DB_URL="mongodb://127.0.0.1:27017";
const DB_URL=
  "mongodb+srv://admin:sRE9UKIsVO4OssL9@cluster0.a6ipb4d.mongodb.net";
const DB_NAME = "ocean-bancodados-09-02-2023";

async function main() {
  //conexão com o banco de dados
  console.log ("Conectando com o banco de dados...");
  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);
  const collection = db.collection("itens");
  console.log ("Banco de dados conectado com sucesso!");

  const app = express();

  //o que vier no body da req, está em Json
  app.use(express.json());

  // Endpoint /oi -> Hello world 
  app.get('/', function (req, res) {
    res.send('Hello, world!');
  });

  // Endpoint /oi -> Olá, mundo
  app.get('/oi', function (red, res) {
    res.send('Olá, mundo!');
  });

  //lista de informacoes
  const itens = ['Rick Sanchez','Morty Smith','Summer Smith'];
  //              0       1       2

  //CRUD->Lista de informacoes

  //Endpoint Read All -> [GET]/item
  app.get('/item', async function (req, res){
    const documentos = await collection.find().toArray();
    res.send(documentos);
  });

  //Endpoint Read Single by ID-> [GET]/item/:id
  app.get('/item/:id', async function (req, res){
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });
    res.send (item);
  });

  //Endpoint Create ->[POST] /item
  app.post('/item', async function (req, res){
    //console.log(req.body);
    const item = req.body;
    await collection.insertOne(item)
    res.send(item);
  });

  //Endpoint Update -> [PUT] /item/:id
  app.put("/item/:id", async function (req, res) {
    const id = req.params.id;
    const body = req.body;

    //console.log (id,body);
    
    await collection.updateOne(
      {_id:new ObjectId(id)},
      {$set: body}
    );    

    res.send(body);
 });

 //Endpoint Delete -> [DELETE]/item:id
 app.delete("/item/:id", async function (req, res) {
    const id= req.params.id;
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.send("Delete by ID: " + id);  
 });

  app.listen(3000);
}

main();