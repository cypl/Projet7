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
    static datasAppliance(pRecipes){
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
    static datasUtensils(pRecipes){
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
        // on construit le filtre
        const filterWrapper = document.getElementById("filter_" + pCriteria);
        filterWrapper.append(new FilterItemsList(pCriteria).create());
        // on ajoute les différents items du filtre, en fonction des données de pData
        let filterItemsData = pData;
        for(let data of filterItemsData){
            const filterCriteriaList = document.getElementById(pCriteria + "_list");
            filterCriteriaList.append(new FilterItem(data, pCriteria).create(pSelectedTags));
        }
    }


}