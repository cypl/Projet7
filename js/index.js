const search = document.getElementById("search");
const messages = document.getElementById("messages");
const results = document.getElementById("results");



const LOGGER = new Logger();

// On crée une fonction qui affiche un message par défaut, avant la recherche de l'utilisateur
// Par exemple, le nombre total de recettes que le site contient.
function printMessageBeforeSearch(){
    LOGGER.beforeSearch(recipes);
}

// On crée une fonction qui affiche un message pour péciser à l'utilisateur qu'il faut saisir au moins 3 caractères dans sa recherche.
function printMessageRequiredSearch(){
    LOGGER.requiredSearch();
}

// On crée une fonction qui affiche un message pour péciser à l'utilisateur le nombre de résultats obtenus avec la recherche.
function printMessageSuccessfulSearch(expression, recipesArray){
    LOGGER.successfulSearch(expression, recipesArray);
}

// On crée une fonction qui affiche un message d'erreur, dans le cas où aucun résultat de recherche n'existe.
function printMessageNoResultsFound(expression){
    LOGGER.noResultsSearch(expression);
}



const TOOLTIP = new ToolTip(search);

// On crée une fonction qui affiche un message d'erreur, dans le cas où l'utilisateur a saisi un caractère spécial dans sa recherche.
function printMessageErrorExpression(){
    TOOLTIP.showMessageError("Les caractères spéciaux <br>ne seront pas pris en compte <br>dans votre recherche.");
}
function removeMessageErrorExpression(){
    TOOLTIP.hideMessageError();
}



// On crée une fonction pour gérer ces messages d'erreur
function manageMessagesFromSearch(inputValue, recipesArray){
    // Si l'utilisateur n'a rien écrit
    if(inputValue.length == 0){
        printMessageBeforeSearch();
    }
    // Si l'utilisateur a écrit un texte trop court
    if(inputValue.length < 3 && inputValue.length > 0){
        printMessageRequiredSearch();
    }
    // Si l'utilisateur a écrit un texte assez long
    if(inputValue.length >= 3){ // si l'input contient plus de 3 caractères
        if(searchByText(inputValue).length > 0){ // si le tableau de résultats de recherche contient quelquechose
            printMessageSuccessfulSearch(inputValue, recipesArray);
        }else {
            printMessageNoResultsFound(inputValue);
        }
    }
}


// On crée une fonction pour afficher la liste complète des recettes, un message au chargement de la page et les filtres
function onInitialPageLoad(){
    displayRecipes(recipes);
    printMessageBeforeSearch();
    displayFilters(recipes);
}
onInitialPageLoad();