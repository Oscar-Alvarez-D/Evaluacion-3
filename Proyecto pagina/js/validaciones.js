document.getElementById("form").addEventListener("submit", function(event) {  // Aca podemos ver como seleccionamos el elemento con el id form, para luego agregarle un event listener para cuando ocurra el submit, cuando esto suceda se va a ejecutar una funcion especifica//
event.preventDefault(); //Basicamente sirve para prevenir la accion por defecto del submit//

var nombre = document.getElementById("nombre").value;
var apellido = document.getElementById("apellido").value;
var telefono = document.getElementById("telefono").value;
var email = document.getElementById("email").value;
var direccion = document.getElementById("direccion").value;  //Se obtiene cada elemento del formulario a traves de su id para declararlas en variables y luego almacenar el valor
var modelo = document.getElementById("Seleccionar").value;
var ciudad = document.getElementById("SeleccionarCiudad").value;
var envio = document.getElementById("SeleccionarEnvio").value;
var terminos = document.getElementById("terminos").checked;

if (nombre.length < 3) {
alert("El nombre debe tener al menos 3 caracteres."); // Aca tenemos un if, el cual comprobara la condicion puesta, la que en este caso es que el nombre no debe tener menos de 3 caracteres//
return;
}

if (apellido.length < 3) {
alert("El apellido debe tener al menos 3 caracteres."); // Aca nos encontraremos con la sentencia (if) la cual hace basicamente lo mismo, pero con apellido//
return;
}

if (telefono.length === 0 || !telefono.startsWith("+56")) {
alert("El número telefónico debe comenzar con '+56'.");     //En esta linea se comprueba si la longitud del telefono es 0, ademas de la validacion de que este debe empezar con +56
return;
}

if (!validarEmail(email)) {
alert("Ingrese un email válido."); // Se comprueba de que el email cumpla con los caracteres del mismo, es decir, tener un arroba.
return;
}

if (direccion.trim().length === 0) {
alert("La dirección es obligatoria."); //Evento if, en donde comprueba si se cumple con la introduccion de una dirrecion y se eliminan los espacios en blancos en ambos extremos del string en caso de ser necesario utilizando trim()//
return;
}

if (modelo === "") {
alert("Seleccione un modelo.");  // comprobacion de que se elija un modelo de bicicleta //
return;
}

if (ciudad === "") {
alert("Seleccione una ciudad.");    // comprobacion de que se elija una ciudad //
return;
}

if (envio === "") {
alert("Seleccione un método de envío.");   // comprobacion de que se elija tipo de envio //
return;
}

if (!terminos) {
  alert("Debe aceptar los términos y condiciones.");  //se comprueba si los terminos y servicios han sido aceptado //
return;
}

//cabe destacar que cada uno de los returns finalizara la funcion si una de las condiciones no se cumple//

var persona = {     
nombre: nombre,
apellido: apellido,
telefono: telefono,
email: email,         //Con el VAR podemos crear un objeto, en este caso llamado persona, el cual tiene las propiedades nombre, apellid,telefono, etc. este contendra los datos obtenidos del formulario//
direccion: direccion,
modelo: modelo,
ciudad: ciudad,
envio: envio,
terminos: terminos
};

var listadoAntiguo = JSON.parse(localStorage.getItem("personas")) || []; //En esta linea obtendremos los datos almacenados en el localstorage con la clave anteriormente puesta (personas) se utiliza PARSE para convertir los datos en JSON en un objeto JS                    
var listadoNuevo = [...listadoAntiguo, persona]; // Se utiliza un spread operator que permite que el array se le agreguen mas argumentos o valores en este caso los valores que contiene el objeto personas
localStorage.setItem("personas", JSON.stringify(listadoNuevo)); //Aqui, se tomara el array anteriormente creado em formato JSON, y mediante el stringify lo guarda en el localstorage bajo el nombre "personas" 

mostrarTabla(); // Funcion que llamara a la tabla para mostrar los datos almacenados en el LS
document.getElementById("form").reset();  // Con esta linea podemos  borrar el contenido ingresado en el formulario después de que se haya enviado.

});

function mostrarTabla() {
var tablaBody = document.getElementById("tabla-body");  
tablaBody.innerHTML = ""; // Basicamente se asigna una cadena vacía como contenido HTML (Con el innerHTML) //

var listadoPersonas = JSON.parse(localStorage.getItem("personas")) || [];

for (var i = 0; i < listadoPersonas.length; i++) { //Aqui el bucle for recorre el arreglo listadoPersonas desde el indice 0 hasta el ultimo indice y realiza una operacion en cada elemento del arreglo, en este caso mientras la variable i sea menor que la longitud del arreglo, el bucle seguira ejecutandose
var persona = listadoPersonas[i];

var fila = document.createElement("tr");  // En este punto vamos a crear una fila en una tabla con los valores de las propiedades del objeto llamado persona.
fila.innerHTML = ` 
<td>${persona.nombre}</td>
<td>${persona.apellido}</td>
<td>${persona.email}</td>
<td>${persona.telefono}</td>         
<td>${persona.direccion}</td>
<td>${persona.modelo}</td>
<td>${persona.ciudad}</td>
<td>${persona.envio}</td>
<td>${persona.terminos}</td>
      
<td><button class ="btn waves-effect waves-light #424242 grey darken-3" onclick="editar(${i})">Editar</button></td>
<td><button class= "btn waves-effect waves-light #b71c1c red darken-4"  onclick="eliminar(${i})">Eliminar</button></td>`;
tablaBody.appendChild(fila);  //Se agrega la fila creada anteriormente a la tabla, y se utiliza appendchild para insertarla como ultima en la fila//
}
}

