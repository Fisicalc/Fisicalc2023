function show_hide_formulas(event)
{
    let d = event.target.nextElementSibling;
   
    if(d.style.display === "none")
    {
        console.log(Object.entries(event.target))
        console.log(event.target);
        d.style.display = "block";
    } 
    else
    {
        console.log(Object.entries(event.target))
        console.log(event.target);
        d.style.display = "none";
    }
}
