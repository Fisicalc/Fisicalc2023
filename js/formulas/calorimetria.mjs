const calorimetria = [
    {
        nome: "Calor sensível",
        formula: "Q = m \\cdot c \\cdot \\Delta\\theta",
        variaveis: ["Q", "m", "c", "\\Delta\\theta"]
    },
    {
        nome: "Calor latente",
        formula: "Q = m \\cdot L",
        variaveis: ["Q", "m", "L"]
    },
    {
        nome: "Capacidade térmica",
        formula: "C=\\frac{Q}{\\Delta\\theta}",
        variaveis: ["C", "Q", "\\Delta\\theta",]
    },
    {
        nome: "Capacidade térmica",
        formula: "C= m \\cdot c",
        variaveis: ["C", "m", "c"]
    },
    {
        nome: "Fluxo de calor",
        formula: "\\Phi = \\frac{Q}{\\Delta t}",
        variaveis: ["\\Phi", "Q", "\\Delta t"]
    }
];

export default calorimetria;