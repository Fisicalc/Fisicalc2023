const eletrodinamica = [
    {
        nome: "Intensidade da corrente elétrica",
        formula: "I = \\frac{\\left|Q\\right|}{\\Delta t}",
        variaveis: ["I", "Q", "\\Delta t"]
    },
    {
        nome: "Resistência elétrica",
        formula: "R = \\frac{U}{I}",
        variaveis: ["R", "U", "I"]
    },
    {
        nome: "Resistência elétrica",
        formula: "R = \\frac{\\rho \\cdot \\ell}{A}",
        variaveis: ["R", "\\rho", "\\ell", "A"]
    },
    {
        nome: "Condutância elétrica",
        formula: "G = \\frac{I}{U}",
        variaveis: ["G", "I", "U"]
    },
    {
        nome: "Condutância elétrica",
        formula: "G = R^{-1}",
        variaveis: ["G", "R"]
    },
    {
        nome: "Aquecimento por efeito Joule",
        formula: "Q = I^2 \\cdot R \\cdot \\Delta t",
        variaveis: ["Q", "I", "R","\\Delta t" ]
    },
    {
        nome: "Potência elétrica",
        formula: "Pot = U \\cdot I",
        variaveis: ["Pot", "U", "I"]
    },
    {
        nome: "Potência elétrica",
        formula: "Pot = R \\cdot I^2",
        variaveis: ["Pot", "R", "I"]
    },
    {
        nome: "Potência elétrica 3",
        formula: "Pot = \\frac{U^2}{R}",
        variaveis: ["Pot", "U", "R"]
    },
    {
        nome: "Consumo de energia",
        formula: "E = Pot \\cdot \\Delta t",
        variaveis: ["E", "Pot", "\\Delta t"]
    }
]

export default eletrodinamica;