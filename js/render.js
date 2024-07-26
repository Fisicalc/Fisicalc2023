function render(formula, elemento, idElemento){
    const htmlFormula = criarHtmlFormula(formula);
    elemento.innerHtml += htmlFormula;
}

function criarHtmlFormula({formula, variaveis}){
    let htmlFormula = formula;
    
    for(let variavel of variaveis){
        const span = `<span id=${variavel}>${variavel}<span>` 

        htmlFormula = htmlFormula.replaceAll(variavel, span);
    }

    return htmlFormula;
}

function criarListenerVariaveis(variaveis){
    variaveis.forEach(variavel => variavel);
}