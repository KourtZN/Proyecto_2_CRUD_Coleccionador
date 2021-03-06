//obtener elementos del DOM por ID y crear variables
var inputObjeto = document.getElementById('textObjeto');
var inputElemento = document.getElementById('inputElementoColeccionable');
var botonGuardarObjeto = document.getElementById('guardarObjeto');
var botonAgregarElemento = document.getElementById('guardarEnColeccion');
var botonReiniciar = document.getElementById('reiniciar');
var Header = document.getElementById('titulo');
var botonOcultarInstructivo = document.getElementById('ocultarInstructivo');
var seccionInstructivo = document.getElementById('instructivo');
var seccionInstrucciones = document.getElementById('instrucciones');
var listaDeColeccion = document.getElementById('listaColeccion');
var elementos = []

//Sección para definir qué elementos se van a mostrar al cargar la página (el localstorage define si se muestran algunos elementos)
window.onload = () => {
    const elementosColeccionables = JSON.parse(window.localStorage.getItem('elementos') || "[]");
    elementos = elementosColeccionables;
    elementos.forEach(elemento => {
        agregaralHTML(elemento);
    });
    if(window.localStorage.getItem('objeto') !== null){
        Header.innerText = 'Mi colección de ' + window.localStorage.getItem('objeto');
        const editarObjeto = document.createElement('button')
        editarObjeto.innerHTML = 'Cambiar'
        editarObjeto.addEventListener('click', () => {
            window.localStorage.removeItem('objeto');
            location.reload();
        })
        Header.parentNode.appendChild(editarObjeto)

    }
    if(window.localStorage.getItem('ocultarInstructivo') !== null){
        var borrado = seccionInstrucciones.parentNode.removeChild(seccionInstrucciones);
        const regresarInstructivo = document.createElement('button')
        regresarInstructivo.innerHTML = 'Mostrar instrucciones'
        regresarInstructivo.addEventListener('click', () => {
            window.localStorage.removeItem('ocultarInstructivo');
            location.reload();
        })
        seccionInstructivo.appendChild(regresarInstructivo)
    }
}

// funcion y botón para agregar elementos a la lista
function agregarElemento(nuevoElemento){
        const elementoObjeto = {id:Math.random() ,...nuevoElemento};
        elementos.push(elementoObjeto);
        window.localStorage.setItem('elementos', JSON.stringify(elementos));
        return elementos;
}
botonAgregarElemento.addEventListener('click',() => {
    const valorInputElemento = inputElemento.value;
    console.log('valorInputElemento ',valorInputElemento)
    const nuevoElemento = { name: valorInputElemento};
    agregarElemento(nuevoElemento);
    location.reload();
})

//funcion para eliminar elemento de la lista
function eliminarElemento(idelemento){
    const listafiltrada = elementos.filter((elemento) =>{
        return elemento.id != idelemento
    })
    elementos = listafiltrada
    window.localStorage.setItem('elementos', JSON.stringify(elementos));
    location.reload();
}

//funcion para editar un elemento de la lista
function editarElemento(idelemento){
    console.log(idelemento)
    agregarAlDomParaEdit(idelemento)
}
// Funcion que agrega al DOM el input y botones para editar un elemento de la lista 
function agregarAlDomParaEdit(idelemento){
    const lugarDeLaLista = document.getElementById('li' + idelemento)
    const inputEdit = document.createElement('input')
    inputEdit.setAttribute('placeholder','Nuevo Nombre')
    const botonsave = document.createElement('button')
    botonsave.addEventListener('click',() => {
        eliminarElemento(idelemento)
        agregarElemento({ name: inputEdit.value});
    })
    botonsave.innerHTML = 'Actualizar'
    const botonCancelar = document.createElement('button')
    botonCancelar.addEventListener('click',() => {
        location.reload();
    })
    botonCancelar.innerHTML = 'Cancelar'
    const ul = document.createElement('ul')
    ul.appendChild(inputEdit)
    ul.appendChild(botonsave)
    ul.appendChild(botonCancelar)
    lugarDeLaLista.appendChild(ul)
    lugarDeLaLista.removeChild(document.getElementById(idelemento + 'E'));
} 

//funcion que agrega los elementos de la colección en el DOM
function agregaralHTML(elemento){
    const li = document.createElement('li')
    li.setAttribute('id','li' + elemento.id)
    li.setAttribute('class','lista')
    const botonEdit = document.createElement('button')
    botonEdit.setAttribute('id',elemento.id + 'E')
    botonEdit.addEventListener('click',() => {
        editarElemento(elemento.id)
    })
    const botonElim = document.createElement('button')
    botonElim.addEventListener('click',() => {
        eliminarElemento(elemento.id)
    })
    const p = document.createElement('p')
    p.textContent = elemento.name;
    botonEdit.innerHTML = 'Editar'
    botonElim.innerHTML = 'Eliminar'
    li.appendChild(p)
    li.appendChild(botonElim)
    li.appendChild(botonEdit)
    listaDeColeccion.appendChild(li)
}

//boton para ocultar sección de instructivo
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