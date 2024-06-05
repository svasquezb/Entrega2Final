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

  fetch('http://localhost:3001/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Registro exitoso');
        window.location.href = 'login.html';
      } else {
        alert('Error al registrar el usuario');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al registrar el usuario');
    });
});