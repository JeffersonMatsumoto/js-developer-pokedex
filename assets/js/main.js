const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
// const detailsWindow = document.getElementById('detailsWindow')
const maxRecords = 251 //GEN2
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    //onclick="getDetails(${pokemon.height},${pokemon.weight})"
    // <img class="type-img" src="/assets/icons/${pokemon.type}.svg"></img>
    // style="background-image: url(assets/icons/${pokemon.type}.svg); background-size: 100px; background-repeat: no-repeat;
    // background-position: center"
    return `
        <li onclick="moreInfo(${pokemon.height},${pokemon.weight})" class="pokemon ${pokemon.type}" data-bs-toggle="modal" data-bs-target="#pokemonModal">
            <div style="display: flex; justify-content: space-between">
                <img style="align-self: flex-start; width: 1rem" src="/assets/icons/${pokemon.type}.svg"></img>
                <span class="number badge rounded-pill text-bg-light">#${pokemon.number}</span>
            </div>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type.toUpperCase()}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function moreInfo(height, weight){
    document.getElementsByClassName("modal-body")[0].innerHTML = `Height: ${height}m </br> Weight: ${weight}kg`
}

// function getDetails(height, weight) {

//     let attributes = `<ul> 
//         <li>${height}m</li>
//         <li>${weight}kg</li>
//     </ul>`;
//     detailsWindow.innerHTML = attributes;
//     // return `
//     //     <ul> 
//     //         <li>${height}m</li>
//     //         <li>${weight}kg</li>
//     //     </ul>
//     // `
//     // alert(`${height}m <=> ${weight}kg `)
// }

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})