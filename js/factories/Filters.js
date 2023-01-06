class Filters{

    // Une méthode pour récupérer la liste des ingrédients, en fonction des résultats de recettes
    // pRecipes correspond à l'array des résultats de la recherche
    static dataIngredients(pRecipes){
        let datasIngredients = [];
        for(let recipe of pRecipes){
            let listIngredients = recipe.ingredients;
            for(let ingredient of listIngredients){
                let ingredientItem = ingredient.ingredient;
                ingredientItem = ingredientItem.toLowerCase();
                datasIngredients.push(ingredientItem);
            }
        }
        // On enlève les doublons
        let datasIngredientsNoDuplicates = [...new Set(datasIngredients)].sort(function (a, b) {
            return a.localeCompare(b);
          }); // sort() permet de classer par ordre alphabétique, et la localeCompare() de tenir compte des caractères accentués
        return datasIngredientsNoDuplicates;
    }


    // Une méthode pour récupérer la liste des appareils, en fonction des résultats de recettes
    // pRecipes correspond à l'array des résultats de la recherche
    static dataAppliance(pRecipes){
        let datasAppliance = [];
        for(let recipe of pRecipes){
            datasAppliance.push(recipe.appliance);
        }
        // On enlève les doublons
        let datasApplianceNoDuplicates = [...new Set(datasAppliance)].sort(function (a, b) {
            return a.localeCompare(b);
        }); // sort() permet de classer par ordre alphabétique, et la localeCompare() de tenir compte des caractères accentués
        return datasApplianceNoDuplicates;
    }


    // Une méthode pour récupérer la liste des ustensiles, en fonction des résultats de recettes
    // pRecipes correspond à l'array des résultats de la recherche
    static dataUtensils(pRecipes){
        let datasUtensils = [];
        for(let recipe of pRecipes){
            let listUtensils = recipe.ustensils;
            for(let ustensil of listUtensils){
                let ustensilItem = ustensil.toLowerCase();
                datasUtensils.push(ustensilItem);
            }
        }
        // On enlève les doublons
        let datasUtensilsNoDuplicates = [...new Set(datasUtensils)].sort(function (a, b) {
            return a.localeCompare(b);
        }); // sort() permet de classer par ordre alphabétique, et la localeCompare() de tenir compte des caractères accentués
        return datasUtensilsNoDuplicates;
    }


    // Une méthode pour (ré-)générer une liste de tags dans un filtre
    // pData correspond aux data récupérées par l'une des 3 méthodes dataIngredients(), datasAppliance(), datasUtensils()
    // pCriteria correspond à une string : "ingredients", "appliance", "ustensils"
    // pSelectedTags correspond à un des 3 arrays de tags sélectionnés
    static generateList(pData, pCriteria, pSelectedTags){
        // on supprime les éléments qui pourrait rester d'un chargement précédent
        if(document.getElementById(pCriteria + "_list")){document.getElementById(pCriteria + "_list").remove();}
        // on construit la liste du filtre
        const filterWrapper = document.getElementById("filter_" + pCriteria);
        const filterCriteriaList = document.createElement("ul");
        filterCriteriaList.setAttribute("id", pCriteria+ "_list");
        filterCriteriaList.classList.add("filter_list");
        filterWrapper.append(filterCriteriaList);
        // on ajoute les différents tag du filtre dans la liste, en fonction des données de pData
        for(let i of pData){
            const filterCriteriaList = document.getElementById(pCriteria + "_list");
            let filterItem = document.createElement("li");
            filterItem.classList.add("ingredient_item");
            filterItem.classList.add("filter_list_item");
            filterItem.classList.add("filter_list_item--" + pCriteria);
            filterItem.textContent = stringFirstLetterUppercase(i);
            // Si certains tags ont déjà été sélectionnés, ils sont dans l'array pSelectedTags
            if(pSelectedTags.length > 0){
                if(pSelectedTags.includes(filterItem.textContent)){
                    filterItem.classList.add("selected_filter");
                }
            }
            filterCriteriaList.append(filterItem);
        }
    }

    
    // Une méthode pour mettre à jour les arrays de tags sélectionnés, quand on en supprime un
    // pTag correspond au tag qui a été cliqué, et que l'on souhaite retirer
    // pSeletedTagsElem correspond à une collection d'éléments
    // pIngredients, pAppliance, pUstensils correspondent chacun à un des 3 arrays de tags sélectionnés
    static updateSelections(pTag, pSelectedTagsElem, pIngredients, pAppliance, pUstensils){
        // S'il ne reste qu'un élément dans les filtres sélectionnés, on supprime le conteneur
        if(pSelectedTagsElem.length == 1){document.getElementById("filters_selected_list").remove();}
        if(pTag.classList.contains("selected_ingredient")){
            let ingredientsUpdated = pIngredients.filter(item => !item.includes(pTag.textContent));
            pIngredients.length = 0;
            for(let f of ingredientsUpdated){pIngredients.push(f);}
        }
        if(pTag.classList.contains("selected_appliance")){
            let applianceUpdated = pAppliance.filter(item => !item.includes(pTag.textContent));
            pAppliance.length = 0;
            for(let f of applianceUpdated){pAppliance.push(f);}
        }
        if(pTag.classList.contains("selected_ustensil")){
            let ustensilsUpdated = pUstensils.filter(item => !item.includes(pTag.textContent));
            pUstensils.length = 0;
            for(let f of ustensilsUpdated){pUstensils.push(f);}
        }
    }

    // Une méthode pour vider toutes les listes de tags sélectionnés
    // pIngredients, pAppliance, pUstensils correspondent chacun à un des 3 arrays de tags sélectionnés
    static removeAll(pIngredients, pAppliance, pUstensils){
        pIngredients.length = 0;
        pAppliance.length = 0;
        pUstensils.length = 0;
        Display.selectedTags(pIngredients, pAppliance, pUstensils);
    }


}