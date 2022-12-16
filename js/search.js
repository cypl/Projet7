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



//On crée une fonction pour rechercher dans les datas ce qui peut correspondre aux lettres saisies
function searchByText(inputValue){
    
    // Par défaut, le résultat de recherche est égal à la liste complète des recettes
    let recipesFromSearch = recipes;

    // L'algoritme de recherche est soustractif, 
    // on va donc retirer à recipesFromSearch les éléments qui ne correspondent pas à la recherche

    // 1 - on fait une première recherche sur la liste d'ingrédients
        // const testIngredient = recipesFromSearch.filter(recipe => recipe.ingredients);
        // recipe.ingredients est le tableau de tous les ingrédients d'une recette
        // const restAfterTestIngredient = recipesFromSearch.filter(recipe => !recipe.name.includes(inputValue));
        // recipesFromSearch = testIngredient;
        // console.log(recipesFromSearch);


    // 2 - on fait une seconde recherche dans le titre, sans distinction de casse
    let inputValueForTest = inputValue.toLowerCase();
    const testName = recipesFromSearch.filter(recipe => recipe.name.toLowerCase().includes(inputValueForTest));
    const restAfterTestName = recipesFromSearch.filter(recipe => !recipe.name.toLowerCase().includes(inputValue));
    recipesFromSearch = testName;

    console.log(restAfterTestName);

    // 3 - on fait une dernière recherche dans la description


    return recipesFromSearch;
};

// On crée une fonction pour afficher les recettes, en fonction d'un Array de recettes
function displayRecipes(recipesArray){
    // On supprime le message d'alerte précédent
    // removePreviousMessageAlert();
    // On supprime les résultats en cours
    if(results.querySelector("article")){results.innerHTML = "";} 
    // Dans le cas où la recherche ne donne rien, on affiche la liste complète des recettes par défaut
    if(recipesArray.length == 0){
        recipesArray = recipes;
    }
    // Sinon on affiche les résultats correspondants
    for(let recipe of recipesArray){
        createRecipeCard(recipe);
    }
}


// On crée un écouteur sur le champ de recherche
const searchField = document.getElementById("search_main");
searchField.value = "";
searchField.addEventListener('input', function (event) {
    
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
    manageMessagesSearch(inputValue, recipesFromSearch);

});