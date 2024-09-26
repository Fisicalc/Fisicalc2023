const eletrostatica = [
    {
        nome: "Carga elétrica",
        formula: "Q = n \\cdot e",
        variaveis: ["Q", "n", "e"]
    },
    {
        nome: "Lei de Coulomb",
        formula: "F = k \\cdot \\frac{Q_1 \\cdot Q_2}{d^2}",
        variaveis: ["F", "k", "Q_1", "Q_2", "d"]
    },
    {
        nome: "Intensidade do campo elétrico ",
        formula: "E = \\frac{F}{q}",
        variaveis: ["E", "F", "q"]        
    },
    {
        nome: "Intensidade do campo elétrico",
        formula: "E =  k \\cdot \\frac{Q}{d^2}",
        variaveis: ["E", "k", "Q", "d"]
    },
    {
        nome: "Energia potencial elétrica",
        formula: "E_p =  k \\cdot \\frac{Q \\cdot q}{d}",
        variaveis: ["E", "k", "Q", "d"]
    },
    {
        nome: "Potencial Elétrico",
        formula: "v = \\frac{E_p}{q}",
        variaveis: ["v", "E_p", "q"]        
    },
    {
        nome: "Potencial Elétrico",
        formula: "v = k \\cdot \\frac{Q}{d}",
        variaveis: ["v", "Q", "d"]        
    },
    {
        nome: "Trabalho de uma força elétrica",
        formula: "T_{a,b} = q \\cdot (v_a - v_b)",
        variaveis: ["T_{ab}", "q", "v_a", "v_b"]        
    },
    {
        nome: "Diferença de potencial",
        formula: "U = v_b - v_a",
        variaveis: ["U", "v_b", "v_a"]        
    },
    {
        nome: "Diferença de potencial",
        formula: "U = k \\cdot \\frac{Q}{\\Delta d_{ab}}",
        variaveis: ["U", "v_b", "v_a"]        
    },
];

export default eletrostatica;