
// datos.js


// Variable para almacenar el costo total
export let totalCosto = 0; 

// Función para actualizar el total
export function actualizarTotal(nuevoTotal) {
  totalCosto = nuevoTotal; 
}

//Basde de datas de prueba *Array*.
export const productos = [
  { id: 1, nombre: "Café Colombiano", precio: "$8000", descripcion: "Café premium de origen colombiano.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" },
  { id: 2, nombre: "Arequipe", precio: "$5500", descripcion: "Delicioso dulce de leche, ideal para untar.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
  { id: 3, nombre: "Té Verde", precio: "$7000", descripcion: "Té verde orgánico, excelente para la salud.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" },
  { id: 4, nombre: "Chocolate Amargo", precio: "$10000", descripcion: "Chocolate oscuro con 70% de cacao.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
  { id: 5, nombre: "Mermelada de Fresa", precio: "$4500", descripcion: "Mermelada casera de fresas frescas.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
  { id: 6, nombre: "Pan Artesanal", precio: "$3000", descripcion: "Pan hecho a mano con ingitgredientes naturales.", categoria: "Panadería", imagen: "https://via.placeholder.com/150" },
  { id: 7, nombre: "Queso Manchego", precio: "$12000", descripcion: "Queso español de sabor intenso y textura firme.", categoria: "Lácteos", imagen: "https://via.placeholder.com/150" },
  { id: 8, nombre: "Yogur Griego", precio: "$6500", descripcion: "Yogur espeso y cremoso, alto en proteínas.", categoria: "Lácteos", imagen: "https://via.placeholder.com/150" },
  { id: 9, nombre: "Galletas de Avena", precio: "$3500", descripcion: "Galletas saludables de avena y miel.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
  { id: 10, nombre: "Miel de Abeja", precio: "$9000", descripcion: "Miel pura de abeja, recolectada artesanalmente.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
  { id: 11, nombre: "Jugo de Naranja", precio: "$4000", descripcion: "Jugo fresco de naranjas orgánicas.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" },
  { id: 12, nombre: "Granola", precio: "$5000", descripcion: "Granola crocante con nueces y miel.", categoria: "Cereales", imagen: "https://via.placeholder.com/150" },
  { id: 13, nombre: "Aceite de Oliva", precio: "$15000", descripcion: "Aceite de oliva extra virgen de alta calidad.", categoria: "Aceites", imagen: "https://via.placeholder.com/150" },
  { id: 14, nombre: "Jabón Natural", precio: "$3500", descripcion: "Jabón artesanal hecho con ingredientes naturales.", categoria: "Cuidado Personal", imagen: "https://via.placeholder.com/150" },
  { id: 15, nombre: "Turrón de Almendra", precio: "$12000", descripcion: "Turrón español con almendras tostadas.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
  { id: 16, nombre: "Cerveza Artesanal", precio: "$13000", descripcion: "Cerveza hecha a mano con malta seleccionada.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" },
  { id: 17, nombre: "Vino Tinto", precio: "$25000", descripcion: "Vino tinto reserva, ideal para acompañar carnes.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" },
  { id: 18, nombre: "Galletas de Chocolate", precio: "$5000", descripcion: "Galletas crujientes con trozos de chocolate.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
  { id: 19, nombre: "Leche de Almendra", precio: "$8500", descripcion: "Bebida vegetal de almendras, sin azúcar.", categoria: "Lácteos", imagen: "https://via.placeholder.com/150" },
  { id: 20, nombre: "Té Chai", precio: "$6000", descripcion: "Mezcla de especias para preparar té chai.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" }
];


window.modalCerradoPorBoton = false


// Objeto para almacenar productos seleccionados
export let productosSeleccionados = {}; 

// Función para generar el HTML de cada producto
function generarProductoHTML(producto) {
  return `
    <div class="col-md-3 mb-4"> 
      <div class="card h-100 producto" data-id="${producto.id}">
        <div class="quantity-icon">0</div>
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Categoría:</strong> ${producto.categoria}</p>
        </div>
        <div class="quantity-controls">
          <button class="btn btn-sm btn-secondary btn-decrement">-</button>
          <span class="quantity-display">1</span>
          <button class="btn btn-sm btn-secondary btn-increment">+</button>
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

  // Calcular y mostrar el resumen del pedido
  let resumenTexto = "Resumen de Pedido:\n\n";
  totalCosto = 0;

  for (const [id, cantidad] of Object.entries(productosSeleccionados)) {
    const producto = productos.find(p => p.id === parseInt(id));
    if (producto) {
      const costoProducto = parseFloat(producto.precio.replace('$', ''));
      totalCosto += costoProducto * cantidad;
      resumenTexto += `${producto.nombre}: ${cantidad} - Precio: $${costoProducto}\n`;
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