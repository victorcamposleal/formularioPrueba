function enviarConsulta() {  
    //coge los datos del form
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("movil").value;
    let fecha = document.getElementById("fecha").value;
    let genero = document.getElementById("genero").value;
    let tipo = document.getElementById("tiposConsultas").value;
    let subtipo = document.getElementById("subtiposConsultas").value;
    let mensaje = document.getElementById("mensaje").value;
    let condiciones = document.getElementById("condiciones").checked;

    let consulta = {
        nombre,
        apellidos,
        email,
        telefono,
        fecha,
        genero,
        tipo,
        subtipo,
        mensaje,
        condiciones
    }
    //validaciones antes de hacer el submit//////////////////////////////////////////////////////////////


    let validarTelefono;
    let validarEmail;
   validarT();
validarE();

function validarE() {
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
{
validarEmail=true;
return (true)
}else{
validarEmail=false;
document.getElementById('invalid-feedback').innerHTML="El email introducido no es correcto!";
return (false)
}
}
//esta validacion es par numeros de telfonos

function validarT() {

if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(telefono)){
validarTelefono=true;
return (true)
}
else{
document.getElementById('invalid-feedbackt').innerHTML="El Telefono introducido no es correcto!";
validarTelefono=false;
return (false)
}
}



// si todo se cumple se manda la informacions
if (nombre.length !== 0 && validarEmail===true &&email.length!=0 && condiciones === true && mensaje.length >= 30) {
console.log("ok")

        fetch('/formulario', {
            method: "POST",
            headers: {
                "content-type": "application/json"

            },
            body: JSON.stringify(consulta)

        })
            .then(function (res) {
                return res.json();

            })
            .then(function (mensaje) {

                window.alert(mensaje.mensaje)

            })
    } else (
        console.log("estos campos son obligatorios")
    )


}

let resultado;

fetch('/tipoConsultas')
    .then(function (res) {
        return res.json();

    })
    .then(function tipoConsultas(data) {
        console.log(data[0])
        resultado = data;
        for (const [key] of Object.entries(data[0])) {
            document.getElementById('tiposConsultas').innerHTML += `<option id="tipoConsulta">${key}</option>`;



        }
       


    })
let consulta;

   // creamos la variable de cosulta para poder desplegar los otros valores de subtipo en el select.
function subTipo() {
    consulta = document.getElementById('tiposConsultas').value
    document.getElementById('subtiposConsultas').innerHTML = ""
    for (let i = 0; i < resultado[0][consulta].length; i++) {
        document.getElementById('subtiposConsultas').innerHTML += `<option id="subtipoConsulta">${resultado[0][consulta][i]}</option>`
    }
}