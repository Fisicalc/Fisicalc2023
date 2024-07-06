const termometria = [
    {
        nome: "Celsius para Fahrenheit",
        formula: "\\theta_C = \\frac{5\\theta_F - 160}{9}",
        variaveis: ["\\theta_C", "\\theta_F"]
    },
    {
        nome: "Fahrenheit para Celsius",
        formula: "\\theta_F = \\frac{9\\theta_C + 160}{5}",
        variaveis: ["\\theta_C", "\\theta_F"]
    },
    {
        nome: "Celsius para Kevin",
        formula: "T = \\theta c + 273",
        variaveis: ["T", "\\theta c"]
    },
    {
        nome: "Kevin para Celsius",
        formula: "\\theta c = T - 273",
        variaveis: ["\\theta c", "T"]
    }
];

export default termometria;