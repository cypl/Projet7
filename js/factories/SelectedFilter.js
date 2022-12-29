class SelectedFilter{
    constructor(name, classname){
        this.name = name;
        this.classname = classname;
    }
    createSelectedFilter(){
        let filtersSelectedItem = document.createElement("li");
        filtersSelectedItem.classList.add("filter_item_selected");
        filtersSelectedItem.classList.add(this.classname);
        filtersSelectedItem.textContent = this.name;
        return filtersSelectedItem;
    }
}