/* 1. PRIMERO: Variables y elementos del DOM (¡Absolutamente arriba del todo!) */
const API_KEY = 'b6dd516c53da5eb99f9461cc4ef3b5a8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const moviesgrid = document.getElementById('movies-grid');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('error-message');


/* 2. SEGUNDO: Tus funciones auxiliares con const */
const mostrarLoading = () => {
    loadingDiv.style.display = 'flex';
    errorDiv.style.display = 'none';
    moviesgrid.innerHTML = '';
};

const ocultarLoading = () => {
    loadingDiv.style.display = 'none';
};

const mostrarError = (mensaje) => {
    ocultarLoading();
    if (errorMessage) errorMessage.textContent = mensaje;
    errorDiv.style.display = 'flex';
    moviesgrid.innerHTML = '';
};

const obtenerPeliculas = async () => {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.results;
};

const crearTarjeta = (pelicula) => {
    const { title, release_date, vote_average, poster_path, overview } = pelicula;
    const año = release_date ? release_date.split('-')[0] : 'N/A';
    const imagen = poster_path ? `${IMAGE_URL}${poster_path}` : '';
    const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
    
    return `
        <article class="movie-card">
            <div class="movie-card__poster">
                <img class="movie-card__image" src="${imagen}" alt="${title}">
                <span class="movie-card__rating">⭐ ${rating}</span>
            </div>
            <div class="movie-card__content">
                <h3 class="movie-card__title">${title}</h3>
                <span class="movie-card__year">${año}</span>
                <p class="movie-card__overview">${overview || 'Sin descripción disponible.'}</p>
            </div>
        </article>
    `;
};


/* 3. TERCERO: Función principal */
const iniciar = async () => {
    console.log('Mostrar película');
    mostrarLoading(); 

    try {
        const peliculas = await obtenerPeliculas();
        console.log(`${peliculas.length} películas obtenidas`);
        ocultarLoading();
        moviesgrid.innerHTML = peliculas.map(crearTarjeta).join('');
        console.log('Primera película renderizada');
    } catch (error) {
        console.log('Error', error);
        let mensaje = 'No se pudo cargar películas';
        if (error.message && error.message.includes('401')) {
            mensaje = 'API Key inválida, verifica tu clave';
        } else if (error.message && error.message.includes('fetch')) {
            mensaje = 'Error de red';
        } else if (error.message && error.message.includes('429')) {
            mensaje = 'Existen demasiadas peticiones. Espera un momento';
        }

        mostrarError(mensaje);
    }
};


/* 4. CUARTO: Ejecución */
iniciar();

const searchInput = document.getElementById('search');
const buscarPeliculas = async (texto) => {
    if (!texto || texto.trim() === '') {
        return obtenerPeliculas();
    }

    const query = encodeURIComponent(texto.trim());
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES &query=${query}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.results;
};

let timeoutBusqueda = null;
searchInput.addEventListener('input', (evento) => {
    const texto = evento.target.value;
    clearTimeout(timeoutBusqueda);
    timeoutBusqueda = setTimeout(async () => {
        console.log(`Buscando ${texto}`);
        mostrarLoading();
        try {
            const peliculas = await buscarPeliculas(texto);
            ocultarLoading();
            if (peliculas.length === 0) {
                moviesgrid.innerHTML = `
                    <p>Non se encontro la pelicula: ${texto}</p>
                `;
                return;
            }
            moviesgrid.innerHTML = peliculas.map(crearTarjeta).join('');
            console.log(`${peliculas.length} resultados`);
        } catch(error) {
            console.error('Error de busqueda', error);
            mostrarError('Error al buscar la pelicula');
        }
    }, 500);
});

/*const probarApi=async() =>{
    const url=${BASE_URL}/movie/popular?api_key = ${API_KEY}$language = es-ES;
    console.log('Url de a peticion', url);
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    console.log('Respuesta completa', datos);
    console.log('Peliculas', datos.results);
    console.log('Total de resultados', datos.total_results);
}*/


//probarApi();