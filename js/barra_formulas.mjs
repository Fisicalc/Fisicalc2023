import formulas from "./formulas/formulas.mjs";
import { criarFormulaAreaCalculo, traduzirSeno } from "./areaCalculo.mjs";

criarListaFormulas();

function criarListaFormulas(){
    for(const nomeCategoriaFormulas in formulas){
        const divFormulas = document.querySelector(`.${nomeCategoriaFormulas}`);

        for(const {nome, formula, variaveis} of formulas[nomeCategoriaFormulas]){
            const btnFormula = criarBtnFormula(nome, formula, variaveis);
            //Adicão de atributo para pesquisa
            btnFormula.setAttribute('data-nome', (nome || '').toLowerCase());
            btnFormula.onclick = () => {
                criarFormulaAreaCalculo(formula, variaveis);
                esconderFormulas();
            }; 
            divFormulas.appendChild(btnFormula);
        }
        renderMathInElement(document.body, {output: 'html'})
    }
}

function pesquisarFormulas(termo){
    const termoBusca = termo.toLowerCase().trim();

    document.querySelectorAll("button.btnCategorias").forEach(btnCategoria => {
        const divFormulas = btnCategoria.nextElementSibling;
        if (termoBusca === '') {
            divFormulas.classList.remove('visivel');
            return;
        }
        let temResultados = false;

        // Verifica os botões dentro da div irmã
        if (divFormulas) {
            const botoesFormula = divFormulas.querySelectorAll('[data-nome]');
            
            botoesFormula.forEach(botao => {
                const nomeFormula = (botao.getAttribute('data-nome') || '').toString();
                const corresponde = nomeFormula.includes(termoBusca);
                botao.style.display = corresponde ? 'block' : 'none';
                
                if (corresponde) temResultados = true;
            });
        }

        // Esconde/Exibe a categoria inteira
        // btnCategoria.style.display = temResultados ? 'block' : 'none';
        // if (divFormulas) divFormulas.style.display = temResultados ? 'block' : 'none';
        btnCategoria.style.display = temResultados ? 'block' : 'none';
        if (divFormulas){
            divFormulas.classList.toggle('visivel', temResultados);
        }
    });

 }

 document.getElementById('search-input').addEventListener('input', (e) => {
      pesquisarFormulas(e.target.value);
  });

function criarBtnFormula(nome, formula, variaveis){
    const btnFormula = document.createElement("button");
    btnFormula.setAttribute("data-formula", formula)

    const spanBtnFormulaNome = document.createElement("span");
    spanBtnFormulaNome.innerText = nome;

    const hr = document.createElement("hr");
            
    const spanBtnFormulaFormula = document.createElement("span");
    spanBtnFormulaFormula.innerText = `$$${traduzirSeno(formula)}$$`;

    btnFormula.appendChild(spanBtnFormulaNome);
    btnFormula.appendChild(hr);
    btnFormula.appendChild(spanBtnFormulaFormula);

    return btnFormula;
}


function esconderFormulas(){
    const menuToggle = document.getElementById("menuToggle");
    const menuLateral = document.getElementById("barraLateralBotoes");
    menuToggle.classList.toggle('deactive');
    menuLateral.classList.toggle('deactive');
   
}

