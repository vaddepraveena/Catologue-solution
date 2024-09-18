const fs = require('fs');
function lagrangeInterpolation(points) {
    let secret = 0;

    for (let i = 0; i < points.length; i++) {
        let [xi, yi] = points[i];
        let term = yi;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj, _] = points[j];
                term *= -xj / (xi - xj);
            }
        }

        secret += term;
    }

    return Math.round(secret); 
}
function decodeYValue(base, value) {
    return parseInt(value, base);
}
function parseInput(input) {
    const { keys, ...pointsData } = input;
    const points = [];

    for (let x in pointsData) {
        const base = parseInt(pointsData[x].base);
        const yEncoded = pointsData[x].value;
        const yDecoded = decodeYValue(base, yEncoded);
        points.push([parseInt(x), yDecoded]);
    }

    return points;
}
const input = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};
const points = parseInput(input);
const secret = lagrangeInterpolation(points);
console.log("The secret constant 'c' is:", secret);