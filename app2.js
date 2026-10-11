/*  conceccion basica*/
const API_KEY='';
const BASE_URL='https://api.themoviedb.org/3';
const IMAGE_URL='https://image.tmdb.org/t/p/w500';/* lo saco del a documentacion */
const moviesgrid=document.getElementById('movies-grid');

const obtenerPeliculas_= async () =>{
    const url=`${BASE_URL}/movie/popular?api_key = ${API_KEY}$language = es-ES`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.results;
}

const crearTarjeta=(pelicula) =>{
    const {title,release_date,vote_average, poster_path}=pelicula;
    const año=release_date?release_date.split('-')[0]:'N/A';
    const imagen=poster_path?`${IMAGE_URL} ${poster_path}` : '';
    const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
    return;
        <article class="movie-card">
        <div class="movie-card__poster">
            <span class="movie-card__image" src="${imagen}" alt="${title">
                </span>
            </div>
        </article>
/* aqui flta codigo y tambien elc codigo par alalara a imagen */

}

const iniciar=async()=>{
    console.log('Mostrar pelicula');
    mostrarLoading();
    try{
        const peliculas=await obtenerPeliculas();
        console.log('${peliculas.length} peliculas obtenidas');
        ocultarLoading();
        moviesgrid.innerHTML=peliculas.map(crearTarjeta).join('');
        console.log('Primera pelicula renderizada');
    }catch(error){
        console.log('Error', error);
        let mensaje='Nose pudo cargar peliculas';
        if(error.message.includes('401')){
            mensaje='API Key invalida, verifica tu clave';
        }else if(error.message.includes('fetch')){
            mensaje='error de red';
        }else if(error.message.includes('429')){
            mensaje='Existen demasiadas peticiones.Espera un moemtno';
        }

        mostrarError();
        
    }
    
    //const primera=peliculas[0];/* si le ponemos 10 sale otra pelicula mas, esto es apra poner otra pelocual  */
    //console.log('Primera pelicula', primera);
    
}
iniciar();

const loadingDiv=document.getElementById('loading');
const errorDiv=document.getElementById('error');
const errorMessage=document.getElementById('error-message');

const mostrarLoading=()=>{
    loadingDiv.style.display='flex';/* aque estamso agregando un estilo */
    errorDiv.style.display='none';
    moviesgrid.innerHTML='';
}

const ocultarLoading=()=>{
    loadingDiv.style.display='none';
}

const mostrarError=(mensaje)=>{
    ocultarLoading();
    errorMessage= mensaje;
    errorDiv.style.display='flex';
    moviesgrid.innerHTML='';
}


/*const probarApi=async() =>{
    const url=${BASE_URL}/movie/popular?api_key = ${API_KEY}$language = es-ES;
    console.log('Url de a peticion', url);
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    console.log('Respuesta completa', datos);
    console.log('Peliculas', datos.results);
    console.log('Total de resultados', datos.total_results);
}*/


probarApi();