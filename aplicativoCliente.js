// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { productos } from './productos.js';



//Variables
export let resumenTexto =  "Resumen de Pedido:\n\n";
let totalCosto = 0 ;

// Variables Globales
window.idAleatorio = Math.floor(Math.random() * 9000) + 1000;
window.modalCerradoPorBoton = false


// Objeto  Array para almacenar productos seleccionados
export let productosSeleccionados = {}; 


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

    document.getElementById("cartIcon").addEventListener('click', async function() {
        let temp_resumenTexto = "";
        let temp_totalCosto = 0;

        for (const [id, cantidad] of Object.entries(productosSeleccionados)) {
            const producto = productos.find(p => p.id === parseInt(id));
            if (producto) {
              const costoProducto = parseFloat(producto.precio.replace('$', ''));
              temp_totalCosto += costoProducto * cantidad;
              temp_resumenTexto += `${producto.nombre}:   ( ${cantidad} ) - Precio: $${costoProducto * cantidad}\n`;
            }
        }

        temp_resumenTexto += '\nTOTAL : ' + `${temp_totalCosto}`
    
        alert(temp_resumenTexto)
    })


};


// Función para generar el HTML de cada producto
function generarProductoHTML(producto) {
  
  return `
    <div class="col-md-2 mb-4">
      <div class="card h-100 producto" data-id="${producto.id}">
        <div class="quantity-icon">0</div>
        <img id ="imgProducto" class = "img-fluid rounded" src="${producto.imagen}" alt="${producto.nombre}">
        
        <div class="card-body">
          <p class="card-text" style = "font-style:italic">${producto.descripcion}</p>
          <p style ="margin:0"><strong>Precio:</strong> ${producto.precio}</p>
          <p style ="margin:0"><strong>Categoría:</strong> ${producto.categoria}</p>
        </div>

        <div class="quantity-controls" >
          <button style = "background-color:transparent" class="btn btn-sm btn-decrement">
            <i style = "color:red" class="fa fa-chevron-left"></i> <!-- Icono de flecha izquierda -->
          </button>
          <span class="quantity-display">1</span>
          <button style = "background-color:transparent" class="btn btn-sm btn-increment">
            <i style = "color:green" class="fa fa-chevron-right"></i> <!-- Icono de flecha derecha -->
          </button>
        </div>
      </div>
    </div>
  `;
}

// Función para mostrar los productos
function mostrarProductos(productosFiltrados) {
  const productList = document.getElementById('productList');
  productList.innerHTML = productosFiltrados.map(producto => generarProductoHTML(producto)).join('');

  document.querySelectorAll('.producto').forEach(producto => {
    producto.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));

      if (productosSeleccionados[productId]) {
        return;
      }

      productosSeleccionados[productId] = 1;
      this.querySelector('.quantity-icon').textContent = productosSeleccionados[productId];
      this.querySelector('.quantity-icon').style.display = 'block';
      this.querySelector('.quantity-controls').style.display = 'block';
      this.querySelector('.quantity-display').textContent = productosSeleccionados[productId];
      this.classList.add('selected');

      document.getElementById('finalizarCompra').disabled = Object.keys(productosSeleccionados).length === 0;
      actualizarCarrito();
    });
  });

  //BOTON DE INCREMENT0
  document.querySelectorAll('.producto').forEach(producto => {
    producto.querySelector('.btn-increment').addEventListener('click', function(event) {
      event.stopPropagation();
      const productId = parseInt(producto.getAttribute('data-id'));
      if (productosSeleccionados[productId]) {
        productosSeleccionados[productId]++;
        producto.querySelector('.quantity-icon').textContent = productosSeleccionados[productId];
        producto.querySelector('.quantity-display').textContent = productosSeleccionados[productId];
        actualizarCarrito();
      }
    });

    //BOTON DE DECREMENTO
    producto.querySelector('.btn-decrement').addEventListener('click', function(event) {
      event.stopPropagation();
      const productId = parseInt(producto.getAttribute('data-id'));
      if (productosSeleccionados[productId] > 1) {
        productosSeleccionados[productId]--;
        producto.querySelector('.quantity-icon').textContent = productosSeleccionados[productId];
        producto.querySelector('.quantity-display').textContent = productosSeleccionados[productId];
        actualizarCarrito();
      } else {
        delete productosSeleccionados[productId];
        producto.querySelector('.quantity-icon').style.display = 'none';
        producto.querySelector('.quantity-controls').style.display = 'none';
        producto.classList.remove('selected');
        actualizarCarrito();
      }
    });
  });
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const totalProductos = Object.values(productosSeleccionados).reduce((a, b) => a + b, 0);
  document.getElementById('cartCount').textContent = totalProductos;
}


