const hidrostatica = [
    {
        nome: "Pressão em uma superficie",
        formula: "p = \\frac{F_\\bot}{A}",
        variaveis: ["p", "F_\\bot", "A"]
    },
    {
        nome: "Densidade",
        formula: "d = \\frac{m}{V}",
        variaveis: ["d", "m", "V"]
    },
    {
        nome: "Pressão hidrostática",
        formula: "p = d \\cdot g \\cdot h",
        variaveis: ["p", "d", "g", "h"]
    },
    {
        nome: "Teorema de Stevin",
        formula: "\\Delta p = d \\cdot g \\cdot \\Delta h",
        variaveis: ["\\Delta p", "d", "g", "\\Delta h"]
    },
    {
        //Rever variáveis
        nome: "Empuxo",
        formula: "\\vec{E} = d_f \\cdot g \\cdot V_{fd}",
        variaveis: ["\\vec{E}", "d_f", "f", "V_{fd}"]
    },
    {
        nome: "Peso aparente",
        formula: "\\vec{P_a} = \\vec{P} - \\vec{E}",
        variaveis: ["\\vec{P_a}", "\\vec{P}", "\\vec{E}"]
    },
    {
        nome: "Peso aparente",
        formula: "\\vec{P_a} = g \\cdot (m - d_f \\cdot V_{fd})",
        variaveis: ["\\vec{P_a}", "g", "m", "d_f", "V_{fd}"]
    }
]

export default hidrostatica;