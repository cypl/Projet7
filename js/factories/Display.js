class Display{


    // Une méthode pour afficher les recettes
    static recipes(pRecipes){
        const results = document.getElementById("results");
        // On supprime les résultats en cours
        if(results.querySelector("article")){results.innerHTML = "";} 
        // Dans le cas où la recherche ne donne rien, on affiche la liste complète des recettes par défaut
        if(pRecipes.length == 0){pRecipes = recipes;}
        // Sinon on affiche les résultats correspondants
        for(let recipe of pRecipes){
            new RecipeCard(recipe.name,recipe.time,recipe.ingredients,recipe.description).create();
        }
    }


    // Une méthode pour afficher le logger
    static logger(inputValue, pRecipes, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
        // Si la recherche contient des filtres
        let searchHasFilters;
        if(filtersSelectedIngredients.length > 0 || filtersSelectedAppliance.length > 0 || filtersSelectedUstensils.length > 0){
            searchHasFilters = true;
        } else {
            searchHasFilters = false;
        }
        // si la recherche existe mais n'est pas valable
        if(inputValue.length < 3 && inputValue.length > 0 ){
            Logger.requiredSearch();
        }
        // si la recherche est valable et qu'il n'y a pas de filtres
        if(inputValue.length >= 3 && !searchHasFilters){
            if(pRecipes.length > 0){
                Logger.successfulSearch(inputValue, pRecipes);
            } else {
                Logger.noResultsSearch(inputValue);
            }
        }
        // si la recherche est valable et qu'il y a des filtres
        if(inputValue.length >= 3 && searchHasFilters){
            if(pRecipes.length > 0){
                Logger.successfulSearchAndFilter(inputValue, pRecipes);
            } else {
                Logger.noResultsSearch(inputValue);
            }
        }
        // si la recherche est vide et qu'il y a des filtres
        if(!inputValue.length && searchHasFilters){
            Logger.successfulFilter(pRecipes);
        }
        // si la recherche est vide et qu'il y a des filtres
        if(!inputValue.length && !searchHasFilters){
            Logger.beforeSearch(recipes);
        }
    }




}