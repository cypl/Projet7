// On crée une fonction qui récupère les données pour filtre Ingrédients, à partir du tableau de résultats de recherches
function datasFilterIngredients(recipes){
    let datasIngredients = [];
    for(let recipe of recipes){
        let listIngredients = recipe.ingredients;
        for(let ingredient of listIngredients){
            let ingredientItem = ingredient.ingredient;
            ingredientItem = ingredientItem.toLowerCase();
            datasIngredients.push(ingredientItem);
        }
    }
    // On enlève les doublons
    datasIngredientsNoDuplicates = [...new Set(datasIngredients)].sort(function (a, b) {
        return a.localeCompare(b);
      }); // sort() permet de classer par ordre alphabétique, et la localeCompare() de tenir compte des caractères accentués
    return datasIngredientsNoDuplicates;
}


// On crée une fonction qui récupère les données pour filtre Appareils, à partir du tableau de résultats de recherches
function datasFilterAppliance(recipes){
    let datasAppliance = [];
    for(let recipe of recipes){
        datasAppliance.push(recipe.appliance);
    }
    // On enlève les doublons
    datasApplianceNoDuplicates = [...new Set(datasAppliance)].sort(function (a, b) {
        return a.localeCompare(b);
      }); // sort() permet de classer par ordre alphabétique, et la localeCompare() de tenir compte des caractères accentués
    return datasApplianceNoDuplicates;
}


// On crée une fonction qui récupère les données pour filtre Ustensiles, à partir du tableau de résultats de recherches
function datasFilterUstensils(recipes){
    let datasUtensils = [];
    for(let recipe of recipes){
        let listUtensils = recipe.ustensils;
        for(let ustensil of listUtensils){
            ustensilItem = ustensil.toLowerCase();
            datasUtensils.push(ustensilItem);
        }
    }
    // On enlève les doublons
    datasUtensilsNoDuplicates = [...new Set(datasUtensils)].sort(function (a, b) {
        return a.localeCompare(b);
      }); // sort() permet de classer par ordre alphabétique, et la localeCompare() de tenir compte des caractères accentués
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
    const filterWrapper = document.getElementById("filter_" + criteria);
    filterWrapper.append(new FilterItemsList(criteria).createFilterItemsList());
    // on ajoute les différents items du filtre, en fonction des données du tableau
    let filterItemsData = datasFilterCriteria;
    for(let data of filterItemsData){
        const filterCriteriaList = document.getElementById(criteria + "_list");
        filterCriteriaList.append(new FilterItem(data, criteria).createFilterItem());
    }
}


// On crée une fonction pour mettre à jour la liste des filters, quand certains sont déjà sélectionnés
function updateFilterList(datasFilterCriteria, filtersSelectedCriteria, criteria){
    // on supprime les éléments qui pourrait rester d'un chargement précédent
    if(document.getElementById(criteria + "_list")){document.getElementById(criteria + "_list").remove();}
    // on construit le filtre
    const filterWrapper = document.getElementById("filter_" + criteria);
    filterWrapper.append(new FilterItemsList(criteria).createFilterItemsList());
    // on ajoute les différents items du filtre, en fonction des données du tableau
    let filterItemsData = datasFilterCriteria;
    for(let data of filterItemsData){
        const filterCriteriaList = document.getElementById(criteria + "_list");
        filterCriteriaList.append(new FilterItem(data, criteria).createFilterItemForUpdate(filtersSelectedCriteria));
    }
}
function updateFiltersList(recipes, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
    updateFilterList(datasFilterIngredients(recipes), filtersSelectedIngredients, "ingredients");
    updateFilterList(datasFilterAppliance(recipes), filtersSelectedAppliance, "appliance");
    updateFilterList(datasFilterUstensils(recipes), filtersSelectedUstensils, "ustensils");
}


// On crée une fonction qui gère l'intéractivité sur les éléments du filtre
// On crée 3 tableaux, qui vont stocker les filtres sélectionnés
let filtersSelectedIngredients = []
let filtersSelectedAppliance = []
let filtersSelectedUstensils = []


// On crée un fonction pour afficher les éléments du filtre ingrédients
function displayFilterIngredients(recipes){
    generateFilterList(datasFilterIngredients(recipes), "ingredients");
}


// On crée un fonction pour afficher les éléments du filtre appareils
function displayFilterUstensils(recipes){
    generateFilterList(datasFilterAppliance(recipes), "appliance");
}


// On crée un fonction pour afficher les éléments du filtre ustensiles
function displayFilterAppliance(recipes){
    generateFilterList(datasFilterUstensils(recipes), "ustensils");
}


// On crée une fonction pour afficher les filtres
function displayFilters(recipes){
    displayFilterIngredients(recipes);
    displayFilterAppliance(recipes);
    displayFilterUstensils(recipes);
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
        filtersSelectedWrapper.append(new SelectedFilter(ingredient, "selected_ingredient").createSelectedFilter());
    }
    for(let appliance of filtersSelectedAppliance){
        filtersSelectedWrapper.append(new SelectedFilter(appliance, "selected_appliance").createSelectedFilter());
    }
    for(let ustensil of filtersSelectedUstensils){
        filtersSelectedWrapper.append(new SelectedFilter(ustensil, "selected_ustensil").createSelectedFilter());
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

// On crée un fonction pour supprimer tous les filtres sélectionnés
function removeAllSelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils){
    filtersSelectedIngredients.length = 0;
    filtersSelectedAppliance.length = 0;
    filtersSelectedUstensils.length = 0;
    displaySelectedFilters(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
}



// Ouvrir / ferme un dropdown filtre
const filters = document.getElementsByClassName("filter_item_label");
// Ouvrir le filtre
for(let f of filters){
    // Ouvrir un des filtres dropdown
    f.onclick = (event) => { 
        // Elément parent du filtre cliqué
        let filterClicked = event.target.parentNode;
        // Les autres filtres se rétrécissent pour laisser de la place
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
    };
}