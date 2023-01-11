// Une fonction searchByText() permet de réaliser une recherche pour une expression saisie
// Une fonction searchByFilters() permet de réaliser une recherche par tag
// La recherche peut se faire de 3 manières :
// 1 - searchByText() --> Résultats
// 2 - searchByText() --> searchByFilters() --> Résultats
// 3 - searchByFilters() --> Résultats


/**
 * Une fonction utilisée par searchByText() pour tester si le titre de la recette contient l'expression saisie
 * @param {string} inputValue 
 * @param {string} title 
 * @returns 
 */
function findInTitle(inputValue, title){
    return title.toLowerCase().includes(inputValue);
}


/**
 * Une fonction utilisée par searchByText() pour tester si la liste des ingrédients de la recette contient l'expression saisie
 * @param {string} inputValue 
 * @param {object} ingredients 
 * @returns 
 */
function findInIngredients(inputValue, ingredients){
    return ingredients.find(ing => {
        if(ing.ingredient.toLowerCase().includes(inputValue)){
            return true;
        };
    });
}


/**
 * Une fonction utilisée par searchByText() pour tester si la description de la recette contient l'expression saisie
 * @param {string} inputValue 
 * @param {string} description 
 * @returns {boolean} si la description de la recette contient l'expression saisie
 */
function findInDescription(inputValue, description){
    return description.toLowerCase().includes(inputValue);
}


/**
 * Fonction pour rechercher dans les recettes à partir d'une expression saisie
 * @param {string} inputValue 
 * @returns {array} array de résultats de recettes
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


// Création de 3 arrays pour stocker les tags sélectionnés
let selectedIngredients = []
let selectedAppliance = []
let selectedUstensils = []


/**
 * Fonction utilisée par searchByFilters() pour comparer les tags présents dans la recette, avec ceux qui sont sélectionnés.
 * Si tous les tags sélectionnés sont inclus dans la recette, alors elle retourne "true".
 * @param {objet} recipe 
 * @param {*} recipeTags array d'objets, ou string, ou array
 * @param {array} selectedTags 
 * @returns {boolean}
 */
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
    return selectedTagsInRecipe.length == selectedTags.length;
}


/**
 * Fonction pour rechercher dans les recettes à partir des tags sélectionnés
 * Utilisation de compareWithSelectedTags() pour chaque type de Tag
 * La fonction retourne un array de recettes, qui contiennent toutes l'ensemble des tags sélectionnés
 * @param {array} recipesFromSearch 
 * @param {array} selectedIngredients 
 * @param {array} selectedAppliance 
 * @param {array} selectedUstensils 
 * @returns {array}
 */
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


/**
 * Fonction qui génère les résultats (array) en fonction des différents cas de figure possibles
 * @param {string} inputValue 
 * @param {array} selectedIngredients 
 * @param {array} selectedAppliance 
 * @param {array} selectedUstensils 
 * @returns {array} // array de recettes
 */
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