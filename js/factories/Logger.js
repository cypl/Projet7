class Logger{
    constructor(){
        this.logger = document.createElement("p");
        this.logger.classList.add("message_alert");
        messages.append(this.logger);
    }
    beforeSearch(pRecipes){ // pRecipes correspond au tableau total des recettes avant le tri.
        this.logger.innerHTML = `Les Petits Plats vous propose <strong> ${pRecipes.length} recettes</strong>, cherchez la bonne !`;
    }
    requiredSearch(){
        this.logger.innerHTML = `La recherche doit contenir au moins <strong>3 caractères.</strong>`;
    }
    successfulSearch(pExpression, pRecipesResults){
        let resultCount = pRecipesResults.length;
        if(resultCount == 1){
            this.logger.innerHTML = `Il y a <strong> ${resultCount} résultat</strong> de recherche pour <strong> ${pExpression} </strong>.`; 
        } else {
            this.logger.innerHTML = `Il y a <strong> ${resultCount} résultats</strong> de recherche pour <strong> ${pExpression} </strong>.`; 
        }
    }
    noResultsSearch(pExpression){
        this.logger.innerHTML = `Aucune recette ne correspond à <strong> ${pExpression} </strong>.`; 
    }
}