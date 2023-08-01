const seleccion = document.getElementById('opciones');
const valor_input = document.getElementById('valor_input');
let titulo_resultado = document.getElementById('titulo_resultado');
let span_medidas = document.querySelector('.texto_conversion');
let guardar = document.querySelector('.favorito');
let array_guardados = [];
let div_medidas_guardadas = document.querySelector('.medidas_guardadas');
let borrar = document.getElementsByClassName('close');
let formulario = document.getElementById('formulario');
let btn_cambio = document.querySelector('.btn_cambio');

function convertir(tipo_medida, medida) {
    let resultado = 0;

    switch (tipo_medida) {
        case "km_miles":
            resultado = medida / 1.609344
            break;
        case "miles_km":
            resultado = medida * 1.609344
            break;
        case "foot_meter":
            resultado = medida * 0.3048
            break;
        case "meter_foot":
            resultado = medida / 0.3048
            break;
        case "cm_inches":
            resultado = medida * 0.39
        case "inches_cm":
            resultado = medida * 2, 54
            break;
    }

    return resultado.toFixed(2);
}

function tipoMedida(tipo_medida) {
    let tipo = "";

    switch (tipo_medida) {
        case "km_miles":
            tipo = "miles"
            break;
        case "miles_km":
            tipo = "km"
            break;
        case "foot_meter":
            tipo = "meter"
            break;
        case "meter_foot":
            tipo = "foot"
            break;
        case "cm_inches":
            tipo = "inches"
            break;
        case "inches_cm":
            tipo = "cm"
            break;
    }

    return tipo;
}

function medidaGuardada(tipo_medida) {
    let medida_guardada = "";

    switch (tipo_medida) {
        case "km_miles":
            medida_guardada = "km"
            break;
        case "miles_km":
            medida_guardada = "miles"
            break;
        case "foot_meter":
            medida_guardada = "foot"
            break;
        case "meter_foot":
            medida_guardada = "meter"
            break;
        case "cm_inches":
            medida_guardada = "cm"
            break;
        case "inches_cm":
            medida_guardada = "inches"
            break;
    }

    return medida_guardada;
}


function mostrarElementosGuardads(){
    const elementos_guardados = JSON.parse(localStorage.getItem('guardados'));

    for (let i = 0; i < elementos_guardados.length; i++) {
        let div_guardado = document.createElement('div');
        let parrafo_guardado = document.createElement('p');
    
        parrafo_guardado.innerHTML = elementos_guardados[i];
        let boton_borrar = document.createElement('button');
    
        boton_borrar.classList.add('close');
        boton_borrar.innerHTML = "<span class='material-symbols-outlined equis'> close </span> ";
    
        div_guardado.appendChild(parrafo_guardado);
        div_guardado.appendChild(boton_borrar);
        div_guardado.classList.add('guardado')
        div_medidas_guardadas.appendChild(div_guardado);

        boton_borrar.addEventListener('click', () => {
            const elemento = elementos_guardados.indexOf(elementos_guardados[i]);

            if(elemento !== -1) {
                elementos_guardados.splice(elemento, 1);
            }

            localStorage.setItem('guardados', JSON.stringify(elementos_guardados));
            location.reload();
        })
    }    
}

function borrarElementosLista(){
    const elementos_guardados = JSON.parse(localStorage.getItem('guardados'));
    elementos_guardados.pop();
}

formulario.addEventListener('keyup', (e) => {
    e.preventDefault();
    titulo_resultado.innerHTML = convertir(seleccion.value, valor_input.value) + " " + tipoMedida(seleccion.value);
})

seleccion.addEventListener('change', () =>{
    titulo_resultado.innerHTML = convertir(seleccion.value, valor_input.value) + " " + tipoMedida(seleccion.value);
    span_medidas.innerHTML = tipoMedida(seleccion.value);
})

/* btn_cambio.addEventListener('click', (e) => {
    e.preventDefault();
    valor_input.value = titulo_resultado.textContent;
})
 */
guardar.addEventListener('click', () => {
    const elementos_guardados = JSON.parse(localStorage.getItem('guardados'));
    array_guardados.push(valor_input.value + ' ' + medidaGuardada(seleccion.value) + ' -> ' + convertir(seleccion.value, valor_input.value) + " " + tipoMedida(seleccion.value));
    elementos_guardados.push(valor_input.value + ' ' + medidaGuardada(seleccion.value) + ' -> ' + convertir(seleccion.value, valor_input.value) + " " + tipoMedida(seleccion.value));

    localStorage.setItem('guardados', JSON.stringify(elementos_guardados));
    valor_input.value= "";
    location.reload();
})

mostrarElementosGuardads();

