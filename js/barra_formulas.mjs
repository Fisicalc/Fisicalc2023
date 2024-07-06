import formulas from "./formulas/formulas.mjs";

criarListaFormulas();

function criarListaFormulas(){
    for(const nomeCategoriaFormulas in formulas){
        const divFormulas = document.querySelector(`.${nomeCategoriaFormulas}`);
        console.log(divFormulas);

        for(const {nome, formula} of formulas[nomeCategoriaFormulas]){
            const btnFormula = criarBtnFormula(nome, formula);

            divFormulas.appendChild(btnFormula);
        }

        renderMathInElement(document.body)
    }
}

function criarBtnFormula(nome, formula){
    const btnFormula = document.createElement("button");

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