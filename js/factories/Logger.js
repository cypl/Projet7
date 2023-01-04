class Logger{

    static init(){
        const logger = document.createElement("p");
        logger.classList.add("message_alert");
        const messages = document.getElementById("messages");
        messages.append(logger);
    }

    static beforeSearch(pRecipes){
        const logger = document.querySelector(".message_alert");
        logger.innerHTML = `Les Petits Plats vous propose <strong> ${pRecipes.length} recettes</strong>, cherchez la bonne !`;
    }

    static requiredSearch(){
        const logger = document.querySelector(".message_alert");
        logger.innerHTML = `La recherche doit contenir au moins <strong>3 caractères.</strong>`;
    }

    static successfulSearch(pExpression, pRecipesResults){
        const logger = document.querySelector(".message_alert");
        let resultCount = pRecipesResults.length;
        if(resultCount == 1){
            logger.innerHTML = `Il y a <strong> ${resultCount} résultat</strong> de recherche pour <strong> ${pExpression} </strong>.`; 
        } else {
            logger.innerHTML = `Il y a <strong> ${resultCount} résultats</strong> de recherche pour <strong> ${pExpression} </strong>.`; 
        }
    }

    static successfulSearchAndFilter(pExpression, pRecipesResults){
        const logger = document.querySelector(".message_alert");
        let resultCount = pRecipesResults.length;
        if(resultCount == 1){
            logger.innerHTML = `Il y a <strong> ${resultCount} résultat</strong> de recherche pour <strong> ${pExpression} </strong> et les filtres sélectionnés.`; 
        } else {
            logger.innerHTML = `Il y a <strong> ${resultCount} résultats</strong> de recherche pour <strong> ${pExpression} </strong> et les filtres sélectionnés.`; 
        }
    }

    static successfulFilter(pRecipesResults){
        const logger = document.querySelector(".message_alert");
        let resultCount = pRecipesResults.length;
        if(resultCount == 1){
            logger.innerHTML = `Il y a <strong> ${resultCount} résultat</strong> de recherche pour les filtres sélectionnés.`; 
        } else {
            logger.innerHTML = `Il y a <strong> ${resultCount} résultats</strong> de recherche pour les filtres sélectionnés.`; 
        }
    }

    static noResultsSearch(pExpression){
        const logger = document.querySelector(".message_alert");
        logger.innerHTML = `Aucune recette ne correspond à <strong> ${pExpression} </strong>.`; 
    }

    static noResultsFilter(){
        const logger = document.querySelector(".message_alert");
        logger.innerHTML = `Aucune recette ne correspond à votre recherche.`; 
    }

}