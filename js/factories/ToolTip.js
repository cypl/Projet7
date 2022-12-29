class ToolTip{
    constructor(pSearchBar){ // pSearchBar est l'élément dans lequel va se placer le tooltip
        this.toolTipWrapper = document.createElement("div");
        this.toolTipWrapper.style.display = "none";
        this.toolTipWrapper.setAttribute("id","message-error-expression__wrapper");
        this.errorMessage = document.createElement("p");
        this.errorMessage.setAttribute("id","message-error-expression");
        this.toolTipWrapper.append(this.errorMessage);
        pSearchBar.prepend(this.toolTipWrapper);
    }
    showMessageError(pMessage){
        this.errorMessage.innerHTML = `<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M32 64C14.3 64 0 49.7 0 32S14.3 0 32 0l96 0c53 0 96 43 96 96l0 306.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 402.7 160 96c0-17.7-14.3-32-32-32L32 64z"/></svg></i> ${pMessage}`;
        this.toolTipWrapper.classList.remove("popOut");
        this.toolTipWrapper.classList.add("popIn");
        this.toolTipWrapper.style.display = "block";
    }
    hideMessageError(){
        const e = this.toolTipWrapper;
        e.classList.remove("popIn");
        e.classList.add("popOut");
        setTimeout(function(){
            e.style.display = "none";
        }, 250);
    }

}