/*boton q queremos q haga la funcion*/
const themeToggle = document.getElementById('theme-toggle');

const toggleTheme = () => {
    const temaActual = document.body.getAttribute('data-theme');
    if(temaActual === 'dark') {
        document.body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙'; //cambia el contenido del boton
        localStorage.setItem('theme', 'light'); //Guardar la pagina donde se quedo
        //console.log('Modo claro');
    }else {
        /*el setAttribute ayuda a volver a poner los atributos q se elimino anteriormente*/
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark'); /*almacena en el cache del navegador*/
        /*setItem = guarda el elemento*/
        /*theme = etiqueta
          dark = valor*/

        // console.log('Modo oscuro');
    }
};

/*llamamos a la constante themeToggle y si hace click activa la funcion toggleTheme*/
themeToggle.addEventListener('click', toggleTheme);
//console.log('Boton de tema configurado');

const cargarTema = () => {
    const temaGuardado = localStorage.getItem('theme');
    if(temaGuardado === 'dark') {
        document.body.setAttribute('data-theme', 'dark'); //Para colocar un atributo
        themeToggle.textContent = '☀️';
        //console.log('Tema oscuro cargado');
        return;
    }

    if(temaGuardado === 'light') {
        document.body.removeAttribute('data-theme'); //Para colocar un atributo
        themeToggle.textContent = '🌙';
        //console.log('Tema claro cargado');
        return;
        //DETECTAR PREFERENCIA DEL SISTEMA
    }

    /*(prefers-color-scheme: dark) = por defecto como mostrara la pagina al entrar por primera ves*/
    const prefierOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches; //matchMedia= Nos va a permitir consultar la preferencia del sistema
    /*.matches: transforma el resultado en boolean. True si el sistema del usuario efectivamente está configurado en modo oscuro, 
                                                    o un false si no lo está.*/

    if(prefierOscuro) {
        document.body.setAttribute('data-theme', 'dark'); //Para colocar un atributo
        themeToggle.textContent = '☀️';
        //console.log('Tema oscuro detectado del Sistema ');
    }else{
        document.body.removeAttribute('data-theme'); //Para colocar un atributo
        themeToggle.textContent = '🌙';
        //console.log('Tema claro detectado del Sistema ');
    }
};

themeToggle.addEventListener('click', toggleTheme);
//console.log('Boton de tema configurado');

cargarTema();


/*  REGISTRO */
/* arreglo unificado a 'peliculas' */
let peliculas = [
    {   /*objeto:*/
        id:1,
        titulo:'El padrino',
        genero: 'Drama',
        año: 1972,
        calificacion: 8.5,
        vista: true
    },
    {   /*objeto:*/
        id:2,
        titulo:'Titanic',
        genero: 'Romance',
        año: 1971,
        calificacion: 7.1,
        vista: false
    },
    {   /*objeto:*/
        id:3,
        titulo:'Inception',
        genero: 'Ciencia Ficción',
        año: 2010,
        calificacion: 9.0,
        vista: false
    }
];

/*variable*/
let nextId = 4;

/*filtros*/
let filtroGenero = '';
let filtroEstado = '';
let busqueda = '';

/* document enlazo con el js y lo almaceno en form */
const form = document.getElementById('movie-form');

const inputTitulo = document.getElementById('titulo');
const inputGenero = document.getElementById('genero');
const inputAño = document.getElementById('año');
const inputCalificacion = document.getElementById('calificacion');

const inputBusqueda = document.getElementById('search');
const notificacion = document.getElementById('notification');
const inputFilterGenero = document.getElementById('filter-genero');
const inputFilterEstado = document.getElementById('filter-estado');
const inputFilterClear = document.getElementById('clear-filters');

const inputTotal = document.getElementById('stats-total');
const inputVistas = document.getElementById('stats-vistas');
const inputPendientes = document.getElementById('stats-pendientes');
const inputPromedio = document.getElementById('stats-promedio');
const moviesGrid = document.getElementById('movies-grid');
const moviesEmpty = document.getElementById('movies-empty');

/* Obtener películas filtradas */
const obtenerPeliculasFiltradas = () =>{
    let resultado = [...peliculas];
    
    if(busqueda && busqueda.trim() !== ''){
        resultado = resultado.filter(p =>
            p.titulo.toLowerCase().includes(busqueda.toLowerCase())
        );
    }

    if(filtroGenero && filtroGenero.trim() !== ''){
        resultado = resultado.filter(p =>
            p.genero === filtroGenero
        );
    }

    if(filtroEstado === 'vistas'){
        resultado = resultado.filter(p => p.vista === true);
    } else if(filtroEstado === 'pendientes'){
        resultado = resultado.filter(p => p.vista === false);
    }

    return resultado;
}

