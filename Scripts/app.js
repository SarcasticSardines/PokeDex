import {savetoStorage, getStorage, removefromStorage} from "./localstorage.js";

let pokInput = document.getElementById("pokInput");
let pokRandom = document.getElementById("pokRandom");
let pokFav = document.getElementById("pokFav");
let pokId = document.getElementById("pokId");
let pokName = document.getElementById("pokName");
let hiddenGender = document.getElementById("hiddenGender");
let maleBtn = document.getElementById("maleBtn");
let femaleBtn = document.getElementById("femaleBtn");
let sprite = document.getElementById("sprite");
let type1 = document.getElementById("type1");
let monoHide = document.getElementById("monoHide");
let type2 = document.getElementById("type2");
let pokAbility = document.getElementById("pokAbility");
let pokMove = document.getElementById("pokMove");
let pokLocation = document.getElementById("pokLocation");
let evoChain = document.getElementById("evoChain");
let stageBase = document.getElementById("stageBase");
let stage1 = document.getElementById("stage1");
let stage2 = document.getElementById("stage2");
let grabFaves = document.getElementById("grabFaves");

let shinyBool;

const getPokemon = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/" +pokemon);
    const data = await promise.json();
    console.log(data);
    return data;
}
// getPokemon();

const getLocation = async (id) =>{
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
    const data = await promise.json();
    return data;
}

const getEvo = async (pokemon) =>{
    const promise = await fetch(`${pokemon.species.url}`);
    const data = await promise.json();

    const promise2 = await fetch(`${data.evolution_chain.url}`);
    const data2 = await promise2.json();
    return data2;
}


pokRandom.addEventListener("click", (event)=>{
    let rando = 1 + Math.floor(Math.random() * 649);
    populate(rando);
});

const populate = async (event) =>{
    pokemon = await getPokemon(event);
        id = await getLocation(event);
        
        let sid = await getEvo(pokemon);

        shinyBool = false;

        if(pokemon.sprites.front_female === null){
            hiddenGender.style.display = "none";
        }else{
            hiddenGender.style.display = "block";
        }
        pokId.textContent = pokemon.id;
        pokName.textContent = pokemon.name;
        sprite.src = pokemon.sprites.front_default;

        type1.textContent = pokemon.types[0].type.name;
        if(pokemon.types.length > 1){
            monoHide.style.display = "block";
            type2.textContent = pokemon.types[1].type.name;
        }else{
            monoHide.style.display = "none";
        }


        for(let i = 0; pokemon.abilities.length > i; i++){
            // min 1 (2 w/hidden) max 4 abilities, pokAbility.textContent 
            // const abilitiesArr = pokemon.abilities(name => name.split(" "));
            // pokAbility.textContent = pokemon.abilities[i].ability(name => name.split(" "));
            // i++
            if(i === 0){
                pokAbility.innerText = pokemon.abilities[i].ability.name;
            }else{
                
                pokAbility.innerText += ", " + pokemon.abilities[i].ability.name;
            }
        }

        //pokMove.innerText
        for(let i = 0; pokemon.moves.length > i; i++){
            if(i === 0){
                pokMove.innerText = pokemon.moves[i].move.name;
            }else{
                pokMove.innerText += ", " + pokemon.moves[i].move.name;
            }
        }

        //pokLocation.innerText
        // pokLocation.innerText = location_area_encounters[0].location_area.name;
        if(id[0] === undefined){
            pokLocation.innerText = "N/A";
        }else{
        pokLocation.innerText = id[0].location_area.name.split("-").join(" ");
        }


        // evoChain.textContent = sid.evolution_chain.prev.chain.evolves_to[0].species.name

        // let base = sid.chain.species.name;
        // let evolution = sid.chain.evolves_to[0].species.name;
        // let evolutionSQ = sid.chain.evolves_to[0].evolves_to[0].species.name;

        // console.log(sid.chain.evolves_to[0].evolves_to[0].species.name)

        //from base evo to stage 2 final evo path -> sid.chain.evolves_to[0].evolves_to[0].species.name
        //from base evo to stage 1 final evo path -> sid.chain.evolves_to[0].species.name
        //to grab base evo -> sid.chain.species.name
        //stageBase, stage1, stage2
        

        if( sid?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name === undefined && sid?.chain?.evolves_to[0]?.species?.name !== undefined ){
            //display only base and evolution
            stageBase.innerText = sid.chain.species.name;
            stage1.innerText =  sid.chain.evolves_to[0].species.name;
            stage2.innerText = null;
        }else if(sid?.chain?.evolves_to[0]?.species?.name === undefined){
            evoChain.innerText = "Does Not Evolve";
            stageBase.innerText = "";
            stage1.innerText = "";
            stage2.innerText = "";
        }else{
            //display all 3
            stageBase.innerText = sid.chain.species.name;
            stage1.innerText =  sid.chain.evolves_to[0].species.name;
            stage2.innerText = sid.chain.evolves_to[0].evolves_to[0].species.name;
        }

}



pokInput.addEventListener("keydown", async (event)=>{
    if(event.key === "Enter"){
        populate(event.target.value);


    }
});



        sprite.addEventListener("click", ()=>{
            if(shinyBool === false){
                sprite.src = pokemon.sprites.front_shiny;
                shinyBool = true;
            }else{
                sprite.src = pokemon.sprites.front_default;
                shinyBool = false;
            }
        });


//variables needed to manipulate:
//NAME -> {name}
//ID # -> {id}
//SPRITE -> {sprites.front_default} and {sprites.front_shiny} for female forms - if sprites.front_female === null {no display}
//TYPING -> {types[0].type.name} [0-1] if not mono-type
//ABILITIES -> {abilities[i].ability.name} for loop to iterate through and display all (up to 4)
//LEARNSET -> {moves[i].move.name} for loop (overflow-y:auto)
//LOCATION -> {location_area_encounters[0].location_area.name}

//EVOLUTION PATH -> {species.url. evolution_chain.url .chain.evolves_to[0].species.name} or if you fetch from https://pokeapi.co/api/v2/pokemon-species/{id# of pokemon} -> evolves_from_species.name (only works for evolved mons) 
//to grab sprite of evolution -> inside https://pokeapi.co/api/v2/pokemon-species/{id of current pokemon} -> pokedex_numbers[0].entry_number  (pokedex_numbers[0].pokedex.name MUST BE "national", so [0]

