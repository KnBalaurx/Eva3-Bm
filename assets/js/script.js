import { actualizarPersona, eliminarPersona, obtenerPersonas, registrarPersona } from "./promesas.js";

window.addEventListener('load',()=>{
    document.getElementById('btnOsc').addEventListener('click', osc) //al presionar el boton de modo contraste se acciona la funcion "osc"
    document.getElementById('btnFont').addEventListener('click', font) //al presional el boton de cambiar letra se acciona la funcion "font"
    document.getElementById('btnEnviar').addEventListener('click', validar)
    document.getElementById('btnEnviar').addEventListener('click', registrar)
})


function osc(){ //su funcion es cambiar el contraste de la pagina
    let body = document.body
    body.classList.toggle('osc-body') // cambia la clase del body
}

function font(){ //cambia la fuente de la clase fn 
    let text = document.getElementsByClassName('fn')
    for (let index = 0; index < text.length; index++) { // recorre los objetos de la clase fn, para poder cambiar su fuente individualmente
        text[index].classList.toggle('fuente')//cambia de clase los elementos iterados
    }
}

function validar(){//esta funcion es accionada por el boton, en esta se llama a las demas funciones para entregarles los campos pedidos
    vlVacio('nom')
    vlVacio('apellido')
    vlLongitud('rut')
    vlLongitud('fono')
    vlRd('edad')
}

function vlVacio(idCamp){
    let elemento = document.getElementById(idCamp).value //obtiene el valor del elemento
    let aviso = document.getElementById('p'+idCamp)//se obtiene el id del aviso (p mas el id del label)
    if(elemento.trim() == ''){ //elimina los espacios vacios de la cadena y verifica si esta esta vacia
        aviso.classList.remove('noDisp')//remueve la clase existente del aviso ( display:none)
        aviso.classList.add('siDisp')//agrega la clase para q aparezca el avsio (display:block)
    }else{
        aviso.classList.remove('siDisp')//remueve la clase existente del aviso ( display:block)
        aviso.classList.add('noDisp')//remueve la clase del aviso ( display:none)
    }
}

function vlRd(idCamp){// esta funcion valida si el input type = radio, esta seleccionada una opcion
    let elemento= document.getElementsByName(idCamp)
    let aviso = document.getElementById('p'+idCamp)
    let array = []// se crea una array vacia
    for (var index = 0; index < elemento.length; index++) { //se itera el elemento type = radio
        array.push(elemento[index].checked) //comprueba si el elemento esta seleccionado y devuelve true, si no false y los agrega a la array vacia
    }
    if(array[1] == false ||array[0] == false){// si los elemntos de la array estan vacios
        aviso.classList.remove('noDisp') 
        aviso.classList.add('siDisp')//se muestra el mensaje de aviso 
    }if(array[1] == true ||array[0] == true){// si alguno de estos elementos esta selecionado 
        aviso.classList.remove('siDisp')// se remueve el mensaje de aviso
        aviso.classList.add('noDisp')
    }
}

function vlLongitud(idCamp){
    let elemento= document.getElementById(idCamp)
    let valor = elemento.value
    let aviso = document.getElementById('p'+idCamp)

    if(isNaN(valor)){// devuelve true si el valor no es numerico
        aviso.innerText = "Debes ingresar un numero";// se cambia el texto de aviso
        aviso.classList.remove('noDisp')
        aviso.classList.add('siDisp')//se indica que debe ingresar un numero 
    }
    else{
        if(valor.trim().length == 9 || valor.trim().length == 0 ){ //borra los espacios vacios del valor, comprueba su longitud y si estos son igual a 9 o a 0 devuelve true
            console.log("pasa")
            aviso.classList.remove('siDisp')// se remueve el mensaje de aviso
            aviso.classList.add('noDisp')
        }else{// si no se muestra el mensaje indicando que los datos estan erroneos
            aviso.innerText = "Los datos ingresados son erroneos";
            aviso.classList.remove('noDisp')
            aviso.classList.add('siDisp')
        }
    }
}

