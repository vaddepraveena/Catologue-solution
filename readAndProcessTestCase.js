const fs = require('fs');
const bigInt = require('big-integer');

// Function to read and process a single test case
function readAndProcessTestCase(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            return;
        }

        const testCase = JSON.parse(data);
        console.log(`\nProcessing Test Case from ${fileName}:`);
        processTestCase(testCase);
    });
}

// Function to process the test case
function processTestCase(testCase) {
    const n = testCase.keys.n;
    const k = testCase.keys.k;

    let points = [];

    // Iterate over each root in the test case
    for (let i = 1; i <= n; i++) {
        if (testCase[i]) {
            const x = i;
            const base = parseInt(testCase[i].base, 10);
            const value = testCase[i].value;
            const y = bigInt(value, base).toJSNumber(); // Decode the value
            points.push({ x, y });
        }
    }

    // Implement Lagrange interpolation to find the constant term
    const constantTerm = lagrangeInterpolation(points, k);
    console.log(`Secret constant 'c' for this test case: ${constantTerm}`);
}

// Lagrange interpolation to find f(0) which is the constant term 'c'
function lagrangeInterpolation(points, k) {
    let c = 0; // constant term, which is f(0)

    for (let i = 0; i < k; i++) {
        let { x: xi, y: yi } = points[i];
        let term = yi;

        // Compute the Lagrange basis polynomial L_i(0)
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let { x: xj } = points[j];
                term *= (0 - xj) / (xi - xj); // L_i(0) = product of (0 - xj) / (xi - xj)
            }
        }

        // Add the term to the result for f(0)
        c += term;
    }

    return c;
}

// Read both test case files
readAndProcessTestCase('testcase1.json');
readAndProcessTestCase('testcase2.json');
