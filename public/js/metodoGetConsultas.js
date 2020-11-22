fetch('/consultas')
            .then(function (res) {
                return res.json();

            })
            .then(function tipoConsultas(data) {

                for (let i = 0; i< data.length; i++) {
                    document.getElementById('consultas').innerHTML += `
                    <ul class="consultas">
                    <li > <strong>Nombre</strong>: ${data[i].nombre}</li>
                    <li ><strong> Email</strong>: ${data[i].email}</li>
                    <li > <strong>Tipo Consulta</strong>: ${data[i].tipoConsulta}</li>
                    <li> <strong>Mensaje</strong>: ${data[i].mensaje}</li>
                    <li > <strong>Términos</strong>: ${data[i].condiciones}</li>
                    </ul>
                    `;
                    
                }




            })