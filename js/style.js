function show_hide_formulas(event)
{
    const todasFormulas = document.querySelectorAll("div.formulas")

    let formulas = event.target.nextElementSibling;
    
    for (let index = 0; index < todasFormulas.length; index++) {
        if(formulas == todasFormulas[index] || todasFormulas[index].display === "none")
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
}
