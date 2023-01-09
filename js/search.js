// Une fonction searchByText() permet de réaliser une recherche par expression
// Une fonction searchByFilters() permet de réaliser une recherche par tag
// La recherche peut se faire de 3 manières :
// 1 - searchByText() --> Résultats
// 2 - searchByText() --> searchByFilters() --> Résultats
// 3 - searchByFilters() --> Résultats


// On crée une fonction searchByText() qui va réduire le nombre de résultats aux recettes qui contient l'expression saisie dans les titres OU les listes d'ingrédients OU les descriptions 
// On crée une fonction pour chacun des tests de la fonction searchByText();
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



// On crée une fonction searchByFilters() qui va réduire le nombre de résultats aux recettes qui ne contiennent que les filtres sélectionnés
// On crée 3 tableaux, qui vont stocker les filtres sélectionnés
let selectedIngredients = []
let selectedAppliance = []
let selectedUstensils = []

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
function searchByFilters(recipesFromSearch, selectedIngredients, selectedAppliance, selectedUstensils){
    const searchField = document.getElementById("search_main");
    let inputValue = cleanInputValue(searchField.value, document.getElementById("search"));
    recipesFromSearch = searchByText(inputValue);
    // 1 - Ingrédient en bas de casses
    const selectedIngredientsLowerCase = selectedIngredients.map(ingredients => { return ingredients.toLowerCase() });
    // 2 - Appareils en bas de casse    
    const selectedApplianceLowerCase = selectedAppliance.map(appliance => { return appliance.toLowerCase() });
    // 3 - Ustensiles en bas de casse
    const filtersSelectedUstensilsLowerCase = selectedUstensils.map(ustensil => { return ustensil.toLowerCase() });
    const recipesFromFilters = recipesFromSearch.filter(recipe => {
        if (
            findWithFilterIngredients(recipe, selectedIngredientsLowerCase)
            || findWithFilterAppliance(recipe, selectedApplianceLowerCase)
            || findWithFilterUstensils(recipe, filtersSelectedUstensilsLowerCase)
            ){return true;}
    });
    return recipesFromFilters;
}


// On crée une fonction qui génère les résultats (array) en fonction des différents cas de figure possibles
function generateRecipesResults(inputValue, selectedIngredients, selectedAppliance, selectedUstensils){
    // Si la recherche contient du texte
    let searchHasText;
    if(inputValue.length >= 3){
        searchHasText = true;
    } else {
        searchHasText = false;
    }
    // Si la recherche contient des filtres
    let searchHasFilters;
    if(selectedIngredients.length > 0 || selectedAppliance.length > 0 || selectedUstensils.length > 0){
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
        const recipesFromFilters = searchByFilters(recipes, selectedIngredients, selectedAppliance, selectedUstensils);
        for (let i of recipesFromFilters){
            recipesResults.push(i);
        }
    }
    // 3 - S'il y a une recherche texte et des filtres 
    if(searchHasText && searchHasFilters) {
        const recipesFromSearch = searchByText(inputValue);
        const recipesFromFilters = searchByFilters(recipesFromSearch, selectedIngredients, selectedAppliance, selectedUstensils);
        const recipesFromSearchAndFilters = recipesFromSearch.filter(n => recipesFromFilters.includes(n));
        for (let i of recipesFromSearchAndFilters){
            recipesResults.push(i);
        }
    }
    return recipesResults; 
}