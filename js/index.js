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



// Quand on rentre une lettre dans la barre de recherche :
// On supprime les filtres déjà sélectionnés (s'il y en a)
// On génère les résultats (tableau)
// On génère les filtres disponibles, liés aux résultats
// On génère les fiches liées aux résultats
// On affiche le logger en conséquence du résultat

const searchField = document.getElementById("search_main");
searchField.value = "";
searchField.addEventListener('input', function (event) {
    // On supprime les filtres déjà sélectionnés (s'il y en a)
    removeAllSelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    // On génère les résultats (si plus de 3 caractères)
    let inputValue = cleanInputValue(this.value); // expression
    let recipesResults = generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    // On met à jour les listes de filtres disponibles en fonction des résultats
    updateFiltersList(recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    const filtersItems = document.getElementsByClassName("filter_list_item");
    for(let filtersItem of filtersItems){
        filtersItem.addEventListener('click', addFilterHandler);
    }
    // On génère les fiches liées aux résultats
    displayRecipes(recipesResults);
    // On affiche le logger en conséquence du résultat
    displayLogger(inputValue, recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
});



// Quand on ajoute un filtre :
// On ajoute le filtre sélectionné sous la barre de recherche
// On génère les résultats (tableau)
// On met à jour les listes de filtres disponibles en fonction des résultats
// On génère les fiches liées aux résultats
// On affiche le message en conséquence du résultat
// On donne la possibilité de déselectionner un filtre 

function addFilterHandler(event){
    event.target.classList.add("selected_filter");
    // On ajoute l'élément cliqué au tableau correspondant : filtersSelectedIngredients[],…
    if(event.target.classList.contains("filter_list_item--ingredients")){
        filtersSelectedIngredients.push(this.textContent);
    }
    if(event.target.classList.contains("filter_list_item--appliance")){
        filtersSelectedAppliance.push(this.textContent);
    }
    if(event.target.classList.contains("filter_list_item--ustensils")){
        filtersSelectedUstensils.push(this.textContent);
    }
    // On ajoute le filtre sélectionné sous la barre de recherche
    displaySelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils)
    // On génère les résultats (tableau)
    const searchField = document.getElementById("search_main");
    let inputValue = cleanInputValue(searchField.value);
    let recipesResults = generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils)
    // On met à jour les listes de filtres disponibles en fonction des résultats
    setTimeout(function(){
        updateFiltersList(recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
        const filtersItems = document.getElementsByClassName("filter_list_item");
        for(let filtersItem of filtersItems){
            filtersItem.addEventListener('click', addFilterHandler);
        }
    }, 700);
    // On génère les fiches liées aux résultats
    displayRecipes(recipesResults);
    // On affiche le logger en conséquence du résultat
    displayLogger(inputValue, recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    // On donne la possibilité de déselectionner un filtre 
    const filtersSelectedItems = document.getElementsByClassName("filter_item_selected");
    if(filtersSelectedItems){
        for(let filtersSelectedItem of filtersSelectedItems){
            filtersSelectedItem.addEventListener('click', removeFilterHandler);
        }
    }

}

const filtersItems = document.getElementsByClassName("filter_list_item");
if(filtersItems){
    for(let filtersItem of filtersItems){
        filtersItem.addEventListener('click', addFilterHandler);
    }    
}



// Quand on retire un filtre :
// On génère les résultats (tableau)
// On retire le filtre sélectionné sous la barre de recherche
// On génère les filtres disponibles liés résultats
// On génère les fiches liées aux résultats
// On affiche le message en conséquence du résultat

function removeFilterHandler(event){
    // On retire le filtre sélectionné sous la barre de recherche
    // le clic sur un filtre sélectionné déclenche la fonction updateFilter();
    const filtersSelectedItems = document.getElementsByClassName("filter_item_selected");
    if(filtersSelectedItems){
        if(event.target.classList.contains("selected_ingredient")){
            updateFilter(event.target, filtersSelectedItems, filtersSelectedIngredients, "filter_list_item--ingredients");
        }
        if(event.target.classList.contains("selected_appliance")){
            updateFilter(event.target, filtersSelectedItems, filtersSelectedAppliance, "filter_list_item--appliance");
        }
        if(event.target.classList.contains("selected_ustensil")){
            updateFilter(event.target, filtersSelectedItems, filtersSelectedUstensils, "filter_list_item--ustensils");
        }
        // On régénère les résultats de la recherche, et on affiche les recettes correspondantes
        const searchField = document.getElementById("search_main");
        let inputValue = cleanInputValue(searchField.value);
        const recipesResults = generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
        // On génère les fiches liées aux résultats
        displayRecipes(recipesResults);
        // On affiche le logger en conséquence du résultat
        displayLogger(inputValue, recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    }
}