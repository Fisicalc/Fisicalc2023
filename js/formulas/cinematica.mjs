const cinematica  = [
    {
        nome: "Velocidade Média",
        formula: "\\bar{v}=\\frac{\\Delta d}{\\Delta t}",
        variaveis: ["\\bar{v}", "\\Delta d", "\\Delta t"],
    },
    {
        nome: "Função horária do deslocamento",
        formula: "s = s_0 + v \\cdot \\Delta t",
        variaveis: ["s_0", "\\Delta v", "\\Delta t"]
    },
    {
        nome: "Aceleração média",
        formula: "\\bar{a} = \\frac{\\Delta v}{\\Delta t}",
        variaveis: ["\\bar{a}", "\\Delta v", "\\Delta t"]
    },
    {
        nome: "Função horária da velocidade",
        formula: "v = v_0 + at",
        variaveis: ["v", "v_0", "at"]
    },
    {
        nome: "Função horária da posição em função do tempo",
        formula: "s = s_0 + v_0t + \\frac{1}{2}at^2",
        variaveis: ["s", "s_0", "v_0", "t", "\\frac{1}{2}", "a"]
    },
    {
        nome: "Equação de Torricelli",
        formula: "v^2 = v_0^2 + 2a\\Delta d",
        variaveis: ["v", "v_0", "a", "d"]
    },
    {
        nome: "Função horária da velocidade no movimento vertical",
        formula: "v = v_0 \\pm gt",
        variaveis: ["v", "v_0", "g", "t"]
    },
    {
        nome: "Função horária da posição em função do tempo no movimento vertical",
        formula: "h = h_0 + v_0t \\pm \\frac{1}{2}gt^2",
        variaveis: ["h", "h_0", "v_0", "t", "g"]
    },
    {
        nome: "Equação de Torricelli no movimento vertical",
        formula: "v^2 = v_0^2 \\pm 2g\\Delta h",
        variaveis: ["v", "v_0", "g", "\\Delta h"]
    },
    {
        nome: "Função horária da posição horizontal",
        formula: "x = x_0 + v_0_x t",
        variaveis: ["x", "x_0", "v_0_x", "t"]
    },
    {
        nome: "Componente horizontal da velocidade inicial",
        formula: "v_0_x = |\\vec{v_0}| \\cdot cos\\theta",
        variaveis: ["v_0_x", "|\\vec{v_0}|", "\\theta"]
    },
    {
        nome: "Função horária da posição vertical",
        formula: "y = y_0 + v_0_y t + \\frac{1}{2} gt^2",
        variaveis: ["y", "y_0", "v_0_y", "t", "g"]
    },
    {
        nome: "Componente vertical da velocidade inicial",
        formula: "v_0_y = |\\vec{v_0}| \\cdot sen\\theta",
        variaveis: ["v_0_y", "v_0", "\\theta"]
    },
    {
        nome: "Alcance máximo do projétil horizontalmente",
        formula: "R = \\frac{|\\vec{v_0}|^2 \\cdot sen(2\\theta)}{g}",
        variaveis: ["R", "|\\vec{v_0}|", "v_0", "g"]
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
        formula: "\\omega = \\frac{\\Delta phi}{t}",
        variaveis: ["\\omega", "\\Delta phi", "t"]
    },
    {
        nome: "Aceleração angular",
        formula: "\\alpha = \\frac{\\Delta \\omega}{t}",
        variaveis: ["\\alpha", "\\Delta \\omega", "t"]
    },
    {
        nome: "Função horária da posição angular no movimento circular uniforme",
        formula: "\\phi = \\phi_0 + \\omega t",
        variaveis: ["\\phi", "\\phi_0", "\\omega", "t"]
    },
    {
        nome: "Função horária da velocidade angular",
        formula: "\\omega = \\omega_0 + \\alpha t",
        variaveis: ["\\omega", "\\omega_0", "\\alpha", "t"]
    },
    {
        nome: "Equação de Torricelli para movimento circular",
        formula: "\\omega^2 = \\omega_0^2 + 2\\alpha\\Delta\\phi",
        variaveis: ["\\omega", "\\omega_0", "\\alpha", "\\Delta\\phi"]
    },
    {
        nome: "Aceleração centrípeta",
        formula: "a_{CP} = \\frac{v^2}{r} = \\omega^2 r",
        variaveis: ["a_{CP}", "v", "r", "\\omega"]
    }
];

export default cinematica; 