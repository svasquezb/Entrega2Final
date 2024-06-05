//let loggedInUser = null;


const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3001/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('loggedInUser', username);
      alert('Inicio de sesión exitoso');
      window.location.href = 'index.html';
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al iniciar sesión');
  });
});