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

/*
Function to validate if the value the user is entering for password length is 1) valid and 2) not too short or too long. Best to do this first because if the password length is not the right input or size, no use in moving forward for the other options.
*/
function validatePasswordLength(userInput) {
  /*

  What we know about the value entered in the prompt:

  - If no password length is entered, clicking "Cancel" on the prompt window returns null but clicking "OK" returns an empty string.
  - Length needs to be a number between 10 and 64.

  */

  if (userInput === null || userInput === "") {
    return "Password must have a length between 10 and 64 characters. Please select a number that falls within this range.";
  }

  var inputNumber = Number(userInput);

  if (isNaN(inputNumber) || !inputNumber) {
    return "Password length needs to be a number between 10 and 64. Nothing other than numbers is allowed for length.";
  } else if (inputNumber < 10) {
    return "Your selected password length is too low, password needs to be at least 10 characters long (and at most 64).";
  } else if (inputNumber > 64) {
    return "Your selected password length is too high, password needs to be at most 64 characters long (and at least 10).";
  }

  return null;
}

// Function to prompt user for password options
function getPasswordOptions() {
  var userChoices = {
    length: 0,
    lowercase: false,
    uppercase: false,
    numeric: false,
    specialChars: false,
  };

  var lengthInput = prompt(
    "How long do you wish your new password to be? Please select a number between 10 and 64."
  );

  // console.log(
  //   "lengthInput ===>",
  //   lengthInput,
  //   `${lengthInput}`,
  //   "\ntypeof lengthInput ===>",
  //   typeof lengthInput
  // );

  var validation = validatePasswordLength(lengthInput);

  if (validation !== null) {
    alert(validation);
    return null;
  }

  userChoices["length"] = Number(lengthInput);
  userChoices["lowercase"] = confirm(
    "Do you want to include lowercase characters?"
  );
  userChoices["uppercase"] = confirm(
    "Do you want to include uppercase characters?"
  );
  userChoices["numeric"] = confirm(
    "Do you want to include numeric characters?"
  );
  userChoices["specialChars"] = confirm(
    "Do you want to include special characters?"
  );

  // console.log("userChoices ===>", userChoices);
  return userChoices;
}

// Function for getting a random element from an array
function getRandom(arr) {
  /*
  Once the user has selected which type of characters they want to include in their password, we will use this to randomly select characters from those arrays.
  */
  return arr[Math.floor(Math.random() * arr.length)];
}

/*
Function to further randomize the password we just generated.
*/
function randomizePassword(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var currentCharacter = array[i];
    array[i] = array[j];
    array[j] = currentCharacter;
  }

  return array;
}

// Function to generate password with user input
function generatePassword(userOptions) {
  if (userOptions === null) {
    return "";
  }

  var selectedCharacterTypes = [];

  var randomPassword = [];

  if (userOptions["lowercase"]) {
    randomPassword.push(getRandom(lowerCasedCharacters));
    selectedCharacterTypes =
      selectedCharacterTypes.concat(lowerCasedCharacters);
  }
  if (userOptions["uppercase"]) {
    randomPassword.push(getRandom(upperCasedCharacters));
    selectedCharacterTypes =
      selectedCharacterTypes.concat(upperCasedCharacters);
  }
  if (userOptions["numeric"]) {
    randomPassword.push(getRandom(numericCharacters));
    selectedCharacterTypes = selectedCharacterTypes.concat(numericCharacters);
  }
  if (userOptions["specialChars"]) {
    randomPassword.push(getRandom(specialCharacters));
    selectedCharacterTypes = selectedCharacterTypes.concat(specialCharacters);
  }

  // console.log(
  //   "selectedCharacterTypes",
  //   selectedCharacterTypes,
  //   "\nrandomPassword",
  //   randomPassword
  // );

  for (var i = randomPassword.length; i < userOptions["length"]; i++) {
    randomPassword.push(getRandom(selectedCharacterTypes));
  }

  /*
  If selectedCharacterTypes is empty, then no character type has been selected, which means no password can be generated.
  */
  if (!selectedCharacterTypes.length) {
    alert(
      "Unable to generate password. At least one character type must be selected."
    );
    return null;
  } else {
    return randomizePassword(randomPassword).join("");
  }
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
