Problem-Statement:
In this assignment, you'll work on a simplified version of Shamir's Secret Sharing algorithm.

Consider an unknown polynomial of degree m. You would require m+1 roots of the polynomial to solve for the coefficients, represented as k = m + 1.

An unknown polynomial of degree m can be represented as:

f(x) = a_m x^m + a_{m-1} x^{m-1} + ... + a_1 x + c

Where:

- f(x) is the polynomial function
- m is the degree of the polynomial
- a_m, a_{m-1}, ..., a_1, c are coefficients (real numbers)
- a_m ≠ 0 (since it's the highest degree term, ensuring the polynomial is of degree m)

This representation shows that a polynomial of degree m is a sum of terms, where each term is a coefficient multiplied by a power of x. The highest power of x is m, and the powers decrease by 1 for each subsequent term until we reach the constant term c, which has no x.

The task is to find the constant term i.e, ‘c’ of the polynomial with the given roots. However, the points are not provided directly but in a specific format.

You need to read the input from the test cases provided in JSON format.

### Sample Test Case:

json
{
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
}


*n:* The number of roots provided in the given JSON
*k:* The minimum number of roots required to solve for the coefficients of the polynomial
k = m + 1, where m is the degree of the polynomial

### Root Format Example:

json
"2": {
    "base": "2",
    "value": "111"
}


Consider the above root as (x, y):

- x is the key of the object (in this case, x = 2)
- y value is encoded with a given base
- Decode y value: 111 in base 2 is 7
- Therefore, x = 2 and y = 7

You can use any known method to find the coefficients of the polynomial, such as:

- Lagrange interpolation
- Matrix method
- Gauss elimination

Solve for the constant term of the polynomial, typically represented as c.

### Assignment Checkpoints:

- *1. Read the Test Case (Input)*
    - Parse and read the input provided in JSON format, which contains a series of polynomial roots
- *2. Decode the Y Values*
    - Correctly decode the Y values that are encoded using different bases
- *3. Find the Secret (C)*
    - Calculate the secret c using the decoded Y values and any known method

*Output:* Print ‘c’.

Explanation of the Code:
Lagrange Interpolation Function:

This function takes in a set of points and calculates the secret using the Lagrange formula. Each point is represented as a pair (xi, yi).
decodeYValue Function:

This function takes the base and the encoded string and converts it to a base-10 integer using parseInt(value, base).
parseInput Function:

This function reads the JSON input, extracts the (x, y) pairs, decodes y, and returns a list of points.
Execution:

You input the JSON data, the program decodes and processes the values, and then it computes the constant c of the polynomial.