function editar(index) {
var listadoPersonas = JSON.parse(localStorage.getItem("personas")) || [];   //Aca obtendremos la lista de personas, la cual esta almacenada en LS
var persona = listadoPersonas[index];

document.getElementById("nombre").value = persona.nombre;
document.getElementById("apellido").value = persona.apellido; // Aca vamos actualizar los campos del formulario con los valores de persona.
document.getElementById("email").value = persona.email;
document.getElementById("telefono").value = persona.telefono;
document.getElementById("direccion").value = persona.direccion;
document.getElementById("Seleccionar").value = persona.modelo
document.getElementById("ciudad").value = persona.ciudad
document.getElementById("envio").value = persona.envio
document.getElementById("terminos").value = persona.terminos

    
listadoPersonas.splice(index, 1); //el metodo cambia el contenido de un array eliminando elementos que existen y agregan nuevos el primer valor que se le pasa es el valor a eliminar y el segundo valor el que se agrega
localStorage.setItem("personas", JSON.stringify(listadoPersonas));

mostrarTabla();
}

function eliminar(index) {
var listadoPersonas = JSON.parse(localStorage.getItem("personas")) || [];
  
// Mostrar un mensaje de confirmación antes de eliminar los datos
var confirmacion = confirm("¿Estás seguro de que deseas eliminar estos datos?");
if (!confirmacion) {
return; // Si el usuario cancela la eliminación, se detiene la función
}
  
listadoPersonas.splice(index, 1); 
localStorage.setItem("personas", JSON.stringify(listadoPersonas));
  
mostrarTabla();
}

function validarEmail(email) {
// Expresión regular para verificar si el email contiene un símbolo de arroba (@)
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

return emailRegex.test(email);
}

// Mostrar la tabla al cargar la página
mostrarTabla();

var fontSizes = ['16px', '18px', '20px', '16px']; // Tamaños de fuente disponibles en un ciclo


var aumentarFuenteBtn = document.getElementById("aumentar-fuente"); //En este punto, basicamente tomo un elemento del html y utilizando ambos metodos (getelementbyid, y el query selector) ocupare la variable aumentarfuentebtn para hacer lo que su nombre indica, aumentar la fuente.
var body = document.querySelector("body"); //aca basicamente el body utiliza el queryselector para seleccionar el elemento body del html.
var currentIndex = 0; //indica que se va inicializar en 0//

aumentarFuenteBtn.addEventListener("click", function() { //Aqui tenemos un evento de listener, en donde agrego al hacer click un evento a "aumentarfuentebtn" esto es para aumentar el tamaño de la fuente
currentIndex++;
if (currentIndex >= fontSizes.length) {              
currentIndex = 0; //inicializador en 0//
}
body.style.fontSize = fontSizes[currentIndex];
});
document.getElementById("cambiar-contraste").addEventListener("click", function() { //En el fragmento de a continuacion se agrega un evento al id "cambiar-contraste" basicamente, al hacer click se modificara el estilo de este
var body = document.body;
var nav = document.querySelector("nav");
var links = document.querySelectorAll("a");
var paragraphs = document.querySelectorAll("p");     
var buttons = document.querySelectorAll("button");  //seleccion del elemento button//
var tables = document.querySelectorAll("table");
var footer = document.querySelector("footer"); //aca se puede ver como se seleccionar los elementos del footer

    
body.classList.toggle("contraste-bg"); //Se usa el metodo toggle para añadir si una clase si esta no esta o para eliminarla si no se encuentra. Aca, por ejemplo, lo ocupe para alternar las clases del css.
body.classList.toggle("contraste-text");
    

nav.classList.toggle("contraste-bg");            //mismo caso pero con el nav
nav.classList.toggle("contraste-text");

for (var i = 0; i < links.length; i++) {
links[i].classList.toggle("contraste-text");
}

for (var i = 0; i < paragraphs.length; i++) {
paragraphs[i].classList.toggle("contraste-text");
}

for (var i = 0; i < buttons.length; i++) {
buttons[i].classList.toggle("contraste-bg");
buttons[i].classList.toggle("contraste-text");
}

for (var i = 0; i < tables.length; i++) {
tables[i].classList.toggle("contraste-bg");
tables[i].classList.toggle("contraste-text");
}

footer.classList.toggle("contraste-bg");
footer.classList.toggle("contraste-text");
});

