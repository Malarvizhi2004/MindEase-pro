const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const authBtn = document.getElementById('authButton');
const formTitle = document.getElementById('formTitle');
const toggleForm = document.getElementById('toggleForm');
const message = document.getElementById('message');
const forgotPassword = document.getElementById('forgotPassword');
const resetBox = document.getElementById('resetBox');
const resetEmail = document.getElementById('resetEmail');
const newResetPassword = document.getElementById('newResetPassword');
const resetBtn = document.getElementById('resetBtn');

let isSignUp = true;

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || {};
}

function saveUser(email, password) {
  const users = getUsers();
  users[email] = password;
  localStorage.setItem('users', JSON.stringify(users));
}

function userExists(email) {
  const users = getUsers();
  return users.hasOwnProperty(email);
}

function showMessage(msg, color = "yellow") {
  message.style.color = color;
  message.textContent = msg;
  message.style.opacity = 1;

  setTimeout(() => {
    message.style.opacity = 0;
  }, 3000);
}

const confirmPasswordGroup = document.getElementById('confirmPasswordGroup'); // ✅ Add this

toggleForm.addEventListener('click', () => {
  isSignUp = !isSignUp;
  formTitle.textContent = isSignUp ? "Sign Up" : "Sign In";
  authBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
  toggleForm.textContent = isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up";
  confirmPasswordGroup.style.display = isSignUp ? "block" : "none";  // ✅ Use group, not just input
  message.textContent = "";
});


authBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passInput.value.trim();
  const confirm = confirmInput.value.trim();

  if (!email || !password || (isSignUp && !confirm)) {
    showMessage("Please fill in all fields", "red");
    return;
  }

  const users = getUsers();

  if (isSignUp) {
    if (userExists(email)) {
      showMessage("This email is already registered", "red");
      return;
    }
    if (password !== confirm) {
      showMessage("Passwords do not match", "red");
      return;
    }

    saveUser(email, password);
    showMessage("Registration successful. Please sign in.", "lightgreen");

    isSignUp = false;
    formTitle.textContent = "Sign In";
    authBtn.textContent = "Sign In";
    toggleForm.textContent = "Don't have an account? Sign Up";
    confirmInput.style.display = "none";
    emailInput.value = "";
    passInput.value = "";
    confirmInput.value = "";
  } else {
    if (!userExists(email)) {
      showMessage("Email not found. Please sign up first.", "red");
      return;
    }
    if (users[email] !== password) {
      showMessage("Incorrect password", "red");
      return;
    }

    const loginTime = new Date().toLocaleString();
    localStorage.setItem('loggedInUser', email);
    localStorage.setItem('loggedInPassword', password);
    localStorage.setItem('loginTime', loginTime);
    window.location.href = "home.html";
  }
});

// Show reset form, hide login/signup
forgotPassword.addEventListener('click', () => {
  resetBox.style.display = "block";
  authBox.style.display = "none";
});

// Reset password and return to login form
resetBtn.addEventListener('click', () => {
  const email = resetEmail.value.trim();
  const newPass = newResetPassword.value.trim();

  if (!email || !newPass) {
    showMessage("Please fill in all reset fields", "red");
    return;
  }

  const users = getUsers();

  if (!userExists(email)) {
    showMessage("Email not found", "red");
    return;
  }

  users[email] = newPass;
  localStorage.setItem('users', JSON.stringify(users));
  showMessage("Password reset successfully!", "lightgreen");

  resetBox.style.display = "none";
  authBox.style.display = "block"; // ✅ Show login form again

  resetEmail.value = "";
  newResetPassword.value = "";
});
