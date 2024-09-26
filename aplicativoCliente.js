// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { productosSeleccionados } from './datos.js';


// Hacerla global
window.idAleatorio = Math.floor(Math.random() * 9000) + 1000;
// Importar la variable totalCosto desde datos.js
import { totalCosto } from "./datos.js";  // Importación de datos.js

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBFTypg5rh1dzt8fxmiA03UhKR8Uf3KA6Q",
    authDomain: "tienda-c69be.firebaseapp.com",
    projectId: "tienda-c69be",
    storageBucket: "tienda-c69be.appspot.com",
    messagingSenderId: "771742316743",
    appId: "1:771742316743:web:2dd6d3822adc6f09b626e2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para insertar datos
async function insertarDatos(nombre, direccion, telefono, total, ids , identificador) {
    window.idAleatorio = Math.floor(Math.random() * 9000) + 1000;
    try {
        const docRef = await addDoc(collection(db, "productos"), {
            nombre: nombre,
            identificador, identificador,
            direccion: direccion,
            telefono: telefono,
            total: total,
            ids : ids
        });
        console.log("Documento escrito con ID: ", docRef.id);
        alert("Pedido registrado, porfavor envia el ID a el asesor por Whatsapp");
    } catch (e) {
        console.error("Error al añadir documento: ", e);
        alert("Error al insertar datos");
    }
}

// Llama a la función con los datos que deseas insertar al hacer clic en finalizar compra
window.onload = function() {
    document.getElementById('finalizarCompra').addEventListener('click', function() {
        // Mostrar el modal para ingresar datos del usuario
        const datosModal = new bootstrap.Modal(document.getElementById('datosModal'));
        datosModal.show();
    });

    document.getElementById('botonEnviarPedido').addEventListener('click', async function() {
        
        
        
        // Obtener los valores de los inputs del formulario
        const nombre = document.getElementById('nombreInput').value;
        const direccion = document.getElementById('direccionInput').value;
        const telefono = document.getElementById('telefonoInput').value;

        // Validar que los campos no estén vacíos
        if (!nombre || !direccion || !telefono) {
            alert("Todos los campos son obligatorios. Intenta de nuevo.");
            return; // Salir de la función si algún campo está vacío
        }

        let idsProductos = Object.keys(productosSeleccionados).map(id => parseInt(id, 10)); // Convierte a entero
        console.log(idsProductos); // Esto imprimirá un array con los IDs, por ejemplo: [1, 2]  

        
        
        // Insertar datos en Firebase

        if (window.modalCerradoPorBoton){

            await insertarDatos(nombre, direccion, telefono, totalCosto,idsProductos, window.idAleatorio); // Aquí se utiliza totalCosto importado
        }
        // Cerrar el modal
        const datosModal = bootstrap.Modal.getInstance(document.getElementById('datosModal'));
        datosModal.hide();

        // Limpiar los campos del formulario
        document.getElementById('datosForm').reset();
        
    });
};