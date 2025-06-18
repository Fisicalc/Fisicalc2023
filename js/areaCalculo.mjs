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

    console.log("Variáveis ordenada por índice:", variaveisOrdenadasPorIndice, "formula:", formula)

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

        console.log("Objeto variável:", objetoVariavel)
        formulaClassificada.push(objetoVariavel);

        if(i === variaveisOrdenadasPorIndice.length - 1){
            formulaClassificada.push(formula.slice(indice + variavel.length))
        }

        indiceFormula = indice + variavel.length
    })

    console.log("Fórmula classificada:", formulaClassificada)

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

                console.log("Variável:", variavel, "Comando:", comando)
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

    console.log("Fórmula concatenada Nerdamer:", formulaConcatenadaNerdamer)

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

            if(resolucaoExibicao.includes("i")) {
                exibirMensagem("Resultado não é parte do conjunto dos Reais", true);
            }

            let formaDecimal = "";
            
            // ({resolucaoExibicao, formaDecimal} = formatarResultadoParaExibicao(resolucaoExibicao, variavelNaoPreenchida.variavel))

            let resultadoFormatado = formatarResultadoParaExibicao(resolucaoExibicao, variavelNaoPreenchida.variavel);

            if(variavelNaoPreenchida.dentroDeSenoOuCosseno && resolucaoExibicao){
                resultadoFormatado = formatarResultadoParaExibicao(resolucaoExibicao, variavelNaoPreenchida.variavel, "graus")

                
            }

            const formulaNerdamerExibicao = formatarFormulaParaExibicao(resultadoFormatado);
            // formatarFormulaParaExibicao([variavelNaoPreenchida.variavel, ` ${sinalIgualdade} `, resolucaoExibicao || "\\emptyset", formaDecimal ? ` ${sinalIgualdade} ` : "", formaDecimal])

            elementoResolucao.innerText = `$$${formulaNerdamerExibicao}$$`
        }
        catch(e) {
            if(e.name === "ParseError" && formulaConcatenadaNerdamer.includes("frac")){
                exibirMensagem("Divisão por 0 não é permitida")
                elementoResolucao.innerText = "";
                //divErro.innerText = "Divisão por 0 não é permitida!"
            }
            else if (e.name === "ParseError" || e.name === "NerdamerValueError" && e.message.includes("does not equal")){
                exibirMensagem("Igualdade incorreta inserida");
            }
            else {
                console.error(e)
            }
        }
        
        console.log("Event:", event.srcElement, "Fórmula Interativa:", formulaInterativa, "Div Fórmula:", divFormula)
    } else {
        const inputsNaoPreenchidos = [...divFormula.querySelectorAll("input")].filter(({value}) => value === "")
        inputsNaoPreenchidos.forEach(input => input.disabled = false)
        elementoResolucao.innerText = ""
        divErro.innerText = ""
    }

    renderMathInElement(areaCalculo, {output: 'html'})
}

    
function formatarResultadoParaExibicao(resultado, variavel, tipoResolucao) {
    let resultadoFormatado = ""
    let resultados = [];
    let partesDecimais = [];
    let parteDecimal = ""
    let sinalIgualdade = "=";

    if(!resultado) {
        return variavel + ` ${sinalIgualdade} ` + "\\emptyset"
    }

    if(resultado.includes("i")) {
        sinalIgualdade = "\\notin";

        return variavel + ` ${sinalIgualdade} ` + `\\R`
    }
    
    if(resultado.includes(",")){
        resultados = resultado.replace("[", "").replace("]", "").split(",").map(n => n.replaceAll(" ", ""))
    }else{
        resultados.push(resultado);
    }
    
    resultados.forEach(resultado => {
        console.log("Resultado antes da formatação:", resultado)
        let formaDecimal = formatarFormaDecimalResultado(resultado);

        console.log("Forma Decimal:", formaDecimal)

        let quantidadeZerosAposVirgulaDecimal = quantosZerosAposOPontoDecimal(formaDecimal);

        if(quantidadeZerosAposVirgulaDecimal >= 5) {
            sinalIgualdade = "\\approx";

            if(quantidadeZerosAposVirgulaDecimal >= 8) {
                formaDecimal = formaDecimal.slice(0, formaDecimal.indexOf("."));
            } else {
                const quantidadeCasasDecimaisExibicao = quantidadeZerosAposVirgulaDecimal + 3;
                formaDecimal = formatarFormaDecimalResultado(resultado, quantidadeCasasDecimaisExibicao);
            }
        }else if(quantosZerosAposDigitoAposOPontoDecimal(formaDecimal) >= 4) {
            //TODO: Quando caso para números como 0.500300007 e 0.500300200004 forem adicionados, ainda adicionar limitação de dígitos com a função formatarFormaDecimalResultado
            // Considerar que esta próxima linha já resolve o problema
            formaDecimal = formaDecimal.slice(0, formaDecimal.indexOf("0000"))
        }
        else {
            formaDecimal = formatarFormaDecimalResultado(resultado, 6)
        }

        partesDecimais.push(formaDecimal);
    });

    partesDecimais = partesDecimais.filter(parteDecimal => !(parteDecimal === ""));

    if(tipoResolucao === "graus") {
        sinalIgualdade = "="

        if(partesDecimais.length > 1){
            const doisResultadosPositivosMaisProximosDeZero = partesDecimais.map(Number).filter(numero => numero >= 0).sort((a, b) => a - b).filter((_, i) => i === 0 || i === 1);

            const resolucoesEmGraus = doisResultadosPositivosMaisProximosDeZero.map(converterRadianosParaGraus).map(resolucao => resolucao >= 360 ? resolucao % 360 : resolucao).map(resolucao => String(resolucao) + "°");

            console.log(partesDecimais, doisResultadosPositivosMaisProximosDeZero)
            return variavel + ` ${sinalIgualdade} ` + resolucoesEmGraus.join(";");
        } else {
            const resolucaoEmGraus = converterRadianosParaGraus(Number(partesDecimais.join("")))

            return variavel + ` ${sinalIgualdade} ` + String(resolucaoEmGraus) + "°";
        }
    }

    if(resultados.length === 2 && eDoisResultadosPositivoNegativo(resultados)) {
        resultados = resultados
            .filter(resultado => !resultado.includes("-"))
            .map(resultado => nerdamer.convertToLaTeX(resultado));
        partesDecimais = partesDecimais
            .filter(parteDecimal => !parteDecimal.includes("-"))

        console.log("Resultados:", resultados);
        return variavel + ` ${sinalIgualdade} ` + "\\pm " + resultados.join(";") + (partesDecimais.length ?  ` ${sinalIgualdade} ` + "\\pm" + " " + partesDecimais.join(";") : "");
    } else {
        const resultadoFormatado = resultados.map(resultado => nerdamer.convertToLaTeX(resultado)).join(";");
        const parteDecimal = partesDecimais.join(";");

        return variavel + ` ${sinalIgualdade} ` + resultadoFormatado + (partesDecimais.length ? ` ${sinalIgualdade} ` + parteDecimal : "");
    }
}

