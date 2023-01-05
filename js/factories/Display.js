class Display{


    // Une méthode pour afficher les recettes
    // pRecipes correspond à l'array des résultats de la recherche
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


    // Une méthode pour afficher le logger (un message pour l'utilisateur en fonction des résultats)
    // pInput correspond à la saisie dans la barre de recherche
    // pRecipes correspond à l'array des résultats de la recherche
    // pIngredients, pAppliance, pUstensils correspondent chacun à un des 3 arrays de tags sélectionnés
    static logger(pInput, pRecipes, pIngredients, pAppliance, pUstensils){
        // Si la recherche contient des filtres
        let hasFilters;
        if(pIngredients.length > 0 || pAppliance.length > 0 || pUstensils.length > 0){
            hasFilters = true;
        } else {
            hasFilters = false;
        }
        // Si la recherche existe mais n'est pas valable
        if(pInput.length < 3 && pInput.length > 0 ){
            Logger.requiredSearch();
        }
        // Si la recherche est valable et qu'il n'y a pas de filtres
        if(pInput.length >= 3 && !hasFilters){
            if(pRecipes.length > 0){
                Logger.successfulSearch(pInput, pRecipes);
            } else {
                Logger.noResultsSearch(pInput);
            }
        }
        // Si la recherche est valable et qu'il y a des filtres
        if(pInput.length >= 3 && hasFilters){
            if(pRecipes.length > 0){
                Logger.successfulSearchAndFilter(pInput, pRecipes);
            } else {
                Logger.noResultsSearch(pInput);
            }
        }
        // Si la recherche est vide et qu'il y a des filtres
        if(!pInput.length && hasFilters){
            Logger.successfulFilter(pRecipes);
        }
        // Si la recherche est vide et qu'il y a des filtres
        if(!pInput.length && !hasFilters){
            Logger.beforeSearch(recipes);
        }
    }


    // Une méthode pour afficher les listes des tags dans les filtres
    // pRecipes correspond à l'array des résultats de la recherche
    // pIngredients, pAppliance, pUstensils correspondent chacun à un des 3 arrays de tags sélectionnés
    // Cette méthode utilise la classe "Filters"
    static filters(pRecipes, pIngredients, pAppliance, pUstensils){
        Filters.generateList(Filters.dataIngredients(pRecipes), "ingredients", pIngredients);
        Filters.generateList(Filters.datasAppliance(pRecipes), "appliance", pAppliance);
        Filters.generateList(Filters.datasUtensils(pRecipes), "ustensils", pUstensils);
    }


}