const search = document.getElementById("search");
const messages = document.getElementById("messages");
const results = document.getElementById("results");


// On crée une fonction qui affiche un message par défaut, avant la recherche de l'utilisateur
// Par exemple, le nombre total de recettes que le site contient.
function printMessageBeforeSearch(){
    // On supprime le message d'alerte précédent
    removePreviousMessageAlert();
    const messageBeforeSearch = document.createElement("p");
    messageBeforeSearch.setAttribute("id","message-before-search");
    messageBeforeSearch.classList.add("message_alert");
    messageBeforeSearch.innerHTML = "Les Petits Plats vous propose <strong>" + recipes.length + " recettes</strong>, cherchez la bonne !"; 
    messages.append(messageBeforeSearch);
}


// On crée une fonction qui affiche un message pour péciser à l'utilisateur qu'il faut saisir au moins 3 caractères dans sa recherche.
function printMessageRequiredSearch(){
    // On supprime le message d'alerte précédent
    removePreviousMessageAlert();
    if(!document.getElementById("message-during-search")){
        const messageRequiredSearch = document.createElement("p");
        messageRequiredSearch.setAttribute("id","message-during-search");
        messageRequiredSearch.classList.add("message_alert");
        messageRequiredSearch.innerHTML = "La recherche doit contenir au moins <strong>3 caractères.</strong>"; 
        messages.append(messageRequiredSearch);
    }
}


// On crée une fonction qui affiche un message pour péciser à l'utilisateur le nombre de résultats obtenus avec la recherche.
function printMessageSuccessfulSearch(expression, recipesArray){
    // On supprime le message d'alerte précédent
    removePreviousMessageAlert();
    if(!document.getElementById("message-successful-search")){
        const messageSuccessfulSearch = document.createElement("p");
        messageSuccessfulSearch.setAttribute("id","message-successful-search");
        messageSuccessfulSearch.classList.add("message_alert");
        let resultCount = recipesArray.length;
        if(resultCount == 1){
            messageSuccessfulSearch.innerHTML = "Il y a <strong>" + `${resultCount}` + " résultat</strong> de recherche pour <strong>" + `${expression}` + "</strong>."; 
        } else {
            messageSuccessfulSearch.innerHTML = "Il y a <strong>" + `${resultCount}` + " résultats</strong> de recherche pour <strong>" + `${expression}` + "</strong>."; 
        }
        messages.append(messageSuccessfulSearch);
    }
}


// On crée une fonction qui affiche un message d'erreur, dans le cas où aucun résultat de recherche n'existe.
function printMessageNoResultsFound(expression){
    // On supprime le message d'alerte précédent
    removePreviousMessageAlert();
    if(!document.getElementById("message-no-results-found")){
        const messageNoResultsFound = document.createElement("p");
        messageNoResultsFound.setAttribute("id","message-no-results-found");
        messageNoResultsFound.classList.add("message_alert");
        messageNoResultsFound.innerHTML = "Aucune recette ne correspond à <strong>" + `${expression}` + "</strong>."; 
        messages.append(messageNoResultsFound);
    }
}


// On crée une fonction qui affiche un message d'erreur, dans le cas où l'utilisateur a saisi un caractère spécial dans sa recherche.
function printMessageErrorExpression(){
    if(!document.getElementById("message-error-expression__wrapper")){
        let errorMessageWrapper = document.createElement("div");
        errorMessageWrapper.setAttribute("id","message-error-expression__wrapper");
        errorMessageWrapper.classList.add("popIn");
        let errorMessage = document.createElement("p");
        errorMessage.setAttribute("id","message-error-expression");
        errorMessage.innerHTML = '<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M32 64C14.3 64 0 49.7 0 32S14.3 0 32 0l96 0c53 0 96 43 96 96l0 306.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 402.7 160 96c0-17.7-14.3-32-32-32L32 64z"/></svg></i> Les caractères spéciaux <br>ne seront pas pris en compte <br>dans votre recherche.';
        errorMessageWrapper.append(errorMessage);
        search.prepend(errorMessageWrapper);
    }
}
function removeMessageErrorExpression(){
    if(document.getElementById("message-error-expression__wrapper")){
        let errorMessageWrapper = document.getElementById("message-error-expression__wrapper");
        errorMessageWrapper.classList.remove("popIn");
        errorMessageWrapper.classList.add("popOut");
        setTimeout(function(){
            document.getElementById("message-error-expression__wrapper").remove();
        }, 250);
    }
}


// On crée une fonction pour supprimer le message d'erreur précédent
function removePreviousMessageAlert(){
    if(messages.querySelector(".message_alert")){messages.querySelector(".message_alert").remove();}
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