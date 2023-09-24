function show_hide_formulas(event)
{
    let formulas = event.target.nextElementSibling;
   
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