/* Actualizar estadísticas y promedios */
const actualizarEstadisticas = () => {
    const total = peliculas.length;
    const vistas = peliculas.filter(p => p.vista).length;
    const pendientes = total - vistas;
    
    let sumaCalificaciones = peliculas.reduce((acc, p) => acc + p.calificacion, 0);
    let promedio = total > 0 ? (sumaCalificaciones / total).toFixed(1) : '0.0';

    inputTotal.textContent = total;
    inputVistas.textContent = vistas;
    inputPendientes.textContent = pendientes;
    inputPromedio.textContent = promedio;
};

/* Crear tarjeta individual */
const crearTargetaPelicula = (peliculaItem) => {
    const article = document.createElement('article');
    article.className = 'movie-card';

    const {id, titulo, genero, año, calificacion, vista} = peliculaItem;
    if(vista){
        article.classList.add('movie-card--viewed');
    }
    
    article.innerHTML = `
        <h3 class="movie-card__title">${titulo}</h3>
        <p class="movie-card__info">${genero} • ${año}</p>
        <p class="movie-card__rating">⭐️ ${calificacion}/10</p>
        <div class="movie-card__actions">
            <button class="movie-card__button movie-card__button--toggle" data-id="${id}">
                ${vista ? 'Marcar pendiente' : 'Marcar vista'}
            </button>
            <button class="movie-card__button movie-card__button--delete" data-id="${id}">
                Eliminar
            </button>
        </div>
    `;

    // Evento para cambiar estado (vista/pendiente)
    const btnToggle = article.querySelector('.movie-card__button--toggle');
    btnToggle.addEventListener('click', () => {
        peliculas = peliculas.map(p => p.id === id ? {...p, vista: !p.vista} : p);
        renderizarPeliculas();
        actualizarEstadisticas();
    });

    // Evento para eliminar película
    const btnDelete = article.querySelector('.movie-card__button--delete');
    btnDelete.addEventListener('click', () => {
        peliculas = peliculas.filter(p => p.id !== id);
        renderizarPeliculas();
        actualizarEstadisticas();
        mostrarNotificacion('Película eliminada', 'error');
    });

    return article;
}

/* Renderizar la lista en pantalla */
const renderizarPeliculas = () =>{
    const peliculasFiltradas = obtenerPeliculasFiltradas();
    moviesGrid.innerHTML = '';
    
    if(peliculasFiltradas.length === 0){
        moviesEmpty.style.display = 'block';
        return;
    }
    moviesEmpty.style.display = 'none';
    
    peliculasFiltradas.forEach(p => {
        const tarjeta = crearTargetaPelicula(p);
        moviesGrid.appendChild(tarjeta);
    });
};

/* TOAST / NOTIFICACIONES */
const mostrarNotificacion = (mensaje, tipo='success') =>{
    notificacion.textContent = mensaje;
    notificacion.className = 'notification';
    if(tipo === 'success'){
        notificacion.classList.add('notification--success');
    }else{
        notificacion.classList.add('notification--error');
    }
    notificacion.classList.add('notification--show');
    setTimeout(() =>{
        notificacion.classList.remove('notification--show');
    }, 3000);   
};

/* AGREGAR PELÍCULA DESDE EL FORMULARIO */
const agregarPelicula = (evento) => {
    evento.preventDefault();
    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value.trim();
    const año = parseInt(inputAño.value);
    const calificacion = parseFloat(inputCalificacion.value);

    if(!titulo || !genero || isNaN(año) || isNaN(calificacion)){
        mostrarNotificacion('ERROR: Complete todos los campos', 'error');
        return;
    }

    if(calificacion > 10 || calificacion < 1){
        mostrarNotificacion('ERROR: la calificación debe estar entre 1 y 10', 'error');
        return;
    }

    const nuevaPelicula = {
        id: nextId,
        titulo: titulo,
        genero: genero,
        año: año,
        calificacion: calificacion,
        vista: false
    };

    peliculas = [...peliculas, nuevaPelicula];
    nextId++;

    form.reset();
    renderizarPeliculas();
    actualizarEstadisticas();
    mostrarNotificacion(`'${titulo}' agregado con éxito`);
};

/* Escuchador del formulario */
form.addEventListener('submit', agregarPelicula);

/* Escuchador del buscador */
if(inputBusqueda) {
    inputBusqueda.addEventListener('input', (e) => {
        busqueda = e.target.value;
        renderizarPeliculas();
    });
}

/* Carga inicial al abrir la página */
renderizarPeliculas();
actualizarEstadisticas();