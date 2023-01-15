// Array of special characters to be included in password
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/*

===> Order in which things seem to be happening:

- Clicking "Generate Password" invokes function writePassword().
- In turn, function writePassword() invokes function generatePassword().
- In order for function generatePassword() to work properly, it will have to have sight of the user selected password options, which we can obtain from function getPasswordOptions().

===> Things we will need:

- We can use function getRandom(arr) to grab a random element from each of the available password options arrays (specialCharacters, numericCharacters, lowerCasedCharacters, and upperCasedCharacters).
- We need to capture the user selected password options in function getPasswordOptions() and run validation(s) on those same options.

===> Password length constraints/notes:

- Needs to be at least 10 characters long but no longer than 64 characters.
- Should only accept number as input, anything else should generate an alert.
- If no password length is entered, clicking "Cancel" on the prompt window returns null but clicking "OK" returns an empty string.

*/

// Function to prompt user for password options
function getPasswordOptions() {
  var lengthInput = prompt(
    "How long to do wish your new password to be? Please select a number between 10 and 64."
  );

  console.log(
    "lengthInput ===>",
    lengthInput,
    "\ntypeof lengthInput ===>",
    typeof lengthInput
  );
}

// Function for getting a random element from an array
function getRandom(arr) {}

// Function to generate password with user input
function generatePassword(userInput) {
  return;
}

// Get references to the #generate element
/*
querySelector is a method of Document; it returns the first Element within the document that matches the specified selector - in this case, "#generate" (and further down, "#password").
*/
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  /*
  Once we have gathered the user choices through function getPasswordOptions(), we can pass those passwordOptions onto function generatePassword().
  */
  var passwordOptions = getPasswordOptions();

  /*
  We then provide function generatePassword with the parameter passwordOptions, as it will need these to generate a correct password.
  */
  var password = generatePassword(passwordOptions);
  var passwordText = document.querySelector("#password");

  /*
  typeof passwordText is object, hence the dot notation below: we need to access value, the field where the actual password value will be.
  */
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
