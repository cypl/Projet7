const messages = document.getElementById("messages");
const results = document.getElementById("results");


// On crée une fonction qui affiche un message par défaut, avant la recherche de l'utilisateur
// Par exemple, le nombre total de recettes que le site contient.
function printMessageBeforeSearch(){
    // On supprime le message en cours
    if(messages.querySelector("p")){messages.querySelector("p").remove();}
    // On supprime les résultats en cours
    if(results.querySelector("article")){results.innerHTML = "";} 
    const messageBeforeSearch = document.createElement("p");
    messageBeforeSearch.setAttribute("id","message-before-search");
    messageBeforeSearch.innerHTML = "Les Petits Plats vous propose <strong>" + recipes.length + " recettes</strong>, cherchez la bonne !"; 
    messages.append(messageBeforeSearch);
}
printMessageBeforeSearch();


// On crée une fonction qui affiche un message pour péciser à l'utilisateur qu'il faut saisir au moins 3 caractères dans sa recherche.
function printMessageRequiredSearch(){
    // On supprime le message en cours
    if(messages.querySelector("p")){messages.querySelector("p").remove();}
    // On supprime les résultats en cours
    if(results.querySelector("article")){results.innerHTML = "";} 
    if(!document.getElementById("message-during-search")){
        const messageDuringSearch = document.createElement("p");
        messageDuringSearch.setAttribute("id","message-during-search");
        messageDuringSearch.innerHTML = "La recherche doit contenir au moins <strong>3 caractères.</strong>"; 
        messages.append(messageDuringSearch);
    }
}


// On crée une fonction qui affiche un message d'erreur, dans le cas où aucun résultat de recherche n'existe.
function printMessageNoResultsFound(expression){
    // On supprime le message en cours
    if(messages.querySelector("p")){messages.querySelector("p").remove();}
    // On supprime les résultats en cours
    if(results.querySelector("article")){results.innerHTML = "";} 
    if(!document.getElementById("message-no-results-found")){
        const messageNoResultsFound = document.createElement("p");
        messageNoResultsFound.setAttribute("id","message-no-results-found");
        messageNoResultsFound.innerHTML = "Aucune recette ne correspond à <strong>" + `${expression}` + "</strong>."; 
        messages.append(messageNoResultsFound);
    }
}


// On crée une fonction qui génère un tableau avec les mots rentrés dans le champs de recherche, sans les caractères spéciaux
function getWordsFromExpression(expression){
    let expressionWithoutSpecialCharacters = expression.replace(/[^A-Za-z0-9_]+/g, " ");
    let wordsToFind = expressionWithoutSpecialCharacters.trim().split(" ");
    return wordsToFind; 
}


//On crée une fonction pour rechercher dans les datas ce qui peut correspondre aux lettres saisies
//La fonction retourne un tableau
function searchByText(expression){
    //On supprime le message en cours
    if(messages.querySelector("p")){messages.querySelector("p").remove();}
    //On supprime les résultats en cours
    if(results.querySelector("article")){results.innerHTML = "";} 
    
    // On crée un tableau vide, qui va stocker les résultats correspondants à la recherche
    let recipesFromSearch = [];
    
    // On peut commencer la recherche à partir d'un tableau de mots provenant de la recherche wordsFromExpression[]
    let wordsFromExpression = getWordsFromExpression(expression);
    console.log(wordsFromExpression);
    
    // Pour chaque mot…
    for(let word of wordsFromExpression){
        console.log("* " + word);
        // …on recherche dans chaque recette :
        for(let recipe of recipes){
            // Si le mot est présent dans un des titres de recipes[]…
            let recipeName = recipe.name;
            if(recipeName.includes(word)){
                console.log(recipeName);
                // On cherche l'index de la recette dans recipes[]
                let foundRecipeIndex = recipes.findIndex(x => x.name.includes(word));
                recipesFromSearch.push(recipes[foundRecipeIndex]);
            }
        }
    }
    console.log(recipesFromSearch);
    // Si recipesFromSearch[] reste vide, c'est qu'il n'y a aucun résultat correspondant à la recherche
    // Donc on affiche un message d'erreur
    if(!recipesFromSearch.length){
        printMessageNoResultsFound(expression);
    }
    // Afficher toutes les recettes
    if(expression == "***"){
        recipesFromSearch = recipes;
    }
    // On retourne le tableau recipesFromSearch[] pour pouvoir ensuite afficher les résultats avec displayRecipes();
    return recipesFromSearch;
};


// On crée une fonction pour afficher les recettes, en fonction des resultats de la recherche recipesFromSearch[]
function displayRecipes(recipesFromSearch){
    for(let recipe of recipesFromSearch){
        createRecipeCard(recipe);
    }
}


// On crée un écouteur sur le champ de recherche
const searchField = document.getElementById("search_main");
searchField.value = "";
searchField.addEventListener('input', function (event) {
    if(this.value.length < 3 && this.value.length > 0){
        printMessageRequiredSearch();
    } else if (this.value.length == 0){
        printMessageBeforeSearch();
    } else {
        displayRecipes(searchByText(this.value));
    }
});