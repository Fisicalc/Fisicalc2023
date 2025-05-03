const comandosLaTeX = ["\\bar", "\\bot", "\\cdot", "\\Delta", "\\frac", "\\rightarrow", "\\omega", "\\theta", "\\vec", "\\left", "\\right"]
const comandosNerdamer = ["cos", "sin", "tan", "sec", "csc", "cot", "dot", "arg", "log", 
    "min", "max", "abs", "exp", "mod", "erf", "fib", "tri", "sum", "lcm", "gcd", "deg", "ilt", "add", "pow","lte", "gte"
]

export function criarFormulaAreaCalculo(formula, variaveis){
    //formula = substituirOperacoesLaTeXFormula(formula)
    const formulaClassificada = classificarFormula(formula, variaveis)

    const areaCalculo = document.getElementById("equacao");
    const {divFormula, divInteracao, divErro, formulaInterativa, elementoResolucao, hr} = criarDivFormula(formula);

    variaveis.forEach(variavel => { 
        const {descricaoVariavel, inputVariavel} = criarDescricaoEInputVariavel(variavel);
        inputVariavel.addEventListener("input", (event) => responderInput(event, formulaClassificada, variavel, formulaInterativa, divFormula, elementoResolucao, divErro))

        const divInputEDescricao = document.createElement("div");
        divInputEDescricao.appendChild(descricaoVariavel)
        divInputEDescricao.appendChild(inputVariavel)
        
        divInteracao.appendChild(divInputEDescricao)
    })

    divFormula.appendChild(divInteracao)

    divFormula.appendChild(divErro)
    divFormula.appendChild(formulaInterativa)
    divFormula.appendChild(elementoResolucao)
    areaCalculo.appendChild(divFormula);
    areaCalculo.appendChild(hr)
    
    renderMathInElement(areaCalculo, {output: 'html'})
}

/**
 * 
 * @param {string} formula 
 * @returns { string }
 */
function substituirOperacoesLaTeXFormula(formula){
    return formula.replaceAll("\\left|", "abs(").replaceAll("\\right|", ")")
        .replaceAll("\\cdot", "*")
}

