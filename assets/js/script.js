window.addEventListener('load',()=>{
    document.getElementById('btnOsc').addEventListener('click', osc) //al presionar el boton de modo contraste se acciona la funcion "osc"
    document.getElementById('btnFont').addEventListener('click', font) //al presional el boton de cambiar letra se acciona la funcion "font"
    document.getElementById('btnEnviar').addEventListener('click', validar)
})


function osc(){ //su funcion es cambiar el contraste de la pagina
    let body = document.body
    body.classList.toggle('osc-body')
    
}

function font(){ //cambia la fuente de la clase fn 
    let text = document.getElementsByClassName('fn')
    for (let index = 0; index < text.length; index++) { // recorre los objetos de la clase fn, para poder cambiar su fuente individualmente
        text[index].classList.toggle('fuente')
    }
}

function validar(){
    vlVacio('nom')
    vlVacio('apellido')
    vlVacio('rut')
    vlVacio('fono')
    vlRd('edad')
    vlLongitud('rut')
    vlLongitud('fono')
}
function vlVacio(idCamp){
    let elemento = document.getElementById(idCamp).value
    let aviso = document.getElementById('p'+idCamp)
    if(elemento.trim() == ''){
        aviso.classList.remove('noDisp')
        aviso.classList.add('siDisp')
    }else{
        aviso.classList.remove('siDisp')
        aviso.classList.add('noDisp')
    }
}
function vlRd(idCamp){
    let elemento= document.getElementsByName(idCamp)
    let aviso = document.getElementById('p'+idCamp)
    let array = []
    for (var index = 0; index < elemento.length; index++) {
        array.push(elemento[index].checked)
    }

    if(array[1] == false ||array[0] == false){
        aviso.classList.remove('noDisp')
        aviso.classList.add('siDisp')
    }if(array[1] == true ||array[0] == true){
        aviso.classList.remove('siDisp')
        aviso.classList.add('noDisp')
    }
}

function vlLongitud(idCamp){
    let elemento= document.getElementById(idCamp)
    let valor = elemento.value
    let aviso = document.getElementById('p'+idCamp)

    if(isNaN(valor)){
        aviso.innerText = "Debes ingresar un numero";
        aviso.classList.remove('noDisp')
        aviso.classList.add('siDisp')
    }
    else{
        if(!valor.trim().length == 9 || !valor.trim().length == 0 ){
            aviso.innerText = "hacen falta datosdatos";
            aviso.classList.remove('noDisp')
            aviso.classList.add('siDisp')

        }else{
            aviso.classList.remove('siDisp')
        aviso.classList.add('noDisp')
       
        }
    }
    
}