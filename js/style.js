document.querySelectorAll("button.btnCategorias")
    .forEach(btn => btn.addEventListener("click", (event) => show_hide_formulas(event)));

function show_hide_formulas(event)
{
    const divsFormulas = document.querySelectorAll(".formulas")
    let divFormulas = event.target.nextElementSibling;

    divsFormulas.forEach(div => div === divFormulas && !div.classList.contains("visivel") ? div.classList.add("visivel") : div.classList.remove("visivel"))
}

const erro = document.getElementById("erro");

function MensagemErro(texto)
{
    let mensagem = "ERRO " + texto;
    erro.textContent = texto;
    erro.classList.remove("fadeOut", "fade-in");

    void erro.offsetWidth;

    erro.addEventListener("animationend", function handlerStart(){
        erro.removeEventListener("animationend", handlerStart);

        setTimeout(() => {
            erro.classList.remove("fade-in");
            erro.classList.add('fadeOut');
        }, 300);       
    }, {once: true});
}