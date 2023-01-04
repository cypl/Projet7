// On crée une fonction qui nettoie l'expression du champ de recherche, en retirant les caractères spéciaux
function cleanInputValue(expression, container){
    // on retire les caractères spéciaux de l'expression de recherche
    const regex = /[&\/\\#,+()$~%.'":*?!<>_{}`@°^¨$€£§]/g; 
    let expressionClean = expression.replace(regex, '');
    // si l'expression contient un caractère spécial, on affiche un message d'erreur
    if(expression.match(regex)){
        ToolTip.show(container, "Les caractères spéciaux <br>ne seront pas pris en compte <br>dans votre recherche.");
    } else {
        ToolTip.hide(container);
    }
    return expressionClean;
}


// Fonction pour reformatter les textes : Première en capitale, le reste en minuscule
function stringFirstLetterUppercase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}