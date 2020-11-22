//traemos express y mongodb
const express=require("express");
const mongodb=require("mongodb");

//creamos el objeto mongoClient que nos permite conectarnos a un servidor mongodb
const mongoClient=mongodb.MongoClient;

let db;// se crea la varible para cuando nos conectemos ala base de datos

// nos conectamos al mongo db y hacemos una condicional para saber si nos hemos conectado correctamente
mongodb.MongoClient.connect('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true },function(err,client){
    if(err != null){
console.log("no se puede conectar a la base de datos");
return err;
    }else{
        db=client.db('bitform');
        valoresDefault();
    }
});


//creation of database to use in the dropdownmenus 
async function valoresDefault() {
    let valoresConsulta= await db.collection('tipos').find().toArray()
 if (valoresConsulta.length === 0) {

    await db.createCollection('tipos', function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        
    });
    let tiposConsulta={
        Información:["Productos","Promociones","Devoluciones","Envíos"],
        "Incidencia técnica":["Instalación","transporte"],
        Otros:["Consultas general"]
        
        
    }
    await db.collection('tipos').insertOne(tiposConsulta ,function(err, res) {
        if (err) throw err;
        console.log("informaction added!");
    
    });

    
 }
 else{console.log("ready to start")}
}



// una vez conectados se inicia el servidor con express he indicamos que los archivos estan en static public
const app=express();
app.use(express.static('public'));
app.use(express.json());
// hacemos el metodo post para agregar la informacion a la base de datos



app.post('/formulario',function(req,res) {
// se crea el objeto que recibira la inforamcion q el usuario va introdcir en el body
let informacion={
nombre:req.body.nombre,
apellidos:req.body.apellidos,
email:req.body.email,
telefono:req.body.telefono,
fecha:req.body.fecha,
genero:req.body.genero,
tipoConsulta:req.body.tipo,
subtipoConsulta:req.body.subtipo,
mensaje:req.body.mensaje,
condiciones:req.body.condiciones
}




db.collection('formulario-bitgune').find({nombre:informacion.nombre}).toArray(function (err,respuesta) {
   
    console.log(respuesta.length)

   
    if(err!==null){
        console.log(err);
    }

 

else if(respuesta.length!=0){       
    
console.log("mensaje la consulta esta duplicada")
res.send({mensaje:"lo sentimos pero esta consulta ya existe"})

    }
    else{



 
// we add the information to bitgune colecction where information will be add
db.collection('formulario-bitgune').insertOne(informacion, function (err,result) {
    if(err!==null){
        res.send("No se ha realizado la solicitud corecctamente, intente de nuevo y disculpe las molestias")}
        
        
        
        else{
            console.log("recibido")
            res.send({mensaje:"la Solicitud se ha enviado correctamente yes"})
        }
    
});

}
})



});



//hacemos el metodo get para hacer peticiones y ver lo que tengo reflejado en la base datos
app.get('/consultas',function(req,res) {
    db.collection('formulario-bitgune').find({}).project({nombre:1,email:1,tipoConsulta:1,mensaje:1,condiciones:1}).toArray(function (err,respuesta) {
        if(err!==null){
            console.log(err);
        }else{
            console.log(respuesta)
            res.send(respuesta)
        }
        
    })
    
});

app.get('/tipoConsultas',function(req,res) {
    db.collection('tipos').find().toArray(function (err,respuesta) {
        if(err!==null){
            console.log(err);
        }else{
           
           
          delete respuesta[0]["_id"]
        
          res.send(respuesta)
        }
        
    })
    
});




//we add the port
let port=process.env.PORT||3000;
app.listen(port)