function formatarFormaDecimalResultado(resultado, quantidadeCasasDecimais = 0) {
    return resultado.includes("/") ? nerdamer(resultado).text('decimals', quantidadeCasasDecimais) : ""; 
}

function converterRadianosParaGraus(numero) {
    return Math.round(numero * 180 / Math.PI);
}

function eDoisResultadosPositivoNegativo(partesResolucao) {
    console.log(partesResolucao)

    return partesResolucao.length === 2 
        && (partesResolucao[0].indexOf("-") === 0 && partesResolucao[0].substring(1) === partesResolucao[1]) 
        || (partesResolucao[1].indexOf("-") === 0 && partesResolucao[1].substring(1) === partesResolucao[0])
}

/**
 * 
 * @param {string} numero O número cuja quantidade de zeros após o ponto decimal vai ser medida
 */
function quantosZerosAposOPontoDecimal(numero){
    const indicePontoDecimal = numero.indexOf(".");
    let contador = 0;

    if(indicePontoDecimal !== -1) {
        for(let i = indicePontoDecimal + 1; i < numero.length; i++) {
            if(numero[i] !== "0") {
                return contador;
            }else{
                contador++
            }
        }

        return contador;
    } else {
        return 0;
    }
}

// TODO: criar função genérica "contarZeros(numero, indice)", que conta todos os zeros à partir de dado índice.
// No caso de zeros após o ponto decimal, só se deve truncar à partir de 4 zeros ocorrendo após um dígito, respeitando as regras anteriormente definidas sobre zeros imediatamente após um ponto decimal.
// Números como 0.0001500002 só devem ser truncados após quatro zeros ocorrerem. No caso do número 0.0001500002, o resultado seria 0.00015

function quantosZerosAposDigitoAposOPontoDecimal(numero) {
    const indicePontoDecimal = numero.indexOf(".");
    const indicePrimeiroDigitoDecimal = indicePontoDecimal + 1;
    let indicePesquisa = indicePrimeiroDigitoDecimal;
    
    if(indicePontoDecimal === -1) return 0;

    if(numero[indicePesquisa] === "0") {
        for(let i = indicePesquisa; i < numero.length; i++) {
            if(numero[i] !== "0") {
                indicePesquisa = i;
                break;
            }
        }
    }

    if(numero[indicePesquisa] === "0") {
        return 0;
    }
    else {
        //TODO: Adicionar casos para números como 0.500300007
        //TODO: Adicionar casos para números como 0.500300200004

        indicePesquisa = numero.indexOf("0", indicePesquisa);

        if(indicePesquisa === -1) {
            return 0;
        } else {
            let contador = 0;

            for(let i = indicePesquisa; i < numero.length; i++) {
                if(numero[i] === "0") {
                    contador++;
                } else {
                    return contador;
                }
            }

            return contador;
        }
    }
}

/**
 * 
 * @param {string | [string]} formula 
 * @returns 
 */
function formatarFormulaParaExibicao(formula){
    let formulaFormatada = "";

    console.log("Fórmula:", formula)

    if(formula instanceof Array) {
        formulaFormatada = formula.reduce((acc, cur) => acc.concat(cur))
    }else{
        formulaFormatada = formula;
    }

    formulaFormatada = formulaFormatada.replaceAll(/abs\(([^abs]*)\)/g, "\\left|$1\\right|")
        .replaceAll(".", ",")
        .replaceAll("sin", "sen")
        .replaceAll("*", " \\cdot ")

        console.log("Fórmula formatada:", formulaFormatada)
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
    console.log("Fórmula:", formula)
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

    console.log("Variáveis e índices:", variaveisEIndices);

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

    console.log("Índices dos comandos:", indicesComandos)

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