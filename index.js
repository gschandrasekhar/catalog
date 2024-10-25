const fs = require("fs");

function decodeValue(value, base) {
  return parseInt(value, base);
}

function lagrangeInterpolation(points, x) {
  let total = 0;

  for (let i = 0; i < points.length; i++) {
    const [xi, yi] = points[i];
    let term = yi;

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const xj = points[j][0];
        term *= (x - xj) / (xi - xj);
      }
    }

    total += term;
  }

  return total;
}

function computeSecretFromFile(filePath) {
  const data = fs.readFileSync(filePath);
  const jsonData = JSON.parse(data);

  const n = jsonData.keys.n;
  const k = jsonData.keys.k;

  const points = [];

  for (let i = 1; i <= n; i++) {
    if (jsonData[i]) {
      const base = parseInt(jsonData[i].base);
      const value = jsonData[i].value;
      const decodedY = decodeValue(value, base);
      points.push([i, decodedY]);
    }
  }

  const secretC = lagrangeInterpolation(points, 0);
  console.log(`The secret (constant term c) is: ${secretC}`);
}

computeSecretFromFile("input.json");
