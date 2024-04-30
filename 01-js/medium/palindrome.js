/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  str = str.split("").filter((ch) => ch >= "a" && ch <= "z").join("");
  let strCopy = str;
  strCopy = strCopy.split("").reverse().join("");
  return str === strCopy;
}

module.exports = isPalindrome;
