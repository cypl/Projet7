const TOOLTIP = new ToolTip(search);

// On crée une fonction qui nettoie l'expression du champ de recherche, en retirant les caractères spéciaux
function cleanInputValue(expression){
    // on retire les caractères spéciaux de l'expression de recherche
    const regex = /[&\/\\#,+()$~%.'":*?!<>_{}`@°^¨$€£§]/g; 
    let expressionClean = expression.replace(regex, '');
    // si l'expression contient un caractère spécial, on affiche un message d'erreur
    if(expression.match(regex)){
        TOOLTIP.showMessageError("Les caractères spéciaux <br>ne seront pas pris en compte <br>dans votre recherche.");
    } else {
        TOOLTIP.hideMessageError();
    }
    return expressionClean;
}


// Fonction pour reformatter les textes : Première en capitale, le reste en minuscule
function stringFirstLetterUppercase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}