// Filtrar productos por búsqueda
document.getElementById('productSearch').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));
  mostrarProductos(productosFiltrados);
});


// Guardar los datos del cliente y luego mostrar el resumen del pedido
document.getElementById('guardarDatosButton').addEventListener('click', async function() {
  // Obtener los valores de los inputs del formulario
  const nombre = document.getElementById('nombreInput').value;
  const direccion = document.getElementById('direccionInput').value;
  const telefono = document.getElementById('telefonoInput').value;

  // Validar que los campos no estén vacíos
  if (!nombre || !direccion || !telefono) {
    alert("Todos los campos son obligatorios. Intenta de nuevo.");
    return;
  }

  // Aquí puedes insertar los datos del cliente en Firebase o donde desees.

  // Cerrar el modal de datos del cliente
  const datosModal = bootstrap.Modal.getInstance(document.getElementById('datosModal'));
  datosModal.hide();

  // **LIMPIAR** el contenido del resumen antes de generar uno nuevo
  document.getElementById('resumenPedido').textContent = "";


  for (const [id, cantidad] of Object.entries(productosSeleccionados)) {
    const producto = productos.find(p => p.id === parseInt(id));
    if (producto) {
      const costoProducto = parseFloat(producto.precio.replace('$', ''));
      totalCosto += costoProducto * cantidad;
      resumenTexto += `${producto.nombre}:  ( ${cantidad} ) - Precio: $${(costoProducto * cantidad)}\n`;
    }
  }


// Agregar el idAleatorio al resumen
resumenTexto += `\nID Pedido: ${ window.idAleatorio}`;

// Agregar el costo total al resumen
resumenTexto += `\nCosto Total: $${totalCosto}`;


  // Mostrar el resumen en el modal
  document.getElementById('resumenPedido').textContent = resumenTexto;

  // Mostrar el modal del resumen del pedido
  const pedidoModal = new bootstrap.Modal(document.getElementById('pedidoModal'));
  pedidoModal.show();
});


// Confirmar cierre del modal de resumen
const botonEnviarPedido = document.getElementById('botonEnviarPedido');

function confirmCloseModal() {
  const confirmClose = confirm("¿Enviamos pedido?");
  const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
  pedidoModal.hide(); // Cerrar el modal si se confirma
  return confirmClose;
}

// Confirmar cierre del modal de resumen
const closeModalButton = document.getElementById('closeModalButton');


// Función para confirmar el cierre
function confirmCloseModal2() {
  modalCerradoPorBoton = true;
  return confirm("¿Estás seguro de que quieres cerrar el resumen del pedido?\n PEDIDO NO SE REGISTRARA");

}

// Manejar el evento 'click' del botón de cerrar
closeModalButton.addEventListener('click', function(event) {
  if (!confirmCloseModal2()) {
    // Si el usuario selecciona "No", evitar que el modal se cierre
    event.preventDefault();
    const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
    pedidoModal.show(); // Asegurar que el modal se mantenga abierto
  } else {
    // Si el usuario selecciona "Sí", cerrar el modal
    window.modalCerradoPorBoton = true;
    const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
    pedidoModal.hide(); // Cerrar el modal


    

  }
});


//Manejo y lanzamiento del envio de la informacion
botonEnviarPedido.addEventListener('click', function(event) {
  if (!confirmCloseModal()) {
    event.preventDefault(); // Evitar que el modal se cierre
  } else {
    window.modalCerradoPorBoton = true
    const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
    pedidoModal.hide(); // Cerrar el modal si se confirma
  }
});


// Inicializar y Mostrar productos al cargar la página
mostrarProductos(productos);