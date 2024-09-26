const comandosLaTeX = ["\\bar", "\\bot", "\\cdot", "\\Delta", "\\frac", "\\rightarrow", "\\theta", "\\vec"]
const comandosNerdamer = ["cos", "sin", "tan", "sec", "csc", "cot", "dot", "arg", "log", 
    "min", "max", "abs", "exp", "mod", "erf", "fib", "tri", "sum", "lcm", "gcd", "deg", "ilt", "add", "pow","lte", "gte"
]

export function criarFormulaAreaCalculo(formula, variaveis){
    const formulaClassificada = classificarFormula(formula, variaveis)

    const areaCalculo = document.getElementById("equacao");
    const {divFormula, divInteracao, formulaInterativa, elementoResolucao, hr} = criarDivFormula(formula);

    variaveis.forEach(variavel => {
        const {descricaoVariavel, inputVariavel} = criarDescricaoEInputVariavel(variavel);
        inputVariavel.addEventListener("input", (event) => responderInput(event, formulaClassificada, variavel, formulaInterativa, divFormula, elementoResolucao))
        
        divInteracao.appendChild(descricaoVariavel)
        divInteracao.appendChild(inputVariavel)
    })

    divFormula.appendChild(divInteracao)

    divFormula.appendChild(formulaInterativa)
    divFormula.appendChild(elementoResolucao)
    areaCalculo.appendChild(divFormula);
    areaCalculo.appendChild(hr)
    
    renderMathInElement(areaCalculo)
}

function classificarFormula(formula, variaveis) {
    const formulaClassificada = [];
    const variaveisOrdenadasPorIndice = retornarVariaveisEIndices(variaveis, formula).sort((a, b) => a.indice - b.indice);

    let indiceFormula = 0

    variaveisOrdenadasPorIndice.forEach(({indice, variavel}, i) => {
        const parteConstanteFormula = formula.slice(indiceFormula, indice)
        if(parteConstanteFormula !== "") formulaClassificada.push(parteConstanteFormula);

        const objetoVariavel = { valor: variavel, variavel }

        if(contemComandoLaTeX(variavel)){
            objetoVariavel.substituir = removerComandosLaTeXVariavel(variavel, variaveis);
        }

        console.log(objetoVariavel)
        formulaClassificada.push(objetoVariavel);

        if(i === variaveisOrdenadasPorIndice.length - 1){
            formulaClassificada.push(formula.slice(indice + variavel.length))
        }

        indiceFormula = indice + variavel.length
    })

    console.log(formulaClassificada)

    return formulaClassificada;
}

function contemComandoLaTeX(variavel) {
    return variavel.indexOf("\\") !== -1 || variavel.indexOf("_{") !== -1;
}

function removerComandosLaTeXVariavel(variavel, variaveis) {
    comandosLaTeX.forEach(comando => {
        console.log(comando)
        
        if(variavel.includes(comando)){
            const indiceComando = variavel.indexOf(comando)

            if(variavel.includes("{")){
                const indiceInicialChaves = variavel.indexOf("{")
                const indiceFinalChaves = variavel.indexOf("}")

                variavel = variavel.slice(indiceInicialChaves + 1, indiceFinalChaves)
            } else {
                variavel = variavel.slice(indiceComando + comando.length)

                console.log(variavel, comando)
            }
        }
    })

    if(variavel !== '' && variavel.indexOf("_{") === -1){
        return variavel
    } else {
        return gerarNomeAleatorioVariavel(variaveis)
    }
}

function gerarNomeAleatorioVariavel(variaveis) {
    const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const indiceMinimo = 0
    const indiceMaximo = 25;
    let nomeVariavel = ""

    for(let i = 0; i < 3; i++){
        const indiceAleatorio = Math.floor(Math.random() * (indiceMaximo - indiceMinimo + 1) + indiceMinimo) 

        nomeVariavel = nomeVariavel.concat(alfabeto[indiceAleatorio])
    }

    if(variaveis.includes(nomeVariavel) || comandosNerdamer.includes(nomeVariavel)){
        return gerarNomeAleatorioVariavel(variaveis);
    }

    return nomeVariavel
}

function criarDivFormula(formula){
    const divFormula = document.createElement("div");
    divFormula.setAttribute("id", "divFormula")
    const divInteracao = document.createElement("div");
    divInteracao.setAttribute("class", "areaInteracao")
    const formulaInterativa = document.createElement("p");
    formulaInterativa.innerText = `$$${formula}$$`
    const elementoResolucao = document.createElement("p")
    const hr = document.createElement("hr")

    return {divFormula, divInteracao, formulaInterativa, elementoResolucao, hr};
}

function criarDescricaoEInputVariavel(variavel) {
    const descricaoVariavel = document.createElement("p");
    descricaoVariavel.style="display:inline;"
    descricaoVariavel.innerText = `\\(${variavel}:\\)`

    const inputVariavel = document.createElement("input");
    inputVariavel.setAttribute("type", "number")

    return {descricaoVariavel, inputVariavel} 
}

