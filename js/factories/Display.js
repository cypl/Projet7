class Display{

    static recipes(recipesArray){
        const results = document.getElementById("results");
        // On supprime les résultats en cours
        if(results.querySelector("article")){results.innerHTML = "";} 
        // Dans le cas où la recherche ne donne rien, on affiche la liste complète des recettes par défaut
        if(recipesArray.length == 0){recipesArray = recipes;}
        // Sinon on affiche les résultats correspondants
        for(let recipe of recipesArray){
            new RecipeCard(recipe.name,recipe.time,recipe.ingredients,recipe.description).create();
        }
    }

    

}