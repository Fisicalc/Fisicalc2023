const dinamica = [
    // {
    //     nome: "Força resultante",
    //     formula: "\\vec{F} = \\sum_{i=1}^n \\vec{F_i} = \\vec{F_1} + \\vec{F_2} + \\dots + \\vec{F_n}",
    //     variaveis: ["\\vec{F}", "\\sum_{i=1}^n \\vec{F_i}", "\\vec{F_1}", "\\vec{F_2}", "\\vec{F_n}"]
    // },
    {
        nome: "2ª Lei de Newton",
        formula: "F = m \\cdot a",
        variaveis: ["F", "m", "a"],
    },
    {
        nome: "Peso de um corpo",
        formula: "\\vec{P} = m \\cdot \\vec{g}",
        variaveis: ["\\vec{P}", "m", "\\vec{g}"]
    },
    {
        nome: "Força de atrito estático",
        formula: "F_{AT} = \\mu_{est} \\cdot N",
        variaveis: ["F_{AT}", "\\mu_{est}", "N"]
    },
    {
        nome: "Força de atrito dinâmico",
        formula: "F_{AT} = \\mu_{din} \\cdot N",
        variaveis: ["F_{AT}", "\\mu{din}", "N"]
    },
    {
        nome: "Lei de Hooke",
        formula: "F = k \\cdot x",
        variaveis: ["F", "k", "x"]
    },
    {
        nome: "Força centrípeta",
        formula: "F_{CP} = m \\cdot a_{CP}",
        variaveis: ["F_{CP}", "m", "a_{CP}"]
    },
    {
        nome: "Força centrípeta",
        formula: "F_{CP} = m \\cdot \\frac{v^2}{r}",
        variaveis: ["F_{CP}", "m", "v", "r"]
    },
    {
        nome: "Trabalho",
        formula: "\\tau = F \\cdot d \\cdot cos \\theta",
        variaveis: ["\\tau", "F", "d", "\\theta"]
    },
    {
        nome: "Potência média",
        formula: "\\bar{P} = \\frac{\\tau}{\\Delta t}",
        variaveis: ["\\bar{P}", "\\tau", "\\Delta t", "F", "d", "\\bar{v}"]
    },
    {
        nome: "Potência média",
        formula: "\\bar{P} = \\frac{F \\cdot d}{\\Delta t}",
        variaveis: ["\\bar{P}", "F", "d", "\\Delta t"]
    },
    {
        nome: "Potência média",
        formula: "\\bar{P} = F \\cdot \\bar{v}",
        variaveis: ["\\bar{P}", "F", "\\bar{v}"]
    },
    //Remover este item depois, rever código para resolver problema
    // {
    //     nome: "Potência instantânea",
    //     formula: "P = \\lim_{t\\rightarrow 0} \\bar{P}",
    //     variaveis: ["P", "t", "\\bar{P}"]
    // },
    {
        nome: "Potência instantânea",
        formula: "P = F \\cdot v",
        variaveis: ["P", "F", "v"]
    },
    {
        nome: "Energia cinética",
        formula: "E_c = \\frac{1}{2} \\cdot m \\cdot v^2",
        variaveis: ["E_c", "m", "v"]
    },
    {
        nome: "Energia potencial gravitacional",
        formula: "E_{PG} = m \\cdot g \\cdot h",
        variaveis: ["E_{PG}", "m", "g", "h"],
    },
    {
        nome: "Energia potencial elástica",
        formula: "E_{PE} = \\frac{1}{2} \\cdot k \\cdot x^2",
        variaveis: ["E_{PE}", "k", "x"]
    },
    {
        nome: "Energia mecânica",
        formula: "E_M = E_C + E_P",
        variaveis: ["E_M", "E_C", "E_P"]
    },
    {
        nome: "Impulso",
        formula: "\\vec{I} = \\vec{F} \\cdot \\Delta t",
        variaveis: ["\\vec{I}", "\\vec{F}", "\\Delta t"]
    },
    {
        nome: "Quantidade de movimento",
        formula: "\\vec{Q} = m \\cdot \\vec{v}",
        variaveis: ["\\vec{Q}", "m", "\\vec{v}"]
    },
    {
        nome: "Teorema do impulso",
        formula: "\\vec{I} = \\Delta\\vec{Q}",
        variaveis: ["\\vec{I}", "\\Delta\\vec{Q}"]
    },
    // {
    //     nome: "Conservação da quantidade de movimento",
    //     formula: "\\Delta\\vec{Q} = 0 \\Longrightarrow \\vec{Q_1} = \\vec{Q_2}",
    //     variaveis: ["\\Delta\\vec{Q}", "\\vec{Q_1}", "\\vec{Q_2}"]
    // }
];

export default dinamica; 