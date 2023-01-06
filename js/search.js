// On crée 3 tableaux, qui vont stocker les filtres sélectionnés
let filtersSelectedIngredients = []
let filtersSelectedAppliance = []
let filtersSelectedUstensils = []


// On crée une fonction pour chaque test de la fonction searchByText();
function findInTitle(inputValue, title){
    return title.toLowerCase().includes(inputValue);
}
function findInIngredients(inputValue, ingredients){
    return ingredients.find(ing => {
        if(ing.ingredient.toLowerCase().includes(inputValue)){
            return true;
        };
    });
}
function findInDescription(inputValue, description){
    return description.toLowerCase().includes(inputValue);
}


//On crée une fonction pour rechercher dans les recettes à partir d'une expression
function searchByText(inputValue){
    let inputValueForTest = inputValue.toLowerCase();
    const recipesFromSearch = recipes.filter(recipe => {
        if (findInTitle(inputValueForTest, recipe.name)
            || findInIngredients(inputValueForTest, recipe.ingredients)
            || findInDescription(inputValueForTest, recipe.description)){
                return true;
            }
    })
    return recipesFromSearch;
};


// On crée une fonction pour chaque test de la fonction searchByFilters();
function findWithFilterIngredients(recipe, selectedIngredients){
    let recipeIngredientsLowerCase = recipe.ingredients.map(ing => { return ing.ingredient.toLowerCase() });
    return recipeIngredientsLowerCase.find(ing => {
        if(selectedIngredients.includes(ing)){ 
            return true;
        }
    });
}
function findWithFilterAppliance(recipe, selectedIngredients){
    return selectedIngredients.find(appliance => {
        if(selectedIngredients.includes(recipe.appliance.toLowerCase())){ 
            return true;
        }
    });
}
function findWithFilterUstensils(recipe, selectedIngredients){
    let recipeUstensilsLowerCase = recipe.ustensils.map(ust => { return ust.toLowerCase() });
    return recipeUstensilsLowerCase.find(ust => {
        if(selectedIngredients.includes(ust)){ return true;}
    });
}

//On crée une fonction pour rechercher dans les recettes à partir des filtres
function searchByFilters(recipesFromSearch, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
    const searchField = document.getElementById("search_main");
    let inputValue = cleanInputValue(searchField.value, document.getElementById("search"));
    recipesFromSearch = searchByText(inputValue);
    // On retire les recettes de recipesFromSearch[] qui ne correspondent pas aux filtres 
    // 1 - Filtres Ingrédients
    const filtersSelectedIngredientsLowerCase = filtersSelectedIngredients.map(ingredients => { return ingredients.toLowerCase() });
    // 2 - Filtres Appareils
    const filtersSelectedApplianceLowerCase = filtersSelectedAppliance.map(appliance => { return appliance.toLowerCase() });
    // 3 - Filtres Ustensiles
    const filtersSelectedUstensilsLowerCase = filtersSelectedUstensils.map(ustensil => { return ustensil.toLowerCase() });
    const recipesFromFilters = recipesFromSearch.filter(recipe => {
        if (findWithFilterIngredients(recipe, filtersSelectedIngredientsLowerCase)
            || findWithFilterAppliance(recipe, filtersSelectedApplianceLowerCase)
            || findWithFilterUstensils(recipe, filtersSelectedUstensilsLowerCase)){
                return true;
            }
    });
    return recipesFromFilters;
}


// On crée une fonction qui génère les résultats (array) en fonction des différents cas de figure possibles
function generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
    // Si la recherche contient du texte
    let searchHasText;
    if(inputValue.length >= 3){
        searchHasText = true;
    } else {
        searchHasText = false;
    }
    // Si la recherche contient des filtres
    let searchHasFilters;
    if(filtersSelectedIngredients.length > 0 || filtersSelectedAppliance.length > 0 || filtersSelectedUstensils.length > 0){
        searchHasFilters = true;
    } else {
        searchHasFilters = false;
    }
    // Les résultats seront listés dans un tableau recipesResults[]
    const recipesResults = [];
    // 1 - s'il y a une recherche texte mais pas de filtre
    if(searchHasText && !searchHasFilters){
        for (let i of searchByText(inputValue)){
            recipesResults.push(i);
        }
    } 
    // 2 - S'il n'y a pas de recherche texte mais des filtres
    if(!searchHasText && searchHasFilters){
        const recipesFromFilters = searchByFilters(recipes, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
        for (let i of recipesFromFilters){
            recipesResults.push(i);
        }
    }
    // 3 - S'il y a une recherche texte et des filtres 
    if(searchHasText && searchHasFilters) {
        const recipesFromSearch = searchByText(inputValue);
        const recipesFromFilters = searchByFilters(recipesFromSearch, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
        const recipesFromSearchAndFilters = recipesFromSearch.filter(n => recipesFromFilters.includes(n));
        for (let i of recipesFromSearchAndFilters){
            recipesResults.push(i);
        }
    }
    return recipesResults; 
}