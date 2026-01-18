export const validateForm = (e) => {
  e.preventDefault();
  if (!email.trim() || !password.trim()) {
    alert("Please fill in all fields.");
    return false;
  }
  return true;
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }
  return true;
};

const validatePasswordsMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return false;
  } else {
    return true;
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formIsValid = validateForm(e);
  if (!formIsValid) {
    return;
  }
  const passwordIsValid = validatePassword(password);
  if (!passwordIsValid) {
    return;
  }
  const passwordsMatch = validatePasswordsMatch(password, confirmPassword);
  if (!passwordsMatch) {
    return;
  }
  register(email, password);
  alert("Bienvenid@, tu cuenta ha sido creada!");
};
