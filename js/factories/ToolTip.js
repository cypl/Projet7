class ToolTip{
    
    static show(pContainer, pMessage){
        // Si le tooltip n'existe pas encore dans le DOM on le crée
        if(!pContainer.getElementsByClassName("message-error-expression__wrapper").length > 0){
            pContainer.style.position = "relative";
            const toolTipWrapper = document.createElement("div");
            toolTipWrapper.style.display = "none";
            toolTipWrapper.classList.add("message-error-expression__wrapper");
            const errorMessage = document.createElement("p");
            errorMessage.classList.add("message-error-expression");
            toolTipWrapper.append(errorMessage);
            pContainer.prepend(toolTipWrapper);
            errorMessage.innerHTML = `<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M32 64C14.3 64 0 49.7 0 32S14.3 0 32 0l96 0c53 0 96 43 96 96l0 306.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 402.7 160 96c0-17.7-14.3-32-32-32L32 64z"/></svg></i> ${pMessage}`;
            toolTipWrapper.classList.remove("popOut");
            toolTipWrapper.classList.add("popIn");
            toolTipWrapper.style.display = "block";
        } 
        // Sinon, on il suffit de le réafficher
        else {
            const toolTipWrapper = pContainer.querySelector(".message-error-expression__wrapper");
            toolTipWrapper.classList.remove("popOut");
            toolTipWrapper.classList.add("popIn");
            toolTipWrapper.style.display = "block";
        }
    }


    static hide(pContainer){
        const toolTipWrapper = pContainer.querySelector(".message-error-expression__wrapper");
        if(toolTipWrapper){
            toolTipWrapper.classList.remove("popIn");
            toolTipWrapper.classList.add("popOut");
            setTimeout(function(){
                toolTipWrapper.style.display = "none";
            }, 250); // 250ms correspond à la durée de l'animation "popOut"
        }
    }

}