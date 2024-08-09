// Dictionary to store user's data
const userdict = {
  username: "x",
  password: "f",
  birthday: "3 3 2024"
}

// Function to clear all input fields
function clearAll(){
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("createUsername").value = "";
  document.getElementById("create-date").value = "";
  document.getElementById("create-password").value = "";
  document.getElementById("repeat-password").value = "";
  document.getElementById("username_RecoverPassword").value = "";
  document.getElementById("Birthday_RecoverPassword").value = "";
  document.getElementById("passwordRecovery").value = "";
  document.getElementById("passwordRecovery2").value = "";
  checkData();
}

// Function to handle dialog when user already exists
function handleUserExistsDialog() {
  const userExistsDialog = document.getElementById("mydialog_UserExist");
  const closeButton = document.getElementById("btn_close_UserExist");
  userExistsDialog.showModal();
  closeButton.addEventListener("click", () => {
    userExistsDialog.close(); 
  });
}

// Function to handle dialog when user signs up
function handleUserSignUpDialog() {
  const dialog = document.getElementById("mydialog");
  const openButton = document.getElementById("Register-btn");
  const closeButton = document.getElementById("btn-close");

  dialog.showModal();
  closeButton.addEventListener("click", () => {
    dialog.close(); 
  });

  openButton.onclick = () => {
    sign_up();
  };
  clearAll();
}

// Function to handle dialog for password recovery
function handleRecoveryPasswordDialog() {
  const dialog = document.getElementById("dialog_RecoverPsw");
  const closeButton = document.getElementById("btn-close-RecoverPsw");
  dialog.showModal();
  closeButton.addEventListener("click", () => {
    document.getElementById("passwordRecovery").value = "";
    document.getElementById("passwordRecovery2").value = "";
    dialog.close(); 
  });
}

// Function to handle incorrect username or password
function handleIncorrectUserAndPassword() {
  const message = document.getElementById("Incorrect_SignUp");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username != userdict["username"] || password != userdict["password"]){
      message.innerHTML = "The username or password is incorrect.";
  }
}

// Function to check if user fulfills the requirements to sign up
function checkData(){
  // Verification flags
  let usernameVerified = false;
  let uppercaseVerified = false;
  let numberVerified = false;
  let specialCharVerified = false;
  let birthdayVerified = false;
  
  // Elements
  const username = document.getElementById("createUsername");
  const password = document.getElementById("create-password");
  const date = document.getElementById("create-date");
  const getBirthday = new Date(document.getElementById("create-date").value);

  // Birthday
  const birthDay = getBirthday.getDate()+1;
  const birthMonth = getBirthday.getMonth()+1;
  const birthYear = getBirthday.getFullYear();
  const birthdayUser = birthDay.toString() + " " + birthMonth.toString() + " " + birthYear.toString();

  // Messages
  const usernameMsg = document.getElementById("usernamechars");
  const uppercaseMsg = document.getElementById("capital_letter");
  const numberMsg = document.getElementById("number");
  const specialCharMsg = document.getElementById("special_character");
  const birthdayMsg = document.getElementById("birthday");

  // Checks
  const usernameCase = /[\d\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(username.value);
  const birthdayCase = /[0-9]/.test(date.value);
  const hasUpperCase = /[A-Z]/.test(password.value);
  const numberCase = /[0-9]/.test(password.value);
  const specialCharCase = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password.value);

  // Username verification
  if (usernameCase){
    usernameMsg.style.color = "rgb(121, 241, 0)";
    usernameVerified = true;
  } else {
    usernameMsg.style.color = "red";
    usernameVerified = false;
  }

  // Birthday verification
  if(birthdayCase){
    birthdayMsg.style.color = "rgb(121, 241, 0)";
    birthdayVerified = true;
  } else {
    birthdayMsg.style.color = "red";
    birthdayVerified = false;
  }

  // Uppercase verification
  if(hasUpperCase) {
    uppercaseMsg.style.color = "rgb(121, 241, 0)";
    uppercaseVerified = true;
  } else {
    uppercaseMsg.style.color = "red";
    uppercaseVerified = false;
  }

  // Number verification
  if(numberCase) {
    numberMsg.style.color = "rgb(121, 241, 0)";
    numberVerified = true;
  } else {
    numberMsg.style.color = "red";
    numberVerified = false;
  }

  // Special character verification
  if(specialCharCase){
    specialCharMsg.style.color = "rgb(121, 241, 0)";
    specialCharVerified = true;
  } else {
    specialCharMsg.style.color = "red";
    specialCharVerified = false;
  }

  return {
    usernameVerified,
    uppercaseVerified,
    numberVerified,
    specialCharVerified,
    birthdayVerified,
    birthdayUser
  };
}

