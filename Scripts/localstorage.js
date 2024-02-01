const savetoStorage = (pokemon) =>{
    let favorites = getStorage();
}
const getStorage = () =>{
    let localStorageData = localStorage.getItem("favorites");

    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}