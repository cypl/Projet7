// On crée une fonction qui nettoie l'expression du champ de recherche, en retirant les caractères spéciaux
function cleanInputValue(expression){
    // on retire les caractères spéciaux de l'expression de recherche
    const regex = /[&\/\\#,+()$~%.'":*?!<>_{}`@°^¨$€£§]/g; 
    let expressionClean = expression.replace(regex, '');
    // si l'expression contient un caractère spécial, on affiche un message d'erreur
    if(expression.match(regex)){
        printMessageErrorExpression();
    } else {
        //remove message
        removeMessageErrorExpression();
    }
    return expressionClean;
}

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
    let inputValue = cleanInputValue(searchField.value);
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


function generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
    // On sort d'abord les résultats de la recherche par texte
    const recipesFromSearch = searchByText(inputValue);
    // On précise ensuite la recherche avec les filtres
    const recipesFromFilters = searchByFilters(recipesFromSearch, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);

    // const recipesResults = recipesFromSearch - recipesFromFilters;
    // On retire les recettes correspondantes aux filtres
    const recipesResults = recipesFromSearch.filter(n => recipesFromFilters.includes(n));
    console.log(recipesResults);
    return recipesResults; 
}


function showResultsMessage(){
    const searchField = document.getElementById("search_main");
    let inputValue = cleanInputValue(searchField.value);
    // s'il n'y a pas de filtres
    if(!document.getElementById("filters_selected_list")){
        console.log("On affiche un message de résultats, il n'y a pas de filtres.");
        // s'il n'y a aucune recherche texte
        // if(!inputValue.length){console.log("il n'y a aucune recherche texte")}
        // s'il y a une recherche texte insuffisante
        // if(inputValue.length < 3 && inputValue.length > 0){console.log("s'il y a une recherche texte insuffisante")}
        // s'il y a une recherche texte suffisante et des résultats
        // if(inputValue.length >= 3){console.log("s'il y a une recherche texte suffisante")}
        // s'il y a une recherche texte suffisante mais aucun résultats
    } 
    // s'il y a des filtres
    else {
        console.log("On affiche un message de résultats, il y a des filtres.");
        // s'il n'y a aucune recherche texte
        // s'il y a une recherche texte insuffisante
        // s'il y a une recherche texte suffisante et des résultats
        // s'il y a une recherche texte suffisante mais aucun résultats
    }
}


// On crée une fonction pour afficher les recettes, en fonction d'un Array de recettes
function displayRecipes(recipesArray){
    // On supprime les résultats en cours
    if(results.querySelector("article")){results.innerHTML = "";} 
    // Dans le cas où la recherche ne donne rien, on affiche la liste complète des recettes par défaut
    if(recipesArray.length == 0){
        recipesArray = recipes;
    }
    // Sinon on affiche les résultats correspondants
    for(let recipe of recipesArray){
        results.append(new RecipeCard(recipe.name,recipe.time,recipe.ingredients,recipe.description).createCard());
    }
    showResultsMessage();
}


// On crée un écouteur sur le champ de recherche
const searchField = document.getElementById("search_main");
searchField.value = "";
searchField.addEventListener('input', function (event) {
    
    // Si des filtres sont déjà sélectionnés, on les retire
    removeAllSelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);

    let inputValue = cleanInputValue(this.value); // expression
    // On lance la fonction de recherche searchByText()
    // elle retourne un Array avec les résultats
    // et a partir de cet Array on peut afficher les résultats
    if(inputValue.length >= 3){
        let recipesFromSearch = searchByText(inputValue);
        if(recipesFromSearch.length > 0){
            displayFilters(recipesFromSearch);
            displayRecipes(recipesFromSearch);
        } else {
            displayFilters(recipes);
            displayRecipes(recipes);
        }
    } else {
        displayFilters(recipes);
        displayRecipes(recipes);
    }

    // Gestion des messages avant/erreur/succès
    let recipesFromSearch = searchByText(inputValue);
    manageMessagesFromSearch(inputValue, recipesFromSearch);

});