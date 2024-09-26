import formulas from "./formulas/formulas.mjs";
import { criarFormulaAreaCalculo } from "./areaCalculo.mjs";

criarListaFormulas();

function criarListaFormulas(){
    for(const nomeCategoriaFormulas in formulas){
        const divFormulas = document.querySelector(`.${nomeCategoriaFormulas}`);

        for(const {nome, formula, variaveis} of formulas[nomeCategoriaFormulas]){
            const btnFormula = criarBtnFormula(nome, formula, variaveis);
            btnFormula.onclick = () => criarFormulaAreaCalculo(formula, variaveis);

            divFormulas.appendChild(btnFormula);
        }

        renderMathInElement(document.body)
    }
}

function criarBtnFormula(nome, formula, variaveis){
    const btnFormula = document.createElement("button");
    btnFormula.setAttribute("data-formula", formula)

    const spanBtnFormulaNome = document.createElement("span");
    spanBtnFormulaNome.innerText = nome;

    const hr = document.createElement("hr");
            
    const spanBtnFormulaFormula = document.createElement("span");
    spanBtnFormulaFormula.innerText = `$$${formula}$$`;

    btnFormula.appendChild(spanBtnFormulaNome);
    btnFormula.appendChild(hr);
    btnFormula.appendChild(spanBtnFormulaFormula);

    return btnFormula;
}