// Function to check if both passwords match
function checkPassword(){
  const password = document.getElementById("create-password").value;
  const confirmPassword = document.getElementById("repeat-password").value;

  if (password == confirmPassword){
    document.getElementById("confirm_password_msg").style.color = "rgb(121, 241, 0)";
    document.getElementById("confirm_password_msg").innerHTML = "Password is the same";
    return true;
  } else {
    document.getElementById("confirm_password_msg").style.color = "red";
    document.getElementById("confirm_password_msg").innerHTML = "Password is not the same";
    return false;
  }
}

// Function to handle sign up process
function sign_up(){
  const finalUsername = document.getElementById("createUsername").value;
  const finalPassword = document.getElementById("create-password").value;
  
  const dataVerification = checkData();
  const passwordVerification = checkPassword();

  const {
    usernameVerified,
    uppercaseVerified,
    numberVerified,
    specialCharVerified,
    birthdayVerified,
    birthdayUser
  } = dataVerification;

  if(userdict["username"] == finalUsername){
    handleUserExistsDialog();
    return 0;
  }

  if (passwordVerification && usernameVerified && uppercaseVerified && numberVerified && specialCharVerified && birthdayVerified) {
    userdict["username"] = finalUsername;
    userdict["password"] = finalPassword;
    userdict["birthday"] = birthdayUser;
    handleUserSignUpDialog();
   }
}

// Function to verify sign in credentials
function sign_in_verification(){
  const usernameSignin = document.getElementById("username").value;
  const passwordSignin = document.getElementById("password").value;

  if (userdict["username"] == usernameSignin && userdict["password"] == passwordSignin){
    clearAll();
    window.location.href = "paint.html"
  } 
  else {
    document.getElementById("Login-ErrorText").innerHTML = "The username or password is incorrect.";
  }
}

// Function to open password recovery dialog
function openRecoveryPasswordDialog() {
  const usernameRecoverPsw = document.getElementById("username_RecoverPassword").value;
  const dateRecoverPsw = new Date(document.getElementById("Birthday_RecoverPassword").value);
  const birthDayPsw = dateRecoverPsw.getDate()+1;
  const birthMonthPsw = dateRecoverPsw.getMonth()+1;
  const birthYearPsw = dateRecoverPsw.getFullYear();
  const birthDayUserPsw = birthDayPsw.toString() + " " + birthMonthPsw.toString() + " " + birthYearPsw.toString();
  
  if(userdict["birthday"] == birthDayUserPsw && userdict["username"] == usernameRecoverPsw){
    handleRecoveryPasswordDialog();
  }
  else{
    const RecoverPassword_errorMsg = document.getElementById('recoverPassword_error');
    RecoverPassword_errorMsg.innerHTML = "The username or birthday is incorrect.";
  }
}

// Function to recover password
function recoverPassword(){
  const passwordRecovery = document.getElementById("passwordRecovery").value;
  const passwordRecovery2 = document.getElementById("passwordRecovery2").value;
  const capitalCaseRecovery = /[A-Z]/.test(passwordRecovery);
  const numberCaseRecovery = /[0-9]/.test(passwordRecovery);
  const specialCharCaseRecovery = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordRecovery);

  if(capitalCaseRecovery && numberCaseRecovery && specialCharCaseRecovery && passwordRecovery == passwordRecovery2){
    userdict["password"] = passwordRecovery;
    alert("Your password has been updated successfully");
    dialog_RecoverPsw.close(); 
    clearAll();
  } else {
    alert("The password must contain a capital letter, a number and a special character");
  }
}
