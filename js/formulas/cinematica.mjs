const cinematica  = [
    {
        nome: "Velocidade Média",
        formula: "\\bar{v}=\\frac{d}{\\Delta t}",
        variaveis: ["\\bar{v}", "d", "\\Delta t"],
    },
    {
        nome: "Função horária do deslocamento",
        formula: "s = s_0 + v \\cdot \\Delta t",
        variaveis: ["s", "s_0", "v", "\\Delta t"]
    },
    {
        nome: "Aceleração média",
        formula: "\\bar{a} = \\frac{\\Delta v}{\\Delta t}",
        variaveis: ["\\bar{a}", "\\Delta v", "\\Delta t"]
    },
    {
        nome: "Função horária da velocidade",
        formula: "v = v_0 + a \\cdot t",
        variaveis: ["v", "v_0", "a", "t"]
    },
    {
        nome: "Função horária da posição em função do tempo",
        formula: "s = s_0 + v_0 \\cdot t + \\frac{1}{2} \\cdot a \\cdot t^2",
        variaveis: ["s", "s_0", "v_0", "t", "a"]
    },
    {
        nome: "Equação de Torricelli",
        formula: "v^2 = v_0^2 + 2 \\cdot a \\cdot \\Delta d",
        variaveis: ["v", "v_0", "a", "\\Delta d"]
    },
    {
        nome: "Função horária da velocidade no movimento vertical",
        formula: "v = v_0 + g \\cdot t",
        variaveis: ["v", "v_0", "g", "t"]
    },
    {
        nome: "Função horária da posição em função do tempo no movimento vertical",
        formula: "h = h_0 + v_0 \\cdot t + \\frac{g}{2} \\cdot t^2",
        variaveis: ["h", "h_0", "v_0", "t", "g"]
    },
    {
        nome: "Equação de Torricelli no movimento vertical",
        formula: "v^2 = v_0^2 + 2 \\cdot g \\cdot \\Delta h",
        variaveis: ["v", "v_0", "g", "\\Delta h"]
    },
    {
        nome: "Função horária da posição horizontal",
        formula: "x = x_0 + v_{0_x} \\cdot t",
        variaveis: ["x", "x_0", "v_{0_x}", "t"]
    },
    {
        nome: "Componente horizontal da velocidade inicial",
        formula: "v_{0_x} = \\left|\\vec{v_0}\\right| \\cdot cos \\theta",
        variaveis: ["v_{0_x}", "\\left|\\vec{v_0}\\right|", "\\theta"]
    },
    {
        nome: "Função horária da posição vertical",
        formula: "y = y_0 + v_{0_y} \\cdot t + \\frac{1}{2} \\cdot g \\cdot t^2",
        variaveis: ["y", "y_0", "v_{0_y}", "t", "g"]
    },
    {
        nome: "Componente vertical da velocidade inicial",
        formula: "v_{0_y} = \\left|\\vec{v_0}\\right| \\cdot sen \\theta",
        variaveis: ["v_{0_y}", "\\left|\\vec{v_0}\\right|", "\\theta"]
    },
    {
        nome: "Alcance máximo do projétil horizontalmente",
        formula: "R = \\frac{\\left|\\vec{v_0}\\right|^2 \\cdot sen(2 \\cdot \\theta)}{g}",
        variaveis: ["R", "\\vec{v_0}", "g"]
    },
    {
        nome: "Posição angular",
        formula: "\\phi = \\frac{S}{r}",
        variaveis: ["\\phi", "S", "r"]
    },
    {
        nome: "Deslocamento angular",
        formula: "\\Delta \\phi = \\frac{\\Delta S}{r}",
        variaveis: ["\\Delta \\phi", "\\Delta S", "r"]
    },
    {
        nome: "Velocidade angular",
        formula: "\\omega = \\frac{\\Delta\\phi}{t}",
        variaveis: ["\\omega", "\\Delta\\phi", "t"]
    },
    {
        nome: "Aceleração angular",
        formula: "\\alpha = \\frac{\\Delta \\omega}{t}",
        variaveis: ["\\alpha", "\\Delta \\omega", "t"]
    },
    {
        nome: "Função horária da posição angular no movimento circular uniforme",
        formula: "\\phi = \\phi_0 + \\omega \\cdot t",
        variaveis: ["\\phi", "\\phi_0", "\\omega", "t"]
    },
    {
        nome: "Função horária da velocidade angular",
        formula: "\\omega = \\omega_0 + \\alpha \\cdot t",
        variaveis: ["\\omega", "\\omega_0", "\\alpha", "t"]
    },
    {
        nome: "Equação de Torricelli para movimento circular",
        formula: "\\omega^2 = \\omega_0^2 + 2 \\cdot \\alpha \\cdot \\Delta \\phi",
        variaveis: ["\\omega", "\\omega_0", "\\alpha", "\\Delta \\phi"]
    },
    {
        nome: "Aceleração centrípeta",
        formula: "a_{CP} = \\frac{v^2}{r}",
        variaveis: ["a_{CP}", "v", "r"]
    },
    {
        nome: "Aceleração centrípeta",
        formula: "a_{CP} = \\omega^2 \\cdot r",
        variaveis: ["a_{CP}", "\\omega", "r"]
    },
];

export default cinematica; 