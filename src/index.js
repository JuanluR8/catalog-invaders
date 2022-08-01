'use strict';

const { readCsv, writeCsv } = require('./services/csv');
const decrypter = require('./services/decrypter');

const { headers, data } = readCsv('input.csv');

headers.push('decryptedScore');

const byDecryptedScoreDesc = (a, b) => a.decryptedScore > b.decryptedScore ? -1 : 1;

console.log('Decrypt start');

const outputData = data
  .map((row) => {

    const { code, score } = row;

    const decryptedScore = decrypter(code, score);

    return { ...row, decryptedScore: parseInt(decryptedScore) };
  })
  .sort(byDecryptedScoreDesc);

console.log('Decrypt end');

writeCsv('output.csv', { headers, data: outputData });

process.exit(0);