const registrar = ()=>{
    let nom = document.getElementById('nom').value
    let apellido = document.getElementById('apellido').value
    let rut = document.getElementById('rut').value
    let correo = document.getElementById('correo').value
    let fono = document.getElementById('fono').value
    let registroSc = document.getElementById('RegistroSc').value //recupera el valor de estos elemntos
    let edad = ()=>{ // se hace una funcion flecha para indicar que valor tiene la edad segun el type radio
        let elemento= document.getElementsByName('edad')
        let array = []
        for (var index = 0; index < elemento.length; index++) { //se recorre el input type radio
            array.push(elemento[index].checked) //se compurba si el radio esta marcado (devuelve true), y se agrega a la arrayt vacia
        }
        if(array[0] == true){//si el primer elemento de la array es true, la funcion retorna -18
            return '-18'
        }if(array[1] == true){//si el segundo elemento de la array es true, la funcion retorna +18
            return '+18'
        }
    }
    let info = document.getElementById('info').value

    let objeto = { //se crea el objeto, agregando el valor antes recuperado
        nombre:nom,
        apellido:apellido,
        rut:rut,
        correo:correo,
        telefono:fono,
        registroSocial:registroSc,
        rangoEdad:edad(),
        infoAdicional:info
    }
    registrarPersona(objeto).then(()=>{//se agrega el objeto a la promesa y la envia  a la base de datos
        cargarDatos()//se llama a la funcion cargar datos para cargar el objeto en una tabla de html
    }).catch((error)=>{//esta funcion nos indica si tuvimos un error y que error tuvimos y lo entrega por consola
        console.log(error);
    });
}

const cargarDatos = ()=>{
    obtenerPersonas().then((personas)=>{//se llama a la funcion obtenerpersonas para recuperar un objeto de la BD
        let estructura = "" // se crea a una variable vacia
        personas.forEach((p)=>{// utiliza para ejecutar una función dada una vez por cada elemento en un array, usando una funcion flecha
            estructura += "<tr>"
            estructura += "<td>"+p.nombre+"</td>"
            estructura += "<td>"+p.apellido+"</td>"
            estructura += "<td>"+p.rut+"</td>"
            estructura += "<td>"+p.correo+"</td>"
            estructura += "<td>"+p.telefono+"</td>"
            estructura += "<td>"+p.registroSocial+"</td>"
            estructura += "<td>"+p.rangoEdad+"</td>"
            estructura += "<td>"+p.infoAdicional+"</td>"
            estructura += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>"
            estructura += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"
            estructura += "</tr>";//se crea la estructura deseada agregandola a la variable
        })
        document.getElementById("cuerpoTabla").innerHTML = estructura;// se agrega la esctructura a la tabla de html

        personas.forEach((p)=>{console.log('aaaaaaaaa')
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener("click",()=>{
                document.getElementById("nom").value = p.nombre;
                document.getElementById("apellido").value = p.apellido;
                document.getElementById("rut").value = p.rut;
                document.getElementById("correo").value = p.correo;
                document.getElementById("fono").value = p.telefono;
                document.getElementById("RegistroSc").value = p.registroSocial;
                document.getElementById("edad").value = p.rangoEdad;
                document.getElementById("info").value = p.infoAdicional;
                document.getElementById("btnAct").value = p.id;
                document.getElementById('btnEnviar').style.display = 'none'
                document.getElementById('btnAct').style.display='block'
                document.getElementById('btnAct').addEventListener('click',()=>{
                    document.getElementById('btnEnviar').style.display = 'block'
                    document.getElementById('btnAct').style.display='none'
                })
                 
            });
            let btn = document.getElementById("DEL"+p.id)
            btn.addEventListener('click',()=>{
                console.log('dddddddddd')
                if (confirm("Desea elminar a a:\n"+p.nombre+" "+p.apellido+" "+p.rut)){
                    console.log("Vamos a eliminar")
                    eliminarPersona(p.id).then(()=>{
                        alert ("Eliminaste con exito")
                        cargarDatos();
                    }).catch((e)=>{
                        console.log(e)
                    })
                }else(
                    consoles.log("Cancelaste la eliminacion")
                )
            })
            });
            
        })
}
const actualizar = ()=>{
    //Recupero datos del anterior "registrar"
    let vlnom =document.getElementById("nom").value;
    let vlapellido= document.getElementById("apellido").value;
    let vlrut = document.getElementById("rut").value;
    let vlcorreo= document.getElementById("correo").value;
    let vlfono= document.getElementById("fono").value;
    let vlregistro = document.getElementById("RegistroSc").value;
    let vledad= document.getElementById("edad").value;
    let vlinfo =document.getElementById("info").value;
    //crea un objeto con los datos recuperados
    let objeto = {
        nombre:vlnom,
        apellido:vlapellido,
        rut:vlrut,
        correo:vlcorreo,
        telefono:vlfono,
        registroSocial:vlregistro,
        rangoEdad:vledad,
        infoAdicional:vlinfo
    }
    let id = document.getElementById("btnActualizar").value;

    console.log('vvvvvvvvvvv')
    //cargar hacer el loading...
    document.getElementById("btnAct").disabled = "True";
    actualizarPersona(objeto,id).then(()=>{
        alert("Se actualiza con exito")
        cargarDatos();
    }).catch((e)=>{
        console.log(e)
    }).finally(()=>{
        document.getElementById("btnAct").disabled = "";
    })


}