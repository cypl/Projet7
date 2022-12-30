class FilterItem{
    constructor(data, criteria){
        this.data = data;
        this.criteria = criteria;
    }
    createFilterItem(){
        let filterItem = document.createElement("li");
        filterItem.classList.add("ingredient_item");
        filterItem.classList.add("filter_list_item");
        filterItem.classList.add("filter_list_item--" + this.criteria);
        filterItem.textContent = stringFirstLetterUppercase(this.data);
        return filterItem;
    }
    createFilterItemForUpdate(filtersSelectedCriteria){
        let filterItem = document.createElement("li");
        filterItem.classList.add("ingredient_item");
        filterItem.classList.add("filter_list_item");
        filterItem.classList.add("filter_list_item--" + this.criteria);
        filterItem.textContent = stringFirstLetterUppercase(this.data);
        if(filtersSelectedCriteria.length > 0){
            if(filtersSelectedCriteria.includes(filterItem.textContent)){
                filterItem.classList.add("selected_filter");
            }
        }
        return filterItem;
    }
}