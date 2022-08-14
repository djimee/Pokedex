// set our document query selectors so we can manipulate the DOM 
const button = document.querySelector("#search");
const resultsContainer = document.querySelector("#resultsContainer");
const imageContainer = document.querySelector("#imageContainer");

// set required event listeners - this is so the function `getPokemon` runs after clicking the search button
button.addEventListener("click", getPokemon);

// URL for the api endpoint 
// https://pokeapi.co/docs/v2#pokemon-section
// https://pokeapi.co/api/v2/{id or name}/
const url = "https://pokeapi.co/api/v2/pokemon/";

// grab the pokemon using an API call which uses the pokemon name in the search bar 
function getPokemon(e) {
    // grab the pokemon that is being searched from the input, and append that to the end of the API URL
    const pokemonToSearch = document.querySelector("#pokemonName").value;

    // e.g https://pokeapi.co/api/v2/pokemon/pikachu if we were searching up pikachu (type this in your browser search bar to see the result)
    const searchURL = url + pokemonToSearch;

    // use fetch to first hit the API via the searchURL, then convert the JSON result into a JS object which allows us to interact with the data
    fetch(searchURL).then((response) => response.json())
        .then((data) => {
            // THEN, grab the sprite of the pokemon and display it using our displayImage function
            let sprite = data.sprites.front_default;
            displayImage(sprite);

            // also grab the ability data of the pokemon and display it using our displayDetails function
            // could also fetch other data, put it all into an array and set as param for displayDetails? 
            let abilities = data.abilities;
            displayDetails(abilities);

        }).catch((error) => {
            // in case there was an error, console log it
            console.log("There was an error!", error);
        });

    // standard event JS code
    e.preventDefault();
}


// function to display the sprite, sprite is taken as a param and displayed by using innerHTML with an img tag
function displayImage(sprite) {
    imageContainer.innerHTML = `<img src="${sprite}" id="pokemonImage"/>`;
}

// function to displayDetails - this displays abilities only for now
function displayDetails(details) {
    // remove any previous children before appending details
    detailsContainer.removeChild(detailsContainer.firstChild);
    let abilities = document.createElement("div");
    abilities.id = "abilities";

    // for each ability the pokemon has, add that as a child to display it
    for (let i = 0; i < details.length; i++) {
        abilities.innerHTML += `Ability ${i + 1}: ${details[i].ability.name}`;
        abilities.innerHTML += "<br>"
    }
    detailsContainer.appendChild(abilities);
}
