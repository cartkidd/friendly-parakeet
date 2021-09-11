// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword(pass) {
  var passwordText = document.querySelector("#password");
  passwordText.value = pass;
}

// Add event listener to generate button
generateBtn.addEventListener("click", openModal);

function generatePassword(){
  if (!validateForm()){
    alert("Please check at least one Password Criteria and make sure length is between 8 - 128!")
    return;
  }
  var specialChars = getSpecialChars()
  var passLength = getPassLength()
  var extraParams = getExtraParams()
  
  var generatedPass = create(specialChars, passLength, extraParams);

  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  writePassword(generatedPass)
}

function openModal() {
    // Get the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // get the create btn
  var createBtn = document.getElementById("createBtn")

  // create the password
  createBtn.onclick = function() {
     generatePassword()
  }


  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function validateForm(){
  var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
  return markedCheckbox.length;
}

function getSpecialChars(){
  var markedCheckbox = document.querySelectorAll('input[name="specialChar"]:checked');
  var chars = "";
  
  if (markedCheckbox.length > 0){
    for(var i=0; i < markedCheckbox.length; i++){
      chars += markedCheckbox[i].value
    }
  }
 
  return chars;
}

function getPassLength() {
  var passwordLength = document.querySelector("#passLength");
  return passwordLength.value;
}


function getExtraParams(){
  var markedCheckbox = document.querySelectorAll('input[name="extraCase"]:checked');
  var extraParams = {upperCase: false, lowerCase: false, includeNumbers: false};
  if (markedCheckbox.length == 0){
     return extraParams
  }
  for (let index = 0; index < markedCheckbox.length; index++) {
    extraParams[markedCheckbox[index].value] = true;
  }
  return extraParams
}

function create(chars, length, params) {

  console.log(chars, length, params)
  // start with lowercase plus extra chars
  var pwdChars = "";

  if(chars != ""){
    pwdChars += chars;
  }

  // if lowercase is included 
  if(params.lowerCase){
    pwdChars += "abcdefghijklmnopqrstuvwxyz"
  }
  // check if numbers are included
  if (params.includeNumbers) {
    pwdChars += "0123456789"
  }

  // check if upercase is included
  if (params.upperCase){
    pwdChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }

  var pwdLen = parseInt(length);
  
  // random generator does not garantee EVERY special char is included
  var randPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');

  return randPassword
}
function handleChange(input) {
  console.log(input)
  if (input.value < 8) alert("value must be greater than 8");
  if (input.value > 128) alert("value must be less than 128");
}

// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page