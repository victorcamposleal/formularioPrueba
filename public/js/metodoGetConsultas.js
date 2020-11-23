fetch('/consultas')  
            .then(function (res) {
                return res.json();

            })
            .then(function tipoConsultas(data) {

                for (let i = 0; i< data.length; i++) {
                    document.getElementById('consultas').innerHTML += `
                    <ul class="col-12 col-sm-12 col-md-6  col-xl-3 col-lg-3" id="li">
                    <li > <strong>Nombre</strong>: ${data[i].nombre}</li>
                    <li ><strong> Email</strong>: ${data[i].email}</li>
                    <li > <strong>Tipo Consulta</strong>: ${data[i].tipoConsulta}</li>
                    <li> <strong>Mensaje</strong>: ${data[i].mensaje}</li>
                    <li > <strong>Términos</strong>: ${data[i].condiciones}</li>
                    </ul>
                    `;
                    
                }




            })