//obtener elementos de HTML
var inputObjeto = document.getElementById('textObjeto');
var botonGuardarObjeto = document.getElementById('guardarObjeto');
var botonReiniciar = document.getElementById('reiniciar');
var H1titulo = document.getElementById('titulo');
var botonOcultarInstructivo = document.getElementById('ocultarInstructivo');
var seccionInstructivo = document.getElementById('instructivo');
var seccionInstrucciones = document.getElementById('instrucciones');

//Sección para definir qué elementos se van a mostrar al cargar la página
window.onload = cargarColeccion();
function cargarColeccion(){
    if(window.localStorage.getItem('objeto') !== null){
        H1titulo.innerText = 'Mi colección de ' + window.localStorage.getItem('objeto');
    }
    if(window.localStorage.getItem('ocultarInstructivo') !== null){
        var borrado = seccionInstrucciones.parentNode.removeChild(seccionInstrucciones);
    }
}

function guardarElemento(){

}

function eliminarElemento(){

}

function editarElemento(){

}
//boton para ocultar instructivo
botonOcultarInstructivo.addEventListener('click',() => {
    const ocultarInstructivo = 1;
    window.localStorage.setItem('ocultarInstructivo', ocultarInstructivo);
    location.reload();
})

//Botón e input que permiten definir de qué es la coleccion (películas, videojuegos, etc.)
botonGuardarObjeto.addEventListener('click',() => {
    const objetoAColeccionar = inputObjeto.value;
    window.localStorage.setItem('objeto', objetoAColeccionar);
    location.reload();
});

//Botón para reiniciar todo el coleccionador y eliminar Localstorage
botonReiniciar.addEventListener('click',() => {
    window.localStorage.clear();
    location.reload();
});