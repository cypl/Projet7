// Quand la page est chargée :
// On affiche le logger d'avant recherche
// On génère les filtres disponibles en fonction du tableau complet recipes[]
// On génère les fiches recettes  en fonction du tableau complet recipes[]

function onInitialPageLoad(){
    const search = document.getElementById("search");
    const messages = document.getElementById("messages");
    const results = document.getElementById("results");

    LOGGER.beforeSearch(recipes);
    displayFilters(recipes);
    displayRecipes(recipes);
}

window.onload = onInitialPageLoad();