function responderInput(event, formula, variavel, formulaInterativa, divFormula, elementoResolucao) {
    const areaCalculo = document.querySelector("#equacao")

    substituirVariavelNaFormula(formula, variavel, event.target.valueAsNumber)
    
    const formulaConcatenada = formula.reduce((formula, parte) => {
        if(typeof parte === "string") return formula.concat(parte)
        else return formula.concat(parte.valor)
    }, '')

    const formulaConcatenadaNerdamer = formula.reduce((formula, parte) => {
        if(typeof parte === "string") return formula.concat(parte)
        else if(parte.substituir && parte.valor === parte.variavel) return formula.concat(parte.substituir)
        else return formula.concat(parte.valor)
    }, '')
    
    formulaInterativa.innerText = `$$${formulaConcatenada}$$`

    const contadorVariaveisPreenchidas = contarVariaveisPreenchidas(formula);

    if(contadorVariaveisPreenchidas.naoPreenchidas === 1){
        const [inputNaoPreenchido] = [...divFormula.querySelectorAll("input")].filter(({value}) => value === "")
        inputNaoPreenchido.disabled = true

        const formulaNerdamer = nerdamer.convertFromLaTeX(formulaConcatenadaNerdamer);
        console.log(formulaNerdamer.toString())

        const [variavelNaoPreenchida] = formula.filter(parte => { if(typeof parte !== "string") return parte.valor === parte.variavel})

        const resolucao = nerdamer.solve(formulaNerdamer, variavelNaoPreenchida.substituir ?? variavelNaoPreenchida.variavel)
        
        const resolucaoExibicao = resolucao.toString().replace("[", "").replace("]", "")

        const formulaNerdamerExibicao = variavelNaoPreenchida.variavel + " = " + nerdamer.convertToLaTeX(resolucaoExibicao) 

        elementoResolucao.innerText = `$$${formulaNerdamerExibicao}$$`
    } else {
        const inputsNaoPreenchidos = [...divFormula.querySelectorAll("input")].filter(({value}) => value === "")
        inputsNaoPreenchidos.forEach(input => input.disabled = false)
        elementoResolucao.innerText = ""
    }

    renderMathInElement(areaCalculo)
}

/**
 * 
 * @param {[string]} variaveis 
 * @param {string} formula 
 * @returns {[{variavel: string, indice: number}]}
 */
function retornarVariaveisEIndices(variaveis, formula){
    const variaveisEIndices = [];
    const indicesComandosLatex = retornarIndicesComandosLaTeX(formula)
    let indiceVariavel = -1;
    let indiceInicialPesquisa = 0;

    variaveis.forEach(variavel => {
        do {
            indiceVariavel = formula.indexOf(variavel, indiceInicialPesquisa);

            const comandoLaTeXContemNomeVariavel = indicesComandosLatex
                .some(({indiceInicial, indiceFinal}) => (indiceVariavel >= indiceInicial) && (indiceVariavel <= indiceFinal))
            
            const primeiroIndiceAposVariavel = indiceVariavel + String(variavel).length;
            
            if(indiceVariavel >= 0 && (contemComandoLaTeX(variavel) || !comandoLaTeXContemNomeVariavel)) {
                if(formula[primeiroIndiceAposVariavel] !== "_"){
                    variaveisEIndices.push({variavel, indice: indiceVariavel});
                }
            }

            indiceInicialPesquisa = indiceVariavel + String(variavel).length;
        } while(indiceVariavel !== -1);
    })

    console.log(variaveisEIndices);

    return variaveisEIndices;
}

/**
 * 
 * @param {string} formula 
 * @returns {[{indiceInicial: number, indiceFinal: number}]}
 */
function retornarIndicesComandosLaTeX (formula) {
    const indicesComandos = [];

    comandosLaTeX.forEach(comando => {
        let indiceInicialPesquisa = 0;
        let indiceComando = formula.indexOf(comando, indiceInicialPesquisa);        

        do{
            if(indiceComando !== -1) {
                indicesComandos.push({indiceInicial: indiceComando, indiceFinal: indiceComando + comando.length})
                indiceInicialPesquisa = indiceComando + comando.length
                indiceComando = formula.indexOf(comando, indiceInicialPesquisa)
            }
        } while( indiceComando !== -1 )
    })

    console.log(indicesComandos)

    return indicesComandos
}

function substituirVariavelNaFormula(formula, variavel, valor) {
    formula.forEach(parte => {
        if(parte.variavel === variavel) {
            parte.valor = isNaN(valor) ? parte.variavel : valor
        }
    })
}

function contarVariaveisPreenchidas(formula){
    const variaveis = formula.filter(parte => typeof(parte) !== "string");

    const variaveisPreenchidas = new Map()

    variaveis.forEach(parte => variaveisPreenchidas.set(parte.variavel, parte.valor))

    return variaveisPreenchidas.entries().reduce(({preenchidas, naoPreenchidas}, variavel) => {
        return variavel[0] !== variavel[1] ? 
            {preenchidas: ++preenchidas, naoPreenchidas} : 
            {preenchidas, naoPreenchidas: ++naoPreenchidas}}, { preenchidas: 0, naoPreenchidas: 0 })
}