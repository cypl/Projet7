const messages = document.getElementById("messages");
const results = document.getElementById("results");

// On crée une fonction qui affiche un message par défaut, avant la recherche de l'utilisateur
// Par exemple, le nombre total de recettes que le site contient.
function printMessageBeforeSearch(){
    //On supprime le message en cours
    if(messages.querySelector("p")){messages.querySelector("p").remove();}
    //On supprime les résultats en cours
    if(results.querySelector("article")){results.innerHTML = "";} 
    const messageBeforeSearch = document.createElement("p");
    messageBeforeSearch.setAttribute("id","message-before-search");
    messageBeforeSearch.innerHTML = "Les Petits Plats vous propose <strong>" + recipes.length + " recettes</strong>, cherchez la bonne !"; 
    messages.append(messageBeforeSearch);
}
printMessageBeforeSearch();

// On crée une fonction qui affiche un message pour péciser à l'utilisateur qu'il faut saisir au moins 3 caractères dans sa recherche.
function printMessageRequiredSearch(){
    //On supprime le message en cours
    if(messages.querySelector("p")){messages.querySelector("p").remove();}
    //On supprime les résultats en cours
    if(results.querySelector("article")){results.innerHTML = "";} 
    if(!document.getElementById("message-during-search")){
        const messageDuringSearch = document.createElement("p");
        messageDuringSearch.setAttribute("id","message-during-search");
        messageDuringSearch.innerHTML = "La recherche doit contenir au moins <strong>3 caractères.</strong>"; 
        messages.append(messageDuringSearch);
    }
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
    
    //Si l'expression est présente dans les titres, ajouter ces objets au tableau
    // for(let r of recipes){
    //     if(r.title contains expression){
    //         r.push(recipesFromSearch);
    //     } else {
    //         print error message;
    //     }
    // }
    if(expression == "***"){
        recipesFromSearch = recipes;
    }
    
    return recipesFromSearch;
};

// On crée une fonction pour afficher les recettes, en fonction des resultats de la recherche
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
        //searchByText(this.value);
        displayRecipes(searchByText(this.value));
    }
});