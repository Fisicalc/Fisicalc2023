const optica = [
    {
        nome: "Associação de espelhos planos",
        formula: "n = \\frac{360}{\\alpha} - 1",
        variaveis: ["n", "\\alpha"],
    },
    {
        nome: "Equação de Gauss",
        formula: "\\frac{1}{f} = \\frac{1}{d_i} + \\frac{1}{d_o}",
        variaveis: ["f", "d_i", "d_o"],
    },
    {
        nome: "Ampliação",
        formula: "A = \\frac{f}{f - d_o}",
        variaveis: ["A", "f", "d_o"],
    },
    {
        nome: "Índice de refração absoluto em um meio",
        formula: "n_m = \\frac{c}{v_m}",
        variaveis: ["n_m", "c", "v_m"],
    },
    {
        nome: "Equação dos pontos conjugados",
        formula: "\\frac{1}{f} = \\frac{1}{P_o} + \\frac{1}{P_i}",
        variaveis: ["f", "P_o", "P_i"],
    },
    {
        nome: "Lei de Snell-Descartes",
        formula: "n_1 \\cdot sin \\theta_i = n_2 \\cdot sin \\theta_r",
        variaveis: ["n_1", "\\theta_i", "n_2", "\\theta_r"],
    },
    {
        nome: "Vergência de lentes esféricas",
        formula: "V = \\frac{1}{f}",
        variaveis: ["V", "f"],
    },
    {
        nome: "Ampliação",
        formula: "A = \\frac{f}{f - d_o}",
        variaveis: ["A", "f", "d_o"],
    },
    {
        nome: "Equação dos fabricantes de lentes",
        formula: "V = \\frac{1}{f}",
        variaveis: ["V", "f"],
    },
    {
        nome: "Distância focal e raio de curvatura nos espelhos",
        formula: "f = \\frac{R}{2}",
        variaveis: ["f", "R"],
    }
]

export default optica;