const termometria = [
    {
        nome: "Fahrenheit para Celsius",
        formula: "\\theta_C = \\frac{5 \\cdot \\theta_F - 160}{9}",
        variaveis: ["\\theta_C", "\\theta_F"]
    },
    {
        nome: "Celsius para Fahrenheit",
        formula: "\\theta_F = \\frac{9 \\cdot \\theta_C + 160}{5}",
        variaveis: ["\\theta_F", "\\theta_C"]
    },
    {
        nome: "Celsius para Kevin",
        formula: "T = \\theta_C + 273",
        variaveis: ["T", "\\theta_C"]
    },
    {
        nome: "Kevin para Celsius",
        formula: "\\theta_C = T - 273",
        variaveis: ["\\theta_C", "T"]
    }
];

export default termometria;