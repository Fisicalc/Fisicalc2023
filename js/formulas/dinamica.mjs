const dinamica = [
    {
        nome: "Força resultante",
        formula: "\\vec{F} = \\sum_{i=1}^n \\vec{F_i} = \\vec{F_1} + \\vec{F_2} + \\dots + \\vec{F_n}",
        variaveis: ["\\vec{F}", "\\sum_{i=1}^n \\vec{F_i}", "\\vec{F_1}", "\\vec{F_2}", "\\vec{F_n}"]
    },
    {
        nome: "2ª Lei de Newton",
        formula: "F = ma",
        variaveis: ["F", "m", "a"],
    },
    {
        nome: "2ª Lei de Newton vetorial",
        formula: "\\vec{F} = m\\vec{a}",
        variaveis: ["\\vec{F}", "m", "\\vec{a}"]
    },
    {
        nome: "3ª Lei de Newton",
        formula: "\\vec{F_{a,b}} = \\vec{F_{b,a}}",
        variaveis: ["\\vec{F_{a,b}}", "\\vec{F_{b,a}}"]
    },
    {
        nome: "Peso de um corpo",
        formula: "\\vec{P} = m\\vec{g}",
        variaveis: ["\\vec{P}", "m", "\\vec{g}"]
    },
    {
        nome: "Força de atrito estático",
        formula: "F_{AT} = \\mu_{est} N",
        variaveis: ["F_{AT}", "\\mu_{est}", "N"]
    },
    {
        nome: "Força de atrito dinâmico",
        formula: "F_{AT} = \\mu_{din} N",
        variaveis: ["F_{AT}", "\\mu{din}", "N"]
    },
    {
        nome: "Lei de Hooke",
        formula: "F = kx",
        variaveis: ["F", "k", "x"]
    },
    {
        nome: "Força centrípeta",
        formula: "F_{CP} = ma_{CP} = m\\frac{v^2}{r}",
        variaveis: ["F_{CP}", "m", "a_{CP}", "v", "r"]
    },
    {
        nome: "Trabalho",
        formula: "\\uptau = F \\cdot d \\cdot cos\\theta",
        variaveis: ["\\uptau", "F", "d", "\\theta"]
    },
    {
        nome: "Potência média",
        formula: "\\bar{P} = \\frac{\\uptau}{\\Delta t} = \\frac{Fd}{\\Delta t} = F\\bar",
        variaveis: ["\\bar{P}", "\\uptau", "\\Delta t", "F", "d", "\\bar{v}"]
    },
    {
        nome: "Potência instantânea",
        formula: "P = lim\\limits_{t\\rightarrow 0} \\bar{P} = Fv",
        variaveis: ["P", "\\bar{P}", "F", "v"]
    },
    {
        nome: "Energia cinética",
        formula: "E_c = \\frac{1}{2}mv^2",
        variaveis: ["E_c", "m", "v"]
    },
    {
        nome: "Energia potencial gravitacional",
        formula: "E_{PG} = mgh",
        variaveis: ["E_{PG}", "m", "g", "h"],
    },
    {
        nome: "Energia potencial elástica",
        formula: "E_{PE} = \\frac{1}{2} kx^2",
        variaveis: ["E_{PE}", "k", "x"]
    },
    {
        nome: "Energia mecânica",
        formula: "E_M = E_C + E_P",
        variaveis: ["E_M", "E_C", "E_P"]
    },
    {
        nome: "Impulso",
        formula: "\\vec{I} = \\vec{F} \\Delta t",
        variaveis: ["\\vec{I}", "\\vec{F}", "\\Delta t"]
    },
    {
        nome: "Quantidade de movimento",
        formula: "\\vec{Q} = m \\vec{v}",
        variaveis: ["\\vec{Q}", "m", "\\vec{v}"]
    },
    {
        nome: "Teorema do impulso",
        formula: "\\vec{I} = \\Delta\\vec{Q}",
        variaveis: ["\\vec{I}", "\\Delta\\vec{Q}"]
    },
    {
        nome: "Conservação da quantidade de movimento",
        formula: "\\Delta\\vec{Q} = 0 \\Longrightarrow \\vec{Q_1} = \\vec{Q_2}",
        variaveis: ["\\Delta\\vec{Q}", "\\vec{Q_1}", "\\vec{Q_2}"]
    }
];

export default dinamica; 