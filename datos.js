

const productos = [
    { id: 1, nombre: "Café Colombiano", precio: "$8000", descripcion: "Café premium de origen colombiano.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" },
    { id: 2, nombre: "Arequipe", precio: "$5500", descripcion: "Delicioso dulce de leche, ideal para untar.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
    { id: 3, nombre: "Bocadillo Veleño", precio: "$3000", descripcion: "Dulce de guayaba típico de la región.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
    { id: 4, nombre: "Salsa de Aji", precio: "$4500", descripcion: "Salsa picante para darle sabor a tus platos.", categoria: "Condimentos", imagen: "https://via.placeholder.com/150" },
    { id: 5, nombre: "Empanadas", precio: "$2200", descripcion: "Deliciosas empanadas de carne o pollo.", categoria: "Comidas", imagen: "https://via.placeholder.com/150" },
    { id: 6, nombre: "Postobón Manzana", precio: "$1800", descripcion: "Refresco de manzana con sabor auténtico.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" },
    { id: 7, nombre: "Bandeja Paisa", precio: "$19000", descripcion: "Plato típico de la región paisa con variedad de ingredientes.", categoria: "Comidas", imagen: "https://via.placeholder.com/150" },
    { id: 8, nombre: "Chocoramo", precio: "$3000", descripcion: "Galleta cubierta de chocolate y rellena de crema.", categoria: "Dulces", imagen: "https://via.placeholder.com/150" },
    { id: 9, nombre: "Aguapanela", precio: "3500", descripcion: "Bebida tradicional de panela y agua.", categoria: "Bebidas", imagen: "https://via.placeholder.com/150" },
    { id: 10, nombre: "Tamal Tolimense", precio: "$15000", descripcion: "Tamal relleno de carne, arroz y especias.", categoria: "Comidas", imagen: "https://via.placeholder.com/150" },
];
let productosSeleccionados = {};

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

function actualizarCarrito() {
  const totalProductos = Object.values(productosSeleccionados).reduce((a, b) => a + b, 0);
  document.getElementById('cartCount').textContent = totalProductos;
}

// Filtrado de productos por búsqueda
document.getElementById('productSearch').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));
  mostrarProductos(productosFiltrados);
});

// Mostrar todos los productos al cargar
mostrarProductos(productos);

// Finalizar Compra
document.getElementById('finalizarCompra').addEventListener('click', function() {
  let totalCosto = 0;
  let resumenTexto = "Resumen de Pedido:\n\n";

  for (const [id, cantidad] of Object.entries(productosSeleccionados)) {
    const producto = productos.find(p => p.id === parseInt(id));
    if (producto) {
      const costoProducto = parseFloat(producto.precio.replace('$', ''));
      totalCosto += costoProducto * cantidad;
      resumenTexto += `${producto.nombre}: ${cantidad} - Precio: $${costoProducto}\n`;
    }
  }

  const idRandom = Math.floor(Math.random() * 100000); // Generar un ID aleatorio
  resumenTexto += `\nCosto Total: $${totalCosto}\nID del pedido: ${idRandom}`;

  // Mostrar el resumen en el modal
  document.getElementById('resumenPedido').textContent = resumenTexto;

  // Mostrar el modal
  const pedidoModal = new bootstrap.Modal(document.getElementById('pedidoModal'));
  pedidoModal.show();
});

// Confirmar cierre del modal al hacer clic en el botón de cerrar
const closeModalButton = document.getElementById('closeModalButton');
const footerCloseButton = document.getElementById('footerCloseButton');

function confirmCloseModal() {
const confirmClose = confirm("¿Estás seguro de que quieres cerrar el resumen del pedido?");
const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
pedidoModal.hide(); // Cerrar el modal si se confirma
return confirmClose;
}

closeModalButton.addEventListener('click', function(event) {
if (!confirmCloseModal()) {
  event.preventDefault(); // Evitar que el modal se cierre
  const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
  pedidoModal.show(); // Vuelve a mostrar el modal si se cancela
}
});

footerCloseButton.addEventListener('click', function(event) {
if (!confirmCloseModal()) {
  event.preventDefault(); // Evitar que el modal se cierre
} else {
  const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
  pedidoModal.hide(); // Cerrar el modal si se confirma
}
});

// Manejar clic en el botón de enviar
document.getElementById('enviarPedidoButton').addEventListener('click', async function() {
  // Guarda el pedido en Firebase
  try {
      const idRandom = Math.floor(Math.random() * 100000); // Generar un ID aleatorio
      let totalCosto = 0;
      const productosPedido = [];

      for (const [id, cantidad] of Object.entries(productosSeleccionados)) {
          const producto = productos.find(p => p.id === parseInt(id));
          if (producto) {
              const costoProducto = parseFloat(producto.precio.replace('$', '').replace(',', ''));
              totalCosto += costoProducto * cantidad;
              productosPedido.push({ id: producto.id, nombre: producto.nombre, cantidad, precio: costoProducto });
          }
      }

    
      alert('Pedido enviado exitosamente');
      // Cierra el modal después de enviar
      const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
      pedidoModal.hide();
  } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Hubo un error al enviar el pedido. Inténtalo de nuevo.');
  }
});




