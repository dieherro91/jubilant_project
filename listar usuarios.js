// constantes a usar en el html 
const URLAPI = 'https://pokeapi.co/api/v2',
CONTENIDO = document.getElementById('contenido'),
CONTENIDONOMBRE = document.getElementById('contenidoNombre');

url = 
const setUrlApi = (cantidadPokemon, inicio) => {
    let url = '';
    if(!isNaN(cantidadPokemon && !isNaN(inicio))){
        url = 'https' + cantidadPokemon + '&offset=' + inicio;
    } else {
        url = 'https '
    }
}

// construccion de los llamados a la api esperando una respuesta de los url
const getPokemons = () => {
    fetch(URLAPI)
    .then(response => response.json())
    .then((datos) => {
        datos.results.forEach(e => {
            let idPokemon =e.
            idPokemon = 
        })
    })
}

const loadRowsHtml =(data, imgPokemon, idPokemon) => {
    let imagen 
    const htmltext

}