function initEventsListeners(){

// Quand on rentre une lettre dans la barre de recherche :
// On supprime les filtres déjà sélectionnés (s'il y en a)
// On génère les résultats (tableau)
// On génère les filtres disponibles, liés aux résultats
// On génère les fiches liées aux résultats
// On affiche le logger en conséquence du résultat

const searchField = document.getElementById("search_main");
searchField.value = "";
searchField.addEventListener('input', function (event) {
    // On supprime les tags déjà sélectionnés
    Filters.removeAll(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    // On génère les résultats (si plus de 3 caractères)
    let inputValue = cleanInputValue(this.value, document.getElementById("search")); // expression 
    let recipesResults = generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    // On met à jour les listes de filtres disponibles en fonction des résultats
    if(recipesResults.length > 0){
        Display.filters(recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    } else {
        Display.filters(recipes, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    }
    const filtersItems = document.getElementsByClassName("filter_list_item");
    for(let filtersItem of filtersItems){
        filtersItem.addEventListener('click', addTagHandler);
    }
    // On génère les fiches liées aux résultats
    Display.recipes(recipesResults);
    // On affiche le logger en conséquence du résultat
    Display.logger(inputValue, recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
});



// Quand on ajoute un filtre :
// On ajoute le filtre sélectionné sous la barre de recherche
// On génère les résultats (tableau)
// On met à jour les listes de filtres disponibles en fonction des résultats
// On génère les fiches liées aux résultats
// On affiche le message en conséquence du résultat
// On donne la possibilité de déselectionner un filtre 

function addTagHandler(event){
    event.target.classList.add("selected_filter");
    // On ajoute l'élément cliqué au tableau correspondant : filtersSelectedIngredients[],…
    if(event.target.classList.contains("filter_list_item--ingredients")){
        filtersSelectedIngredients.push(this.textContent);
    }
    if(event.target.classList.contains("filter_list_item--appliance")){
        filtersSelectedAppliance.push(this.textContent);
    }
    if(event.target.classList.contains("filter_list_item--ustensils")){
        filtersSelectedUstensils.push(this.textContent);
    }
    // On ajoute le filtre sélectionné sous la barre de recherche
    Display.selectedTags(filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    // On génère les résultats (tableau)
    const searchField = document.getElementById("search_main");
    let inputValue = cleanInputValue(searchField.value, document.getElementById("search")); // expression
    let recipesResults = generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils)
    // On met à jour les listes de filtres disponibles en fonction des résultats
    setTimeout(function(){
        Display.filters(recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
        const filtersItems = document.getElementsByClassName("filter_list_item");
        for(let filtersItem of filtersItems){
            filtersItem.addEventListener('click', addTagHandler);
        }
    }, 700); // 700ms permettent de voir l'animation CSS, et de comprendre qu'il y a une mise à jour de la liste de tags dans le filtre
    // On génère les fiches liées aux résultats
    Display.recipes(recipesResults);
    // On affiche le logger en conséquence du résultat
    Display.logger(inputValue, recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    // On donne la possibilité de déselectionner un filtre 
    const filtersSelectedItems = document.getElementsByClassName("filter_item_selected");
    if(filtersSelectedItems){
        for(let filtersSelectedItem of filtersSelectedItems){
            filtersSelectedItem.addEventListener('click', removeTagHandler);
        }
    }

}

const filtersItems = document.getElementsByClassName("filter_list_item");
if(filtersItems){
    for(let filtersItem of filtersItems){
        filtersItem.addEventListener('click', addTagHandler);
    }    
}



// Quand on retire un filtre :
// On génère les résultats (tableau)
// On retire le filtre sélectionné sous la barre de recherche
// On génère les filtres disponibles liés résultats
// On génère les fiches liées aux résultats
// On affiche le message en conséquence du résultat

function removeTagHandler(event){
    // On retire le filtre sélectionné sous la barre de recherche
    // le clic sur un filtre sélectionné déclenche la fonction updateFilter();
    const filtersSelectedItems = document.getElementsByClassName("filter_item_selected");
    if(filtersSelectedItems){
        // On met à jour les arrays de tags sélectionnés
        Filters.updateSelections(event.target, filtersSelectedItems, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils)
        // On supprime l'élément cliqué
        event.target.remove();
        // On régénère les résultats de la recherche, et on affiche les recettes correspondantes
        const searchField = document.getElementById("search_main");
        let inputValue = cleanInputValue(searchField.value, document.getElementById("search")); // expression
        const recipesResults = generateRecipesResults(inputValue, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
        // On met à jour les listes de filtres disponibles en fonction des résultats
        setTimeout(function(){
            if(recipesResults.length > 0){
                Display.filters(recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
            } else {
                Display.filters(recipes, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
            }
            const filtersItems = document.getElementsByClassName("filter_list_item");
            for(let filtersItem of filtersItems){
                filtersItem.addEventListener('click', addTagHandler);
            }
        }, 700); // 700ms permettent de voir l'animation CSS, et de comprendre qu'il y a une mise à jour de la liste de tags dans le filtre
        // On génère les fiches liées aux résultats
        Display.recipes(recipesResults);
        // On affiche le logger en conséquence du résultat
        Display.logger(inputValue, recipesResults, filtersSelectedIngredients, filtersSelectedAppliance, filtersSelectedUstensils);
    }
}


// On peut rechercher des tags, dans les dropdowns
const filterDropDownFields = document.getElementsByClassName("filter_item_form__input");
for(let i of filterDropDownFields){
    i.addEventListener('input', function(event){
        if(i.getAttribute("id") === "search_ingredient"){
            searchInDropDown("search_ingredient", "filter_list_item--ingredients", "ingredients_list");
        }
        if(i.getAttribute("id") === "search_appliance"){
            searchInDropDown("search_appliance", "filter_list_item--appliance", "appliance_list");
        }
        if(i.getAttribute("id") === "search_ustensils"){
            searchInDropDown("search_ustensils", "filter_list_item--ustensils", "ustensils_list");
        }
    });
}


function searchInDropDown(field, listItems, listItemsWrapper){ //"search_ingredient", "filter_list_item--ingredients", "ingredients_list"
    let filterDropDownField = document.getElementById(field);
    let filterDropDownFieldContainer = filterDropDownField.parentNode.parentNode;
    let filterSearchListItems = document.getElementsByClassName(listItems);
    let filterSearchFieldValue = cleanInputValue(filterDropDownField.value, filterDropDownFieldContainer);
    let filterListArray = [];
    for(let i of filterSearchListItems){
        filterListArray.push(i.textContent);
    }
    let filterListArrayResult = filterListArray.filter(i => i.includes(filterSearchFieldValue));
    for(let i of filterSearchListItems){
        if(filterListArrayResult.includes(i.textContent)){
            i.style.display = 'block';
        }else{
            i.style.display = 'none';
        }
    }
    // Aucun résultat
    if(!filterListArrayResult.length){
        if(!document.getElementById("no_result_filter_" + listItemsWrapper)){
            let noResultFilterDropdown = document.createElement("li");
            noResultFilterDropdown.setAttribute("id","no_result_filter_" + listItemsWrapper);
            noResultFilterDropdown.style.fontWeight = "400";
            noResultFilterDropdown.style.marginTop = "0.5rem";
            noResultFilterDropdown.textContent = "Aucun résultat disponible.";
            const filterSearchListWrapper = document.getElementById(listItemsWrapper);
            filterSearchListWrapper.append(noResultFilterDropdown);
        }
    }else{
        if(document.getElementById("no_result_filter_" + listItemsWrapper)){
            document.getElementById("no_result_filter_" + listItemsWrapper).remove();
        }
    }
}

// Ouvrir / fermer un dropdown filtre
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
        filterClicked.querySelector(".filter_item_label").style.display = "none";
        filterClicked.querySelector(".filter_item_form__input").style.display = "block";
        //Fermer le filtre
        filterClicked.addEventListener("mouseleave", function( event ) {
            for(let fi of filtersContainer){
                if(fi != filterClicked){
                    fi.classList.remove("condensed_width");
                }
            }
            filterClicked.classList.remove("open");
            filterClicked.querySelector(".filter_item_label").style.display = "block";
            filterClicked.querySelector(".filter_item_form__input").style.display = "none";
        });
    };
}


}