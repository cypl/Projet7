// 1 - On récupère les données des filtres, à partir du tableau de recette en cours
// datasFilterIngredients(recipesArray);
// datasFilterAppliance(recipesArray);
// datasFilterUstensils(recipesArray);

// 2 - On peut générer une liste de tag pour chacun des filtres, en fonction des données
// generateFilterList(datasFilterCriteria, criteria);

// 3 - Ensuite, on peut afficher les filtres et leurs listes de tags
// displayFilterIngredients(recipesArray);
// displayFilterAppliance(recipesArray);
// displayFilterUstensils(recipesArray);

// 4 - On donne la possibilité de sélectionner des tags, au click, cela gènère un tableau par filtre, avec les tags sélectionnés 
// interactFilterList(criteria, filtersSelected);

// 5 - Une fois que l'on a des tags sélectionnés, on peut les afficher sous le champ de recherche
// displaySelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
//et ré-générer la nouvelle liste de résultats
// generateRecipesResults(recipesArray);

// et afficher un message --------------

// 6 - On donne la possibilité de retirer un tag sélectionné
// interactFilterSelectedList();
    // getFiltersSelectedIngredients(); 
    // getFiltersSelectedAppliance(); 
    // getFiltersSelectedUstensils();
    // generateRecipesResults(recipesArray);
    // datasFilterIngredients(recipesArray);
    // datasFilterAppliance(recipesArray);
    // datasFilterUstensils(recipesArray);
    // displayFilterIngredients(recipesArray);
    // displayFilterAppliance(recipesArray);
    // displayFilterUstensils(recipesArray);


// On crée une fonction qui récupère les données pour filtre Ingrédients, à partir du tableau de résultats de recherches
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


// On crée une fonction qui récupère les données pour filtre Appareils, à partir du tableau de résultats de recherches
function datasFilterAppliance(recipesArray){
    let datasAppliance = [];
    for(let recipe of recipesArray){
        datasAppliance.push(recipe.appliance);
    }
    // On enlève les doublons
    datasApplianceNoDuplicates = [...new Set(datasAppliance)];
    return datasApplianceNoDuplicates;
}


// On crée une fonction qui récupère les données pour filtre Ustensiles, à partir du tableau de résultats de recherches
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


// Une fois que l'on a récupéré les datas pour les 3 filtres, on peut les afficher en liste dans chacun des filtres
const filterIngredients = document.getElementById("filter_ingredients");
const filterAppliance = document.getElementById("filter_appliance");
const filterUstensils = document.getElementById("filter_ustensils");
// On va avoir besoin d'une petite fonction pour reformatter les textes (capitale, minuscules) dans la liste des critères des filtres
function stringFirstLetterUppercase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

// On crée une fonction pour constuire la liste des filtres, en fonction des données du tableau de résultat, 
// et du critère du filtre, ex : "ingredients"
// datasFilterCriteria[] est un tableau de données, criteria est juste une string
function generateFilterList(datasFilterCriteria, criteria){
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
function interactFilterList(criteria, filtersSelected){
    const filtersItems = document.getElementsByClassName("filter_list_item--" + criteria);
    for(let filtersItem of filtersItems){
        filtersItem.addEventListener('click', function (event) {
            filtersItem.classList.add("selected_filter");
            filtersSelected.push(filtersItem.textContent);
            // On affiche les filtres sélectionnés sous le champs de recherche
            displaySelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils)
            // On régénère les résultats de la recherche, et on affiche les recettes correspondantes
            const searchField = document.getElementById("search_main");
            let inputValue = cleanInputValue(searchField.value);
            const recipesResults = generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils)
            displayRecipes(recipesResults);
            removeOneSelectedFilter(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
        });
    }
}


