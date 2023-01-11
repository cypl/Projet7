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
/**
 * On crée une fonction pour rechercher dans les recettes à partir d'une expression
 * @param {string} inputValue 
 * @returns {Array}
 */
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
// Elle compare les tags présents dans la recette, avec ceux qui sont sélectionnés
// Si tous les tags sélectionnés sont inclus dans la recette, alors elle retourne "true"
function compareWithSelectedTags(recipe, recipeTags, selectedTags){
    // Pour chaque recette, on fait un tableau avec uniquement les tags possibles de la recette
    let recipeTagsLowerCase = [];
    if(recipeTags == recipe.ingredients){ // ingredients
        recipeTagsLowerCase = recipeTags.map(t => { return t.ingredient.toLowerCase() });
    } else if (recipeTags == recipe.appliance){ // appliance
        recipeTagsLowerCase.push(recipeTags.toLowerCase());
    } else { // ustensils
        recipeTagsLowerCase = recipeTags.map(t => { return t.toLowerCase() });
    }
    // On fait ensuite un tableau avec la liste des tags de la recette qui ne correspondent qu'à selectedTags
    let selectedTagsInRecipe = selectedTags.filter(x => 
        recipeTagsLowerCase.includes(x.toLowerCase())
    );
    // Si les ingrédients sélectionnés inclus dans une recette sont aussi nombreux que dans selectedTags, alors la recette correspond à tous les tags, et la condition est valide
    if(selectedTagsInRecipe.length == selectedTags.length){return true};
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
    const selectedUstensilsLowerCase = selectedUstensils.map(ustensil => { return ustensil.toLowerCase() });
    const recipesFromFilters = recipesFromSearch.filter(recipe => {
        if (
            compareWithSelectedTags(recipe, recipe.ingredients, selectedIngredientsLowerCase)
            && compareWithSelectedTags(recipe, recipe.appliance, selectedApplianceLowerCase)
            && compareWithSelectedTags(recipe, recipe.ustensils, selectedUstensilsLowerCase)
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