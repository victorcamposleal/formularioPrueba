fetch('/consultas')
            .then(function (res) {
                return res.json();

            })
            .then(function tipoConsultas(data) {

                for (let i = 0; i< data.length; i++) {
                    document.getElementById('consultas').innerHTML += `
                    <ul class="consultas">
                    <li > nombre: ${data[i].nombre}</li>
                    <li > email: ${data[i].email}</li>
                    <li > email: ${data[i].tipoConsulta}</li>
                    <li> mensaje: ${data[i].mensaje}</li>
                    <li > terminos: ${data[i].condiciones}</li>
                    </ul>
                    `;
                    
                }




            })