class FilterItem{

    constructor(data, criteria){
        this.data = data;
        this.criteria = criteria;
    }

    // Une méthode pour créer un élément dans une liste de tags d'un filtre
    // pSelectedTags correspond à un des 3 arrays de tags sélectionnés
    create(pSelectedTags){
        let filterItem = document.createElement("li");
        filterItem.classList.add("ingredient_item");
        filterItem.classList.add("filter_list_item");
        filterItem.classList.add("filter_list_item--" + this.criteria);
        filterItem.textContent = stringFirstLetterUppercase(this.data);
        // Si certains tags ont déjà été sélectionnés, ils sont dans l'array pSelectedTags
        if(pSelectedTags.length > 0){
            if(pSelectedTags.includes(filterItem.textContent)){
                filterItem.classList.add("selected_filter");
            }
        }
        return filterItem;
    }
    
}