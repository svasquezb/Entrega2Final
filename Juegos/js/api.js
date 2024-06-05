$(document).ready(function() {
    function renderGames(games) {
      const gamesContainer = $('#games-list');
      gamesContainer.empty();
  
      games.forEach(game => {
        const gameCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
              <div class="card-body">
                <h5 class="card-title">${game.name}</h5>
                <p class="card-text">${game.released}</p>
                <p class="card-text">Rating: ${game.rating}</p>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#gameModal${game.id}">Ver más</button>
              </div>
            </div>
          </div>
          <!-- Modal -->
          <div class="modal fade" id="gameModal${game.id}" tabindex="-1" role="dialog" aria-labelledby="gameModalLabel${game.id}" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="gameModalLabel${game.id}">${game.name}</h5>
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
                      <p><strong>Rating:</strong> ${game.rating}</p>
                      <button type="button" class="btn btn-success add-to-cart" data-name="${game.name}">Agregar al carrito</button>
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
  
    fetch('https://api.rawg.io/api/games?key=d03f6e1112694da0bcc1dd1bd019343b&dates=2019-09-01,2019-09-30&platforms=18,1,7')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los juegos');
        }
        return response.json();
      })
      .then(data => {
        renderGames(data.results);
      })
      .catch(error => {
        console.error('Error al obtener los juegos:', error);
      });
  });
  