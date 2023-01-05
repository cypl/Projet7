// Quand la page est chargée :
// On affiche le logger d'avant recherche
// On génère les filtres disponibles en fonction du tableau complet recipes[]
// On génère les fiches recettes  en fonction du tableau complet recipes[]
// On initialise les évenèments dans la page, une fois que les éléments sont en place.

function onInitialPageLoad(){
    let filtersSelectedIngredients = [];
    let filtersSelectedAppliance = [];
    let filtersSelectedUstensils = [];
    Logger.init();
    Logger.beforeSearch(recipes);
    Display.filters(recipes, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    Display.recipes(recipes);
    initEventsListeners();
}

window.onload = onInitialPageLoad();