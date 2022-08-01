'use strict';

const fs = require('fs');
const path = require('path');

const DELIMITER = ',';

/**
 * @description parse csv content
 * @param {String} filename filename to read
 * @returns {Object} Csv file headers and data
 */
const readCsv = (filename) => {

  const filePath = path.join(__dirname, '../../', 'data', filename);

  const [headersText, ...inputContent] = fs.readFileSync(filePath)
    .toString()
    .split('\n');

  const headers = headersText.split(DELIMITER);

  const data = inputContent.map((row) => {

    const values = row.split(DELIMITER);

    const map = new Map();

    headers.forEach((header, index) => map.set(header, values[index]));

    return Object.fromEntries(map);
  });

  console.log(`File ${filename} read successfully`);

  return { headers, data };
};

/**
 * @description write csv file
 * @param {String} filename filename to read
 * @param {Object} content  csv content to write
 */
const writeCsv = (filename, content) => {

  const { headers, data } = content;

  const csvHeaders = headers.join(DELIMITER);
  const csvData = data.map((info) => Object.values(info).join(DELIMITER));

  const csvContent = [csvHeaders, ...csvData].join('\n');

  const filePath = path.join(__dirname, '../../', 'data', filename);

  fs.writeFileSync(filePath, csvContent);

  console.log(`File ${filename} successfully written`);
};

module.exports = { readCsv, writeCsv };