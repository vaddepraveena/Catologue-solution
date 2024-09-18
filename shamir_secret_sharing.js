const BigInt = require('big-integer');

// Decodes the value from the specified base
function decodeValue(base, value) {
    return BigInt(value, base); // Using BigInt to handle large numbers
}

// Lagrange interpolation to find the constant term (c)
function lagrangeInterpolation(points, k) {
    let constantTerm = BigInt(0);

    for (let i = 0; i < k; i++) {
        let [xi, yi] = points[i];
        let numerator = BigInt(1);
        let denominator = BigInt(1);

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [xj] = points[j];
                numerator = numerator.multiply(xj);
                denominator = denominator.multiply(xj.subtract(xi));
            }
        }

        let li = numerator.divide(denominator);
        constantTerm = constantTerm.add(yi.multiply(li));
    }

    return constantTerm;
}

// Function to process the input and find the constant term
function findSecret(jsonInput) {
    const n = jsonInput.keys.n;
    const k = jsonInput.keys.k;

    let points = [];

    // Loop through the input roots
    for (let i = 1; i <= n; i++) {
        const base = parseInt(jsonInput[i].base);
        const value = jsonInput[i].value;
        const decodedValue = decodeValue(base, value);
        points.push([BigInt(i), decodedValue]);
    }

    // Calculate the constant term 'c' using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(points, k);
    return constantTerm;
}

// Example test case
const jsonInput = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
};

// Execute and find the secret
const secret = findSecret(jsonInput);
console.log("Secret (constant term 'c'): ", secret.toString());