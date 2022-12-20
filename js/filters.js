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

// On va avoir besoin d'une petite fonction pour reformatter les textes (capitale, minuscules) dans la liste des critères des filtres
function stringFirstLetterUppercase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

// On crée une fonction pour constuire la liste des filtres, en fonction des données du tableau de résultat, 
// et du critère du filtre, ex : "ingredients"
function buildFilterList(recipesArray, datasFilterCriteria, criteria){
    // on supprime les éléments qui pourrait rester d'un chargement précédent
    if(document.getElementById(criteria + "_list")){document.getElementById(criteria + "_list").remove();}
    // on construit le filtre
    const filterCriteriaList = document.createElement("ul");
    filterCriteriaList.setAttribute("id", criteria + "_list");
    filterCriteriaList.classList.add("filter_list");
    const filterWrapper = document.getElementById("filter_" + criteria);
    filterWrapper.append(filterCriteriaList);
    // on ajoute les différents items du filtre, en fonction des données du tableau recipesArray[]
    let filterItemsData = datasFilterCriteria;
    for(let data of filterItemsData){
        let filterItem = document.createElement("li");
        filterItem.classList.add("ingredient_item");
        filterItem.classList.add("filter_list_item");
        filterItem.classList.add("filter_list_item--" + criteria);
        filterItem.textContent = stringFirstLetterUppercase(data);
        filterCriteriaList.append(filterItem);
    }
}


// On crée une fonction qui gère l'intéractivité sur les éléments du filtre
// On crée 3 tableaux, qui vont stocker les filtres sélectionnés
let filtersSelectedIngredients = []
let filtersSelectedAppliance = []
let filtersSelectedUstensils = []
function manageFilterList(criteria, filtersSelected){
    const filtersItems = document.getElementsByClassName("filter_list_item--" + criteria);
    for(let filtersItem of filtersItems){
        filtersItem.addEventListener('click', function (event) {
            filtersItem.classList.add("selected_filter");
            filtersSelected.push(filtersItem.textContent);
            console.log(filtersSelected);
            displaySelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils)
        });
    }
}


// On crée un fonction pour afficher les éléments du filtre ingrédients
function displayFilterIngredients(recipesArray){
    buildFilterList(recipesArray, datasFilterIngredients(recipesArray), "ingredients");
    manageFilterList("ingredients", filtersSelectedIngredients);
}


// On crée un fonction pour afficher les éléments du filtre appareils
function displayFilterAppliance(recipesArray){
    buildFilterList(recipesArray, datasFilterUstensils(recipesArray), "ustensils");
    manageFilterList("ustensils", filtersSelectedAppliance);
}


// On crée un fonction pour afficher les éléments du filtre ustensiles
function displayFilterUstensils(recipesArray){
    buildFilterList(recipesArray, datasFilterAppliance(recipesArray), "appliance");
    manageFilterList("appliance", filtersSelectedUstensils);
}


// On crée une fonction pour afficher les filtres
function displayFilters(recipes){
    displayFilterIngredients(recipes);
    displayFilterAppliance(recipes);
    displayFilterUstensils(recipes);
}

// On crée une fonction qui va afficher les filtres sélectionnés sous le champ de recherche, sous la forme de tags
function displaySelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
    if(document.getElementById("filters_selected_list")){
        document.getElementById("filters_selected_list").remove();
    }
    const filtersWrapper = document.getElementById("filters");
    const filtersSelectedWrapper = document.createElement("ul");
    filtersSelectedWrapper.setAttribute("id","filters_selected_list");
    filtersWrapper.prepend(filtersSelectedWrapper);
    for(let ingredient of filtersSelectedIngredients){
        let filtersSelectedItem = document.createElement("li");
        filtersSelectedItem.classList.add("filter_item_selected");
        filtersSelectedItem.classList.add("selected_ingredient");
        filtersSelectedItem.textContent = ingredient;
        filtersSelectedWrapper.append(filtersSelectedItem);
    }
    for(let ustensil of filtersSelectedUstensils){
        let filtersSelectedItem = document.createElement("li");
        filtersSelectedItem.classList.add("filter_item_selected");
        filtersSelectedItem.classList.add("selected_appliance");
        filtersSelectedItem.textContent = ustensil;
        filtersSelectedWrapper.append(filtersSelectedItem);
    }
    for(let appliance of filtersSelectedAppliance){
        let filtersSelectedItem = document.createElement("li");
        filtersSelectedItem.classList.add("filter_item_selected");
        filtersSelectedItem.classList.add("selected_ustensil");
        filtersSelectedItem.textContent = appliance;
        filtersSelectedWrapper.append(filtersSelectedItem);
    }
}



const filters = document.getElementsByClassName("filter_item_label");
// Ouvrir le filtre
for(let f of filters){
    // Ouvrir un des onglets du filtre
    f.addEventListener('click', function (event) {
        // S'il y a un autre filtre déjà ouvert, on le ferme
        // for(let f of filters){
        //     if(f.parentNode.classList.contains("open")){
        //         let filterOther = f.parentNode;
        //         filterOther.classList.remove("open");
        //         filterOther.childNodes[3].style.display = "block"; // label P
        //         filterOther.childNodes[5].childNodes[3].style.display = "none"; // input
        //     }
        // }

        //Ouvrir
        let filterClicked = event.target.parentNode;
        filterClicked.classList.add("open");
        filterClicked.childNodes[3].style.display = "none"; // label P
        filterClicked.childNodes[5].childNodes[3].style.display = "block"; // input
        //Fermer
        filterClicked.addEventListener("mouseleave", function( event ) {
            filterClicked.classList.remove("open");
            filterClicked.childNodes[3].style.display = "block"; // label P
            filterClicked.childNodes[5].childNodes[3].style.display = "none"; // input
        });

    });
}