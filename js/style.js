document.querySelectorAll("button.btnCategorias")
    .forEach(btn => btn.addEventListener("click", (event) => show_hide_formulas(event))
);

function show_hide_formulas(event)
{
    const todasFormulas = document.querySelectorAll("div.formulasGrupo")

    let formulas = event.target.nextElementSibling;
    
    for (let index = 0; index < todasFormulas.length; index++) {
        if(todasFormulas[index] == formulas)
            continue
        if(todasFormulas[index].classList.contains("visivel"))
            todasFormulas[index].classList.remove("visivel")
    }

    formulas.classList.toggle('visivel'); 


    /*
    for (let index = 0; index < todasFormulas.length; index++) {
        if(todasFormulas[index].display === "none")
            continue;
        todasFormulas[index].style.display = "none";
    }
    

    
    if(formulas.style.display === "none")
    {
        console.log(Object.entries(event.target))
        console.log(event.target);
        formulas.style.display = "flex";
    } 
    else
    {
        console.log(Object.entries(event.target))
        console.log(event.target);
        formulas.style.display = "none";
    }
    */
}