// On crée une fonction qui va afficher les filtres sélectionnés sous le champ de recherche, sous la forme de tags cliquables
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
    for(let appliance of filtersSelectedAppliance){
        let filtersSelectedItem = document.createElement("li");
        filtersSelectedItem.classList.add("filter_item_selected");
        filtersSelectedItem.classList.add("selected_appliance");
        filtersSelectedItem.textContent = appliance;
        filtersSelectedWrapper.append(filtersSelectedItem);
    }
    for(let ustensil of filtersSelectedUstensils){
        let filtersSelectedItem = document.createElement("li");
        filtersSelectedItem.classList.add("filter_item_selected");
        filtersSelectedItem.classList.add("selected_ustensil");
        filtersSelectedItem.textContent = ustensil;
        filtersSelectedWrapper.append(filtersSelectedItem);
    }
}

// On crée une fonction pour mettre à jour le filtre, lorsque l'on dé-sélectionne un filtre
function updateFilter(filterItemSelected, filterItemsSelected, filtersSelectedType, filterListClassName){
    // S'il ne reste qu'un élément dans les filtres sélectionnés, on supprime le conteneur
    if(filterItemsSelected.length == 1){document.getElementById("filters_selected_list").remove();}
    // on recrée le tableau filtersSelectedIngredients[]
    let filtersSelectedTypeUpdated = filtersSelectedType.filter(item => !item.includes(filterItemSelected.textContent));
    filtersSelectedType.length = 0;
    for(let f of filtersSelectedTypeUpdated){filtersSelectedType.push(f);}
    // on supprime l'élément filtre sélectionné
    filterItemSelected.remove();
    // on supprime la classe CSS "selected_filter" de l'élément correspondant dans la liste du filtre
    let filterItemSelectedString = filterItemSelected.textContent;
    let filterListItem = document.getElementsByClassName(filterListClassName);
    for(let f of filterListItem){
        if(f.textContent == filterItemSelectedString){
            f.classList.remove("selected_filter");
        }
    }
}
// On crée une fonction qui permet de supprimer un filtre sélectionné, et mettre à jour les recettes
function removeOneSelectedFilter(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
    if(document.getElementById("filters_selected_list")){
        const filterItemsSelected = document.getElementsByClassName("filter_item_selected");
        for(let filterItemSelected of filterItemsSelected){
            filterItemSelected.addEventListener('click', function (event) {
                // le clic sur un filtre sélectionné déclenche la fonction updateFilter();
                if(filterItemSelected.classList.contains("selected_ingredient")){
                    updateFilter(filterItemSelected, filterItemsSelected, filtersSelectedIngredients, "filter_list_item--ingredients");
                }
                if(filterItemSelected.classList.contains("selected_appliance")){
                    updateFilter(filterItemSelected, filterItemsSelected, filtersSelectedAppliance, "filter_list_item--appliance");
                }
                if(filterItemSelected.classList.contains("selected_ustensil")){
                    updateFilter(filterItemSelected, filterItemsSelected, filtersSelectedUstensils, "filter_list_item--ustensils");
                }
                // On régénère les résultats de la recherche, et on affiche les recettes correspondantes
                const searchField = document.getElementById("search_main");
                let inputValue = cleanInputValue(searchField.value);
                const recipesResults = generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils)
                displayRecipes(recipesResults);
            });
        }
    }
}


// On crée un fonction pour supprimer tous les filtres sélectionnés
function removeAllSelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
    filtersSelectedIngredients.length = 0;
    filtersSelectedAppliance.length = 0;
    filtersSelectedUstensils.length = 0;
    displaySelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
}


// On crée un fonction pour afficher les éléments du filtre ingrédients
function displayFilterIngredients(recipesArray){
    generateFilterList(datasFilterIngredients(recipesArray), "ingredients");
    interactFilterList("ingredients", filtersSelectedIngredients);
}


// On crée un fonction pour afficher les éléments du filtre appareils
function displayFilterUstensils(recipesArray){
    generateFilterList(datasFilterAppliance(recipesArray), "appliance");
    interactFilterList("appliance", filtersSelectedAppliance);
}


// On crée un fonction pour afficher les éléments du filtre ustensiles
function displayFilterAppliance(recipesArray){
    generateFilterList(datasFilterUstensils(recipesArray), "ustensils");
    interactFilterList("ustensils", filtersSelectedUstensils);
}


