window.addEventListener('load',()=>{
    document.getElementById('btnOsc').addEventListener('click', osc) //al presionar el btnOsc se acciona la funcion osc

})

function osc(){ //su funcion es cambiar el contraste de la pagina
    let body = document.body
    body.classList.toggle('osc-body')

    let text = document.getElementsByClassName('fn')
    for (let index = 0; index < text.length; index++) {
        text[index].classList.toggle('fuente')
    }
}
