document.querySelectorAll("button.btnCategorias")
    .forEach(btn => btn.addEventListener("click", (event) => show_hide_formulas(event)));

function show_hide_formulas(event)
{
    const divsFormulas = document.querySelectorAll(".formulas")
    let divFormulas = event.target.nextElementSibling;

    divsFormulas.forEach(div => div === divFormulas && !div.classList.contains("visivel") ? div.classList.add("visivel") : div.classList.remove("visivel"))
}