// On crée une fonction pour afficher les filtres
function displayFilters(recipes){
    displayFilterIngredients(recipes);
    displayFilterAppliance(recipes);
    displayFilterUstensils(recipes);
}



// Ouvrir / ferme un filtre
const filters = document.getElementsByClassName("filter_item_label");
// Ouvrir le filtre
for(let f of filters){
    // Ouvrir un des filtres dropdown
    //f.addEventListener('click', function (event) {
    f.onclick = (event) => { 
        // Elément parent du filtre cliqué
        let filterClicked = event.target.parentNode;

        // Les autres filtres se rétrécissent pour laisser la place
        const filtersContainer = document.getElementsByClassName("filter_item");
        for(let fi of filtersContainer){
            if(fi != filterClicked){
                fi.classList.add("condensed_width");
            }
        }

        // Le filtre cliqué s'ouvre
        filterClicked.classList.add("open");
        filterClicked.childNodes[3].style.display = "none"; // label P
        filterClicked.childNodes[5].childNodes[3].style.display = "block"; // input
        

        //Fermer le filtre
        filterClicked.addEventListener("mouseleave", function( event ) {
            for(let fi of filtersContainer){
                if(fi != filterClicked){
                    fi.classList.remove("condensed_width");
                }
            }
            filterClicked.classList.remove("open");
            filterClicked.childNodes[3].style.display = "block"; // label P
            filterClicked.childNodes[5].childNodes[3].style.display = "none"; // input
        });

        // document.body.onclick = (event) => {
        //     if(!event.target.parentNode.isSameNode(filterClicked) && !event.target.classList.contains("filter_list_item")){
        //         console.log("on peut fermer");
        //         for(let fi of filtersContainer){
        //             if(fi != filterClicked){
        //                 fi.classList.remove("condensed_width");
        //             }
        //         }
        //         filterClicked.classList.remove("open");
        //         filterClicked.childNodes[3].style.display = "block"; // label P
        //         filterClicked.childNodes[5].childNodes[3].style.display = "none"; // input
        //     }
        // }
    };
}


// let clickCount = 0;
// function closeFilter(event) {
//     clickCount++;
//     console.log(clickCount);
//     const filtersContainer = document.getElementsByClassName("filter_item");
//     const filterContainerOpen = document.querySelector(".filter_item.open");
//     if(!event.target.parentNode.isSameNode(filterContainerOpen) && !event.target.classList.contains("filter_list_item")){
//         console.log("on peut fermer");
//         for(let fi of filtersContainer){
//             if(fi != filterContainerOpen){
//                 fi.classList.remove("condensed_width");
//             }
//         }
//         filterContainerOpen.classList.remove("open");
//         filterContainerOpen.childNodes[3].style.display = "block"; // label P
//         filterContainerOpen.childNodes[5].childNodes[3].style.display = "none"; // input
//     }
//     // if(clickCount == 1) {
//     //    // to remove
//     //    document.body.removeEventListener('click', closeFilter, false);
//     // }
// }

// // to add
// document.body.addEventListener('click', closeFilter);





//Fermer le filtre
// document.body.onclick = (event) => {
//     const filtersContainer = document.getElementsByClassName("filter_item");
//     const filterContainerOpen = document.querySelector(".filter_item.open");
//     // if(!event.target.parentNode.isSameNode(filterContainerOpen)){
//     //     console.log("on peut fermer");
//     // }
//     // if(!event.target.parentNode.classList.contains("open")){
//     //     console.log("on peut fermer");
//     // }
//     if(!event.target.parentNode.isSameNode(filterContainerOpen) && !event.target.classList.contains("filter_list_item")){
//         console.log("on peut fermer");
//         for(let fi of filtersContainer){
//             if(fi != filterContainerOpen){
//                 fi.classList.remove("condensed_width");
//             }
//         }
//         filterContainerOpen.classList.remove("open");
//         filterContainerOpen.childNodes[3].style.display = "block"; // label P
//         filterContainerOpen.childNodes[5].childNodes[3].style.display = "none"; // input
//     }
// }