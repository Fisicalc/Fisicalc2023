import formulas from "./formulas/formulas.mjs";
import { criarFormulaAreaCalculo, traduzirSeno } from "./areaCalculo.mjs";

criarListaFormulas();

function criarListaFormulas(){
    for(const nomeCategoriaFormulas in formulas){
        const divFormulas = document.querySelector(`.${nomeCategoriaFormulas}`);

        for(const {nome, formula, variaveis} of formulas[nomeCategoriaFormulas]){
            const btnFormula = criarBtnFormula(nome, formula, variaveis);
            btnFormula.onclick = () => {
                criarFormulaAreaCalculo(formula, variaveis);
                esconderFormulas();
            }; 
            divFormulas.appendChild(btnFormula);
        }
        renderMathInElement(document.body, {output: 'html'})
    }
}

function pesquisarFormulas(){
    for(const nomeCategoriaFormulas in formulas){
        const divFormulas = document.querySelector(`.${nomeCategoriaFormulas}`);

        for(const {nome, formula, variaveis} of formulas[nomeCategoriaFormulas]){
            const btnFormula = criarBtnFormula(nome, formula, variaveis);
            btnFormula.onclick = () => {
                criarFormulaAreaCalculo(formula, variaveis);
                esconderFormulas();
            };
            btnFormula.addClass('.botaoFormulaPesquisa');
            const formulas = querySelectorAll('.botaoFormulaPesquisa');
            divFormulas.appendChild(btnFormula);
        }
        renderMathInElement(document.body, {output: 'html'})
    }
}


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

