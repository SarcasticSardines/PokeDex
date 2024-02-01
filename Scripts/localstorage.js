const savetoStorage = (pokemon) =>{
    let favorites = getStorage();
    if(!favorites.includes(pokemon)){
        favorites.push(pokemon);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
const getStorage = () =>{
    let localStorageData = localStorage.getItem("favorites");

    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}

const removefromStorage = (pokemon) =>{
    let favorites = getStorage();
    let pokIndex = favorites.indexOf(pokemon);
    favorites.splice(pokIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

export {savetoStorage, getStorage, removefromStorage};