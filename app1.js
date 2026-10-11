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