class FilterItemsList{
    constructor(criteria){
        this.criteria = criteria;
    }

    // Une méthode pour créer une liste de tags dans un filtre
    create(){
        const filterCriteriaList = document.createElement("ul");
        filterCriteriaList.setAttribute("id", this.criteria + "_list");
        filterCriteriaList.classList.add("filter_list");
        return filterCriteriaList;
    }
}