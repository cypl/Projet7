class RecipeCard {
    constructor(title, time, ingredients, description){
        this.title = title;
        this.time = time;
        this.ingredients = ingredients;
        this.description = description;
    }
    createCard(){
        const recipeCard = document.createElement("article");
        recipeCard.classList.add("recipe__card");
        //image
        const recipeImage = document.createElement("figure");
        recipeImage.classList.add("recipe__image");
        recipeCard.append(recipeImage);
        //infos        
        const recipeInfosWrapper = document.createElement("div");
        recipeInfosWrapper.classList.add("recipe__infos_wrapper");
        recipeCard.append(recipeInfosWrapper);
        //header
        const recipeHeader = document.createElement("header");
        recipeHeader.classList.add("recipe__header");
            //title
            const recipeTitle = document.createElement("h3");
            recipeTitle.classList.add("recipe__title");
            recipeTitle.textContent = this.title;
            recipeHeader.append(recipeTitle);
            //time
            const recipeTime = document.createElement("p");
            recipeTime.classList.add("recipe__time");
            recipeTime.innerHTML = '<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg></i>' + this.time + " min";
            recipeHeader.append(recipeTime);
        recipeInfosWrapper.append(recipeHeader);
        //content
        const recipeContent = document.createElement("div");
        recipeContent.classList.add("recipe__content");
        const recipeIngredients = document.createElement("div");
        recipeIngredients.classList.add("recipe__ingredients");
        const recipeDescription = document.createElement("div");
        recipeDescription.classList.add("recipe__description");
        const recipeDescriptionP = document.createElement("p");
        //ingredients
        const recipeIngredientsArray = this.ingredients;
        const ingredientsList = document.createElement("ul"); //div
        ingredientsList.classList.add("ingredients_list");
        for(let i of recipeIngredientsArray){
            const ingredientsListItem = document.createElement("li");
            const ingredientName = document.createElement("strong");
            const ingredientQuantity = document.createElement("span");
            if(i.quantity){
                ingredientName.innerHTML = `${i.ingredient}` + " : ";
            } else {
                ingredientName.innerHTML = `${i.ingredient}`;
            }
            if(i.quantity && i.unit){
                ingredientQuantity.innerHTML = `${i.quantity}` + " " + `${i.unit}`;
            } else if (i.quantity) {
                ingredientQuantity.innerHTML = `${i.quantity}`;
            } else {} //pas de quantité ni d'unité
            ingredientsListItem.append(ingredientName);
            ingredientsListItem.append(ingredientQuantity);
            ingredientsList.append(ingredientsListItem);
        }
        recipeIngredients.append(ingredientsList);
        //description
        const maxCharacters = 120;
        let descriptionString = this.description;
        descriptionString = descriptionString.substring(0,maxCharacters);
        descriptionString = descriptionString.substring(0, descriptionString.lastIndexOf(' ')); // Pour que la chaîne de caractère ne contienne que des mots entiers
        descriptionString = descriptionString + "…";
        recipeDescriptionP.textContent = descriptionString;
        recipeDescription.append(recipeDescriptionP);

        recipeContent.append(recipeIngredients);
        recipeContent.append(recipeDescription);
        recipeInfosWrapper.append(recipeContent);
        
        results.append(recipeCard);
    }
}