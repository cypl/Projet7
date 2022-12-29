class FilterItemsList{
    constructor(criteria){
        this.criteria = criteria;
    }
    createFilterItemsList(){
        const filterCriteriaList = document.createElement("ul");
        filterCriteriaList.setAttribute("id", this.criteria + "_list");
        filterCriteriaList.classList.add("filter_list");
        return filterCriteriaList;
    }
}