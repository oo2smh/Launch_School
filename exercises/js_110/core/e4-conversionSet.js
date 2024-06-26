/*
1. Convert String to a Number
Without using built in conversion methods, convert stringified number into a
number

2. Convert a String to a Signed Number Write a fn that takes a string of digits
and returns the appropriate numbers as an integer. The string should have a
leading + or - sign. If there is no sign, return a positive number. You may
assume that the string will always contain a valid number.

3. Write a function that converts a non-negative integer value (e.g., 0, 1, 2,
3, and so on) to the string representation of that integer.

4. Extension of problem #3, but allowing for negative numbers

You may not use any of the standard conversion functions available in
JavaScript, such as String(), Number.prototype.toString, or an expression such
as '' + number. Your function should do this the old-fashioned way and construct
the string by analyzing and manipulating the number.k
*/

function stringToInteger(str) {
  const NUMBERS_LIST = {};
  for (let number = 0; number <= 9; number++) {
    NUMBERS_LIST[number] = number;
  }

  let arrayOfDigits = [...str].map((char) => NUMBERS_LIST[char]);
  let newNumber = 0;
  arrayOfDigits.forEach((digit) => {
    newNumber *= 10;
    newNumber += digit;
  });
  return newNumber;
}

function stringToSignedInteger(str) {
  let isNegative = false;
  if (str[0] === "-") isNegative = true;
  if (/[+-]/.test(str[0])) str = str.slice(1);
  let newNumber = stringToInteger(str);
  return isNegative ? -newNumber : newNumber;
}

function integerToString(int) {
  let DIGITS_DICT = { ..."0123456789" };
  let result = "";

  do {
    let remainder = int % 10;
    int = Math.floor(int / 10);

    result = DIGITS_DICT[remainder] + result;
  } while (int > 0);

  return result;
}

function signedIntegerToString(int) {
  let isNegative = false;
  if (Math.sign(int) === -1 || Object.is(int, -0)) {
    int = Math.abs(int);
    isNegative = true;
  }
  let intString = integerToString(int);
  if (intString === "0" && !isNegative) return intString;
  return isNegative ? `-${intString}` : `+${intString}`;
}

// TESTS
function runTest(fn) {
  switch (fn) {
    case "stringToInteger":
      console.log(
        stringToInteger("4321") === 4321,
        stringToInteger("100") === 100,
      );
      break;
    case "stringToSignedInteger":
      console.log(
        stringToSignedInteger("4321") === 4321, // logs true
        stringToSignedInteger("-570") === -570, // logs true
        stringToSignedInteger("+100") === 100, // logs true
      );
      break;
    case "integerToString":
      console.log(
        integerToString(4321) === "4321", // "4321"
        integerToString(0) === "0", // "0"
        integerToString(5000) === "5000", // "5000"
        integerToString(1234567890) === "1234567890", // "1234567890"
      );
      break;
    case "signedIntegerToString":
      console.log(signedIntegerToString(4321) === "+4321");
      console.log(signedIntegerToString(-123) === "-123");
      console.log(signedIntegerToString(0) === "0");
      console.log(signedIntegerToString(-0) === "-0");

      break;
  }
}

// runTest("stringToInteger");
// runTest("stringToSignedInteger");
// runTest("integerToString");
runTest("signedIntegerToString");
