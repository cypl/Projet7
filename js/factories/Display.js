class Display{


    /**
     * Une méthode pour afficher les recettes
     * Cette méthode fait appel à la classe RecipeCard
     * @param {array} pRecipes // correspond à l'array des résultats de la recherche
     */
    static recipes(pRecipes){
        const results = document.getElementById("results");
        // On supprime les résultats en cours
        if(results.querySelector("article")){
            const recipesCard = results.querySelectorAll("article");
            for(let i of recipesCard){i.classList.add("fadeOut");}
            setTimeout(function(){
                results.innerHTML = "";
            }, 100); // 100ms correspond à la durée de l'animation "fadeOut"
        } 
        // Dans le cas où la recherche ne donne rien, on affiche la liste complète des recettes par défaut
        if(pRecipes.length == 0){pRecipes = recipes;}
        // Sinon on affiche les résultats correspondants
        for(let recipe of pRecipes){
            setTimeout(function(){
                new RecipeCard(recipe.name,recipe.time,recipe.ingredients,recipe.description).create();
                const recipesCard = results.querySelectorAll("article");
                for(let i of recipesCard){i.classList.add("fadeIn");}
            }, 100); // 100ms correspond à la durée de l'animation "fadeOut"
        }
        
    }


    /**
     * Une méthode pour afficher le logger (un message pour l'utilisateur en fonction des résultats)
     * Cette méthode fait appel à la classe Logger
     * @param {string} pInput correspond à la saisie dans la barre de recherche
     * @param {array} pRecipes correspond à l'array des résultats de la recherche
     * @param {array} pIngredients correspond à un array de tags sélectionnés
     * @param {array} pAppliance correspond à un array de tags sélectionnés
     * @param {array} pUstensils correspond à un array de tags sélectionnés
     */
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


    /**
     * Une méthode pour afficher les listes des tags dans les filtres
     * Cette méthode fait appel à la classe "Filters"
     * @param {array} pRecipes correspond à l'array des résultats de la recherche
     * @param {array} pIngredients correspond à un array de tags sélectionnés
     * @param {array} pAppliance correspond à un array de tags sélectionnés
     * @param {array} pUstensils correspond à un array de tags sélectionnés
     */
    static filters(pRecipes, pIngredients, pAppliance, pUstensils){
        Filters.generateList(Filters.dataIngredients(pRecipes), "ingredients", pIngredients);
        Filters.generateList(Filters.dataAppliance(pRecipes), "appliance", pAppliance);
        Filters.generateList(Filters.dataUtensils(pRecipes), "ustensils", pUstensils);
    }


    /**
     * Une méthode pour afficher les listes des tags sélectionnés sous la barre de recherche
     * @param {array} pIngredients correspond à un array de tags sélectionnés
     * @param {array} pAppliance correspond à un array de tags sélectionnés
     * @param {array} pUstensils correspond à un array de tags sélectionnés
     */
    static selectedTags(pIngredients, pAppliance, pUstensils){
        if(document.getElementById("filters_selected_list")){
            document.getElementById("filters_selected_list").remove();
        }
        const filtersWrapper = document.getElementById("filters");
        const filtersSelectedWrapper = document.createElement("ul");
        filtersSelectedWrapper.setAttribute("id","filters_selected_list");
        filtersWrapper.prepend(filtersSelectedWrapper);
        for(let ingredient of pIngredients){
            filtersSelectedWrapper.append(new SelectedFilter(ingredient, "selected_ingredient").create());
        }
        for(let appliance of pAppliance){
            filtersSelectedWrapper.append(new SelectedFilter(appliance, "selected_appliance").create());
        }
        for(let ustensil of pUstensils){
            filtersSelectedWrapper.append(new SelectedFilter(ustensil, "selected_ustensil").create());
        }
    }


}