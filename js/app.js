//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max - 11;

//Generar objeto con datos de búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Funciones
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    llenarSelectAnios();
});

//Event listeners para los select de búsqueda
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtratAuto();
});
year.addEventListener('change', (e) => {
    datosBusqueda.year = Number(e.target.value);
    filtratAuto();
});
minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;
    filtratAuto();
});
maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtratAuto();
});
puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = Number(e.target.value);
    filtratAuto();
});
transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtratAuto();
});
color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtratAuto();
});

function mostrarAutos(autos) {
    limpiarHTML();

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} - Transmision: ${transmision} - Precio ${precio} - Color: ${color}
        `;
        //Se inserta el HTML generado por cada carro
        resultado.appendChild(autoHTML);
    });
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelectAnios() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

function filtratAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado)
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}