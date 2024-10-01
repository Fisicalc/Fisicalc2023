const eletrodinamica = [
    {
        nome: "Intensidade da corrente elétrica",
        formula: "i = \\frac{\\left|Q\\right|}{\\Delta t}",
        variaveis: ["i", "Q", "\\Delta t"]
    },
    {
        nome: "Resistência elétrica",
        formula: "R = \\frac{U}{i}",
        variaveis: ["R", "U", "i"]
    },
    {
        nome: "Resistência elétrica",
        formula: "R = \\frac{\\rho \\cdot \\ell}{A}",
        variaveis: ["R", "\\rho", "\\ell", "A"]
    },
    {
        nome: "Condutância elétrica",
        formula: "G = \\frac{i}{U}",
        variaveis: ["G", "i", "U"]
    },
    {
        nome: "Condutância elétrica",
        formula: "G = R^{-1}",
        variaveis: ["G", "R"]
    },
    {
        nome: "Aquecimento por efeito Joule",
        formula: "Q = i^2 \\cdot R \\cdot \\Delta t",
        variaveis: ["Q", "i", "R","\\Delta t" ]
    },
    {
        nome: "Potência elétrica",
        formula: "Pot = U cdot i",
        variaveis: ["Pot", "u", "i"]
    },
    {
        nome: "Potência elétrica",
        formula: "Pot = R cdot i^2",
        variaveis: ["Pot", "R", "i"]
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