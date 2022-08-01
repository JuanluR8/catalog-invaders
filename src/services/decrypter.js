'use strict';

/*
  As the hint says, digits are always sorted lower to higher, so I treated them as indexes
  I could use the `findIndex` method, giving me a O(n log n) complexity function
  Instead of that, I just travel the `code` just one time, getting a O(n) function
*/

/**
 * @description build dictionary to be use on decrypt
 * @param {String} code base to build dictionary decrypter
 * @returns {Object}  Object with structure { [char]: index }
 */
const buildDictionary = (code) => code
  .split('')
  .reduce((acc, char, index) => {
    return { ...acc, [char]: index };
  }, {});

/**
 * @description decrypt score from the code provided
 * @param {String} code base to decrypt
 * @param {String} encrypted encrypted code
 * @returns {String}  decrypted score
 */
const decrypt = (code, encrypted) => {

  const dictionary = buildDictionary(code);

  return encrypted
    .split('')
    .map((char) => dictionary[char])
    .join('');
};

module.exports = decrypt;