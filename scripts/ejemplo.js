console.log('tecnologia web');

let cadena  = 'hola mundo';
console.log(cadena);
const gravedad = 9.76;
console.log('cadena de texto: ', cadena, 'tipo de datos: ', typeof cadena); 

const persona = {
    nombre: 'pepito',
    edad: 20,
    ciudad: 'La Paz',
    hobbies:['leer', 'viajar', 'programar']
};

console.log('Nombre: ', persona.nombre)
console.log('Ciudad: ', persona['ciudad']);
console.log('Hobbies: ', persona.hobbies.join(', '));

const color=['rojo', 'amarillo', 'verde'];
console.log('Cadena de colores: ', color, 'tipo de dato: ',typeof color);
console.log('Segundo color: ', color[1]);
console.log('Ultimo color: ', color[color.length-1]);

const numero = '38';
const numeroConvertido = Number(numero);
const textoConvertido = String(numeroConvertido);

const booleano = 'true';
const booleanoVerdadero = Boolean(booleano);

/* FUNCIONES */
function saludo(nombre){
    return `Hola: ${nombre}`
}

console.log('Saludo inicial: ', saludo('Luis'));

function saludos(nombre){
    return ('Hola: ' + nombre);
}
console.log('Saludo inicial: ', saludos('Maria'));

function suma(a,b){
    return a+b;
}
console.log(suma(2,3));

const suma1=(a,b) => a+b;
console.log(suma(6,7));

const saludoFlecha=(nombre,saludo='Bienvenido: ') =>{
    return `${saludo}, ${nombre}`
}
console.log(saludoFlecha('Jose', 'Hola'));
console.log(saludoFlecha('Mario'));

/* Crear una funcion flecha para realizar las 4 operacione basicas */
const operaciones=(a,b) => {
    let suma = a+b;
    let resta = a-b;
    let multiplicar = a*b;
    let dividir = a/b;

    console.log('Sumar: ' + suma);
    console.log('Restar: ' + resta);
    console.log('Multiplicacion: ' + multiplicar);
    if(b !== 0){
        console.log('Division: ' + dividir);
    }
    else{
        console.log('No se puede dividir entre 0');
    }
    
}

operaciones(5,3);

const peliculas = {
    titulo: 'Titulo de pelicula',
    director: 'director de la pelicula',
    año: 1990
}

const mostrarPelicula =(pelicula) => {
    console.log(`Titulo ${peliculas.titulo}; Dirigido por: ${peliculas.director}; Año: ${peliculas.año}`);
}
mostrarPelicula(peliculas);

/* DESTRUTCTURING */

const pelicula2 = {
    titulo: 'Poseidon',
    año: 2005
}

console.log('sin Destructuring', pelicula2.titulo);

const{titulo, año} = pelicula2;
console.log('con destructuring: ', titulo);

const {titulo: nombrePelicula} = pelicula2;
console.log('Renombrado: ',nombrePelicula);

const nombres=['juan', 'ana', 'pablo'];
const[nom1, nom2, nom3]=nombres;
console.log('nombre 1: ', nom1);

/* SPREAD */
const numeros = [1,2,3];
const numerosAdicionales=[...numeros,4,5,6]
console.log(numerosAdicionales);

const frutas1 = ['uva', 'pera'];
const frutas2 = ['piña', 'naranja'];
const frutas = [...frutas1,...frutas2];
console.log(frutas);

/* Crear un objeto llamano alumnos con los atributos nombre y apellido*/

/* Crear un segunndo objeto donde se use el spread del primero pero adicionalmente los atributos edad, y genero */