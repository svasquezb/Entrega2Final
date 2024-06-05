const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  fetch('http://localhost:3001/api/registros', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ usuario: username, email: email, contraseña: password })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert(data.message);
    window.location.href = 'login.html';
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al registrar el usuario');
  });
});