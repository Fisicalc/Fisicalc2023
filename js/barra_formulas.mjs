import formulas from "./formulas/formulas.mjs";

criarListaFormulas();

function criarListaFormulas(){
    for(const nomeCategoriaFormulas in formulas){
        const divFormulas = document.querySelector(`.${nomeCategoriaFormulas}`);

        for(const {nome, formula} of formulas[nomeCategoriaFormulas]){
            const btnFormula = criarBtnFormula(nome, formula);

            divFormulas.appendChild(btnFormula);
        }

        renderMathInElement(document.body)
    }
}

function criarBtnFormula(nome, formula){
    const btnFormula = document.createElement("button");
    btnFormula.setAttribute("data-formula", converterLaTeXParaFormula(formula))

    console.log(btnFormula)

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

function converterLaTeXParaFormula(formulaLaTeX){
    let eExpressao = false

    const formulaConvertida = formulaLaTeX.replace(/\|(.*)\|/, `abs($1)`)
        .replace(/\\bar\{([a-zA-Z]{1})\}/, `$1`)
        .replace(/\\vec\{F_\{a\,b\}\}/, "F_{a,b}")
        .replace(/\\vec\{F_\{b\,a\}\}/, "F_{b,a}")
        .replace(/\\vec\{([a-zA-Z]{1})\}/, "$1")
        .replace(/\\vec\{v_0\}/, `v_0`)
        .replace("cos\\theta", "cos(\\theta)")

    return nerdamer.convertFromLaTeX(formulaConvertida);

    for(let c of formulaLatex){
        if(c === "\\"){
            eExpressao = false;
        }
    }
}