function classificarFormula(formula, variaveis) {
    const formulaClassificada = [];
    const variaveisOrdenadasPorIndice = retornarVariaveisEIndices(variaveis, formula).sort((a, b) => a.indice - b.indice);

    console.log(variaveisOrdenadasPorIndice, formula)

    let indiceFormula = 0

    variaveisOrdenadasPorIndice.forEach(({indice, variavel}, i) => {
        const parteConstanteFormula = formula.slice(indiceFormula, indice)
        if(parteConstanteFormula !== "") formulaClassificada.push(parteConstanteFormula);

        const objetoVariavel = { valor: variavel, variavel }

        if(contemComandoLaTeX(variavel) || variavel == "E"){
            objetoVariavel.substituir = removerComandosLaTeXVariavel(variavel, variaveis);
        }

        if(variavelDentroDeSenoOuCosseno({indice, variavel}, formula)){
            objetoVariavel.dentroDeSenoOuCosseno = true;
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

function variavelDentroDeSenoOuCosseno(variavel, formula) {
    const indicesSenoOuCosseno = retornarIndicesSenoOuCosseno(formula);
    
    return indicesSenoOuCosseno.indiceInicial > -1 && 
        variavel.indice > indicesSenoOuCosseno.indiceInicial && 
        ((variavel.indice + variavel.variavel.length) <= indicesSenoOuCosseno.indiceFinal || indicesSenoOuCosseno.indiceFinal === -1)
}

function retornarIndicesSenoOuCosseno(formula) {
    const comprimentoNomeOperacao = 3;
    
    let indiceInicial = formula.indexOf("sin");

    if(indiceInicial === -1) {
        indiceInicial = formula.indexOf("cos");
    }

    const primeiroCaractereApos = formula[indiceInicial + comprimentoNomeOperacao]
    const caractereFinal = primeiroCaractereApos === " " ? " " : ")"
    const indiceFinal = formula.indexOf(caractereFinal, indiceInicial + comprimentoNomeOperacao + 1);

    return { indiceInicial, indiceFinal };
}

function contemComandoLaTeX(variavel) {
    return variavel.indexOf("\\") !== -1 || variavel.indexOf("_{") !== -1;
}

function removerComandosLaTeXVariavel(variavel, variaveis) {
    comandosLaTeX.forEach(comando => {
        
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

    if(variavel !== '' && variavel.indexOf("_{") === -1 && variavel !== "e" && variavel !== "E"){
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
    const divErro = document.createElement("div");
    const formulaInterativa = document.createElement("p");
    formulaInterativa.innerText = `$$${formatarFormulaParaExibicao(formula)}$$`
    const elementoResolucao = document.createElement("p")
    const hr = document.createElement("hr")

    return {divFormula, divInteracao, divErro, formulaInterativa, elementoResolucao, hr};
}

function criarDescricaoEInputVariavel(variavel) {
    const descricaoVariavel = document.createElement("p");
    descricaoVariavel.style="display:inline;"
    descricaoVariavel.innerText = `\\(${traduzirSeno(variavel)}:\\)`

    const inputVariavel = document.createElement("input");
    inputVariavel.setAttribute("type", "number")

    return {descricaoVariavel, inputVariavel} 
}


function exibirMensagem(texto, aviso = false)
{
    const erro = document.getElementById("erro") || document.getElementById("aviso");
    erro.setAttribute("id", aviso ? "aviso" : "erro");

    let mensagem = aviso ? "AVISO:" + texto : "ERRO: " + texto;

    erro.classList.remove("fadeOut", "fadeIn");
    void erro.offsetWidth;

    erro.textContent = mensagem;
    erro.classList.add("fadeIn");

     // Configura animação de saída após término da entrada
     const removeFadeOut = () => {
        erro.classList.remove("fadeIn");
        erro.classList.add("fadeOut");
        
        // Remove mensagem após animação de saída
        erro.addEventListener("animationend", () => {
            erro.classList.remove("fadeOut");
        }, {once: true});
    };

    // Espera animação de entrada terminar + tempo de exibição
    erro.addEventListener("animationend", () => {
        setTimeout(removeFadeOut, 2000); // 2 segundos visível
    }, {once: true});
}

function responderInput(event, formula, variavel, formulaInterativa, divFormula, elementoResolucao, divErro) {
    const areaCalculo = document.querySelector("#equacao")

    console.log("Fórmula:", formula);

    substituirVariavelNaFormula(formula, variavel, event.target.valueAsNumber)
    
    const formulaConcatenada = formula.reduce((formula, parte) => {
        if(typeof parte === "string") return formula.concat(parte)
        else if(parte.dentroDeSenoOuCosseno) return formula.concat(parte.valor) 
        else return formula.concat(parte.valor)
    }, '')

    formulaInterativa.innerText = `$$${(formatarFormulaParaExibicao(formulaConcatenada))}$$`

    const formulaConcatenadaNerdamer = substituirOperacoesLaTeXFormula(formula.reduce((formula, parte) => {
        if(typeof parte === "string") return formula.concat(parte)
        else if(parte.substituir && parte.valor === parte.variavel) return formula.concat(parte.substituir)
        else if(parte.dentroDeSenoOuCosseno) return formula.concat(Number(parte.valor) * Math.PI / 180)
        else return formula.concat(parte.valor)
    }, ''))

    console.log(formulaConcatenadaNerdamer)

    const contadorVariaveisPreenchidas = contarVariaveisPreenchidas(formula);
    console.log(contarVariaveisPreenchidas(formula))

    if(contadorVariaveisPreenchidas.naoPreenchidas === 1){
        const [inputNaoPreenchido] = [...divFormula.querySelectorAll("input")].filter(({value}) => value === "")
        inputNaoPreenchido.disabled = true

        const [variavelNaoPreenchida] = formula.filter(parte => { if(typeof parte !== "string") return parte.valor === parte.variavel})

        let formulaNerdamer;

        try {
            formulaNerdamer = nerdamer.convertFromLaTeX(formulaConcatenadaNerdamer);

            const resolucao = nerdamer.solve(formulaNerdamer, variavelNaoPreenchida.substituir ?? variavelNaoPreenchida.variavel)

            console.log(resolucao.toString())

            let resolucaoExibicao = resolucao.toString().includes("sin") || resolucao.toString().includes("cos") ?
            resolucao.evaluate().toString().replace("[", "").replace("]", "") :
            resolucao.toString().replace("[", "").replace("]", "")

            if(resolucaoExibicao === "") {
                exibirMensagem("Resultado não possui solução", true)
            }

            let formaDecimal = "";

            ({resolucaoExibicao, formaDecimal} = formatarResultadoParaExibicao(resolucaoExibicao))

            if(variavelNaoPreenchida.dentroDeSenoOuCosseno && resolucaoExibicao){
                const resolucaoEmGraus = Math.round(Number(formaDecimal) * 180 * Math.PI)
                resolucaoExibicao = String(resolucaoEmGraus) + "°"
            }

            const formulaNerdamerExibicao = formatarFormulaParaExibicao([variavelNaoPreenchida.variavel, " = ", resolucaoExibicao || "\\emptyset", formaDecimal ? " = " : "", formaDecimal])

            elementoResolucao.innerText = `$$${formulaNerdamerExibicao}$$`
        }
        catch(e) {
            if(e.name === "ParseError" && formulaConcatenadaNerdamer.includes("frac")){
                exibirMensagem("Divisão por 0 não é permitida")
                //divErro.innerText = "Divisão por 0 não é permitida!"
            }
            else if (e.name === "ParseError" || e.name === "NerdamerValueError" && e.message.includes("does not equal")){
                exibirMensagem("Igualdade incorreta inserida");
            }
            else {
                console.error(e)
            }
        }
        
        console.log("event", event.srcElement, "formulaInterativa", formulaInterativa, "divFormula", divFormula)
    } else {
        const inputsNaoPreenchidos = [...divFormula.querySelectorAll("input")].filter(({value}) => value === "")
        inputsNaoPreenchidos.forEach(input => input.disabled = false)
        elementoResolucao.innerText = ""
        divErro.innerText = ""
    }

    renderMathInElement(areaCalculo, {output: 'html'})
}

function formatarResultadoParaExibicao(resultado) {
    let resultadoFormatado = ""
    let parteDecimal = ""
    
    if(resultado.includes(",")){
        const partesResolucao = resultado.replace("[", "").replace("]", "").split(",").map(n => n.replaceAll(" ", ""))
        
        if(eDoisResultadosPositivoNegativo(partesResolucao)){
            const resultadoBase = partesResolucao[0].replaceAll("-", "");

            resultadoFormatado += "\\pm " + nerdamer.convertToLaTeX(resultadoBase)
            parteDecimal = resultadoBase.includes("/") ? "\\pm " + nerdamer(resultadoBase).text('decimals', 6) : ""
        } else {
            resultadoFormatado = partesResolucao.map(resolucao => nerdamer.convertToLaTeX(resolucao)).join(",")
            parteDecimal = partesResolucao.map(resolucao => resolucao.includes("/") ? nerdamer(resolucao).text("decimals", 6) : "")
                .join(partesResolucao.every(resolucao => resolucao.includes("/")) ? "," : "")
        }
    }else{
        resultadoFormatado = nerdamer.convertToLaTeX(resultado)
        parteDecimal = resultado.includes("/") ? nerdamer(resultado).text("decimals", 6) : ""
    }

    console.log(resultadoFormatado)

    return {resolucaoExibicao: resultadoFormatado, formaDecimal: parteDecimal};
}

function eDoisResultadosPositivoNegativo(partesResolucao) {
    return partesResolucao.length === 2 
        && (partesResolucao[0].indexOf("-") === 0 && partesResolucao[0].substring(1) === partesResolucao[1]) 
        || (partesResolucao[1].indexOf("-") === 0 && partesResolucao[1].substring(1) === partesResolucao[0])
}

/**
 * 
 * @param {string | [string]} formula 
 * @returns 
 */
function formatarFormulaParaExibicao(formula){
    let formulaFormatada = "";

    console.log(formula)

    if(formula instanceof Array) {
        formulaFormatada = formula.reduce((acc, cur) => acc.concat(cur))
    }else{
        formulaFormatada = formula;
    }

    formulaFormatada = formulaFormatada.replaceAll(/abs\(([^abs]*)\)/g, "\\left|$1\\right|")
        .replaceAll(".", ",")
        .replaceAll("sin", "sen")
        .replaceAll("*", " \\cdot ")

        console.log(formulaFormatada)
    return formulaFormatada
}

export function traduzirSeno(texto) {
    return texto.replaceAll("sin", "sen");
}

/**
 * 
 * @param {[string]} variaveis 
 * @param {string} formula 
 * @returns {[{variavel: string, indice: number}]}
 */
function retornarVariaveisEIndices(variaveis, formula){
    console.log(formula)
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
                if(formula[primeiroIndiceAposVariavel] !== "_" && formula[indiceVariavel-1] !== "_"){
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