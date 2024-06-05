let games = []; // Declarar la variable 'games' fuera de la función de renderizado
let cartItems = [];
const gamesContainer = $('#games-list');

// Función para renderizar los juegos
function renderGames(gameData) {
  const gamesContainer = $('#games-list');
  gamesContainer.empty();

  gameData.forEach((game, index) => {
    const gameCard = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-text">Fecha de lanzamiento: ${game.released}</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#gameModal${index}">Ver más</button>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="gameModal${index}" tabindex="-1" role="dialog" aria-labelledby="gameModalLabel${index}" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="gameModalLabel${index}">${game.name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <img src="${game.background_image}" class="img-fluid" alt="${game.name}">
                </div>
                <div class="col-md-8">
                  <p><strong>Descripción:</strong> ${game.description_raw}</p>
                  <p><strong>Fecha de lanzamiento:</strong> ${game.released}</p>
                  <p><strong>Calificación:</strong> ${game.rating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    gamesContainer.append(gameCard);
  });
}

  // Verificar si hay un parámetro 'game' en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const gameName = urlParams.get('game');
  if (gameName) {
    const decodedGameName = decodeURIComponent(gameName);
    const game = games.find(game => game.name === decodedGameName);
    if (game) {
      const index = games.indexOf(game);
      $(`#gameModal${index}`).modal('show');
    }
  }


// Función para agregar un producto al carro
function addToCart(game) {
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    alert('Debes iniciar sesión para agregar productos al carro');
    window.location.href = 'login.html';
    return;
  } else {
    const existingItem = cartItems.find(item => item.name === game.name);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.subtotal = existingItem.price * existingItem.quantity;
    } else {
      const newItem = {
        name: game.name,
        price: game.rating,
        image: game.background_image,
        quantity: 1,
        subtotal: game.rating
      };
      cartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartItemCount(); // Actualizar el contador después de agregar un elemento al carro

    // Mostrar el modal de confirmación
    $('#addToCartModal').modal('show');
  }
}
// Evento para agregar un producto al carro
gamesContainer.on('click', '.add-to-cart', function() {
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    alert('Debes iniciar sesión para agregar productos al carro');
    window.location.href = 'login.html';
    return;
  }

  const gameId = $(this).data('id');
  const game = games.find(game => game.id === gameId);
  if (game) {
    addToCart(game);
  } else {
    console.error('Game not found with id:', gameId);
  }
});

// Obtener los juegos de la API
fetch('https://api.rawg.io/api/games?key=d03f6e1112694da0bcc1dd1bd019343b&dates=2019-09-01,2019-09-30&platforms=18,1,7')
  .then(response => response.json())
  .then(data => {
    renderGames(data.results);
  })
  .catch(error => console.error('Error al obtener los juegos:', error));