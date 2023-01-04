// Quand la page est chargée :
// On affiche le logger d'avant recherche
// On génère les filtres disponibles en fonction du tableau complet recipes[]
// On génère les fiches recettes  en fonction du tableau complet recipes[]
// On initialise les évenèments dans la page, une fois que les éléments sont en place.

function onInitialPageLoad(){
    Logger.init();
    Logger.beforeSearch(recipes);
    displayFilters(recipes);
    Display.recipes(recipes);
    initEventsListeners();
}

window.onload = onInitialPageLoad();