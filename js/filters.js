// On crée une fonction qui récupère les données du filtre Ingrédients
function datasFilterIngredients(recipesArray){
    let datasIngredients = [];
    for(let recipe of recipesArray){
        let listIngredients = recipe.ingredients;
        for(let ingredient of listIngredients){
            let ingredientItem = ingredient.ingredient;
            // ingredientItem = ingredientItem.toLowerCase();
            datasIngredients.push(ingredientItem);
        }
    }
    // On enlève les doublons
    datasIngredientsNoDuplicates = [...new Set(datasIngredients)];
    return datasIngredientsNoDuplicates;
}


// On crée une fonction qui récupère les données du filtre Appareil
function datasFilterAppliance(recipesArray){
    let datasAppliance = [];
    for(let recipe of recipesArray){
        datasAppliance.push(recipe.appliance);
    }
    // On enlève les doublons
    datasApplianceNoDuplicates = [...new Set(datasAppliance)];
    return datasApplianceNoDuplicates;
}


// On crée une fonction qui récupère les données du filtre Ustensiles
function datasFilterUstensils(recipesArray){
    let datasUtensils = [];
    for(let recipe of recipesArray){
        let listUtensils = recipe.ustensils;
        for(let ustensil of listUtensils){
            datasUtensils.push(ustensil);
        }
    }
    // On enlève les doublons
    datasUtensilsNoDuplicates = [...new Set(datasUtensils)];
    return datasUtensilsNoDuplicates;
}

// Une fois que l'on a récupéré les datas pour les 3 filtres, on peut les afficher dans l'UI

const filterIngredients = document.getElementById("filter_ingredients");
const filterAppliance = document.getElementById("filter_appliance");
const filterUstensils = document.getElementById("filter_ustensils");

function stringFirstLetterUppercase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
// On crée un fonction pour afficher les éléments du filtre ingrédients
function displayFilterIngredients(recipesArray){
    if(document.getElementById("ingredients_list")){document.getElementById("ingredients_list").remove();}
    const filterIngredientsList = document.createElement("ul");
    filterIngredientsList.setAttribute("id","ingredients_list");
    filterIngredientsList.classList.add("filter_list");
    filterIngredients.append(filterIngredientsList);
    let datasIngredients = datasFilterIngredients(recipesArray);
    for(let data of datasIngredients){
        let dataIngredientItem = document.createElement("li");
        dataIngredientItem.classList.add("ingredient_item");
        dataIngredientItem.classList.add("filter_list_item");
        dataIngredientItem.textContent = stringFirstLetterUppercase(data);
        filterIngredientsList.append(dataIngredientItem);
    }
}


// On crée un fonction pour afficher les éléments du filtre appareils
function displayFilterAppliance(recipesArray){
    if(document.getElementById("appliance_list")){document.getElementById("appliance_list").remove();}
    const filterApplianceList = document.createElement("ul");
    filterApplianceList.setAttribute("id","appliance_list");
    filterApplianceList.classList.add("filter_list");
    filterAppliance.append(filterApplianceList);
    let datasAppliance = datasFilterAppliance(recipesArray);
    for(let data of datasAppliance){
        let dataApplianceItem = document.createElement("li");
        dataApplianceItem.classList.add("appliance_item");
        dataApplianceItem.classList.add("filter_list_item");
        dataApplianceItem.textContent = stringFirstLetterUppercase(data);
        filterApplianceList.append(dataApplianceItem);
    }
}


// On crée un fonction pour afficher les éléments du filtre ustensiles
function displayFilterUstensils(recipesArray){
    if(document.getElementById("ustensils_list")){document.getElementById("ustensils_list").remove();}
    const filterUstensilsList = document.createElement("ul");
    filterUstensilsList.setAttribute("id","ustensils_list");
    filterUstensilsList.classList.add("filter_list");
    filterUstensils.append(filterUstensilsList);
    let datasUstensils = datasFilterUstensils(recipesArray);
    for(let data of datasUstensils){
        let dataUstensilItem = document.createElement("li");
        dataUstensilItem.classList.add("ustensil_item");
        dataUstensilItem.classList.add("filter_list_item");
        dataUstensilItem.textContent = stringFirstLetterUppercase(data);
        filterUstensilsList.append(dataUstensilItem);
    }
}


function displayFilters(recipes){
    displayFilterIngredients(recipes);
    displayFilterAppliance(recipes);
    displayFilterUstensils(recipes);
}




const filters = document.getElementsByClassName("filter_item_label");
// Ouvrir le filtre
for(let f of filters){
    // Ouvrir un des onglets du filtre
    f.addEventListener('click', function (event) {
        // S'il y a un autre filtre déjà ouvert, on le ferme
        for(let f of filters){
            if(f.parentNode.classList.contains("open")){
                let filterOther = f.parentNode;
                filterOther.classList.remove("open");
                filterOther.childNodes[3].style.display = "block"; // label P
                filterOther.childNodes[5].childNodes[3].style.display = "none"; // input
            }
        }
        let filterClicked = event.target.parentNode;
        filterClicked.classList.add("open");
        filterClicked.childNodes[3].style.display = "none"; // label P
        filterClicked.childNodes[5].childNodes[3].style.display = "block"; // input


        // if(event.target.parentNode.classList.contains("open")){
        //     event.target.parentNode.classList.remove("open");
        // }
        // event.target.addEventListener('click', function (event) {
        //     event.target.parentNode.classList.remove("open");
        // });
    });
}
// Fermer le filtre

// .filter_item.open
// .filter_item.open .filter_list
