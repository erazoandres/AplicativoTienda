// datos.js


// Variable para almacenar el costo total
export let totalCosto = 0; 

// Función para actualizar el total
export function actualizarTotal(nuevoTotal) {
  totalCosto = nuevoTotal; 
}

//Basde de datas de prueba *Array*.
export const productos = [
  { id: 1, nombre: "Café Colombiano", precio: "$8000", descripcion: "Café premium de origen colombiano.", categoria: "Bebidas", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24490290/CAFE-MOLIDO-523968_a.jpg" },
  { id: 2, nombre: "Arequipe", precio: "$5500", descripcion: "Delicioso dulce de leche, ideal para untar.", categoria: "Dulces", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24648975/Arequipe-Vaso-pote-755132_a.jpg" },
  { id: 3, nombre: "Té Verde", precio: "$7000", descripcion: "Té verde orgánico, excelente para la salud.", categoria: "Bebidas", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24080229/Te-Pina-TOSH-24-gr-3200877_a.jpg" },
  { id: 4, nombre: "Chocolate Amargo", precio: "$10000", descripcion: "Chocolate oscuro con 70% de cacao.", categoria: "Dulces", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24072175/CHOCOLATE-16-PASTILLAS-483614_a.jpg" },
  { id: 5, nombre: "Mermelada de Fresa", precio: "$4500", descripcion: "Mermelada casera de fresas frescas.", categoria: "Dulces", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24115352/Mermelada-Mora-Dp-Practitapa-715336_a.jpg" },
  { id: 6, nombre: "Pan Artesanal", precio: "$3000", descripcion: "Pan hecho a mano con ingredientes naturales.", categoria: "Panadería", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24082040/Pan-Tajado-Artesanal-EXITO-MARCA-PROPIA-500-gr-3297683_a.jpg" },
  { id: 7, nombre: "Queso Manchego", precio: "$12000", descripcion: "Queso español de sabor intenso y textura firme.", categoria: "Lácteos", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24534931/Queso-Mozzarella-Tajado-EXITO-MARCA-PROPIA-400-gr-3280456_a.jpg" },
  { id: 8, nombre: "Yogur Griego", precio: "$6500", descripcion: "Yogur espeso y cremoso, alto en proteínas.", categoria: "Lácteos", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24085881/Yogurt-Griego-Surtido-ZORBA-540-gr-3523327_a.jpg" },
  { id: 9, nombre: "Galletas de Avena", precio: "$3500", descripcion: "Galletas saludables de avena y miel.", categoria: "Dulces", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24074792/Gta-Tosh-Avena-Chocolate-x-180-g-1737491_a.jpg?v=638588578824000000" },
  { id: 10, nombre: "Miel de Abeja", precio: "$9000", descripcion: "Miel pura de abeja, recolectada artesanalmente.", categoria: "Dulces", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24491840/MIEL-LA-ABEJA-DORADA-214880_a.jpg" },
  { id: 11, nombre: "Jugo de Naranja", precio: "$4000", descripcion: "Jugo fresco de naranjas orgánicas.", categoria: "Bebidas", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24648076/Hit-Buenos-Dias-1-Litro-224880_a.jpg" },
  { id: 12, nombre: "Granola", precio: "$5000", descripcion: "Granola crocante con nueces y miel.", categoria: "Cereales", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24068756/Granola-Con-Chocolate-Caja-X-500g-877544_a.jpg" },
  { id: 13, nombre: "Aceite de Oliva", precio: "$15000", descripcion: "Aceite de oliva extra virgen de alta calidad.", categoria: "Aceites", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24447420/Aceite-Oliva-Extravirgen-Organ-TAEQ-500-ml-3259070_a.jpg" },
  { id: 14, nombre: "Jabón Natural", precio: "$3500", descripcion: "Jabón artesanal hecho con ingredientes naturales.", categoria: "Cuidado Personal", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24089112/Jabon-Jardin-Jazmines-Aceite-Almendra-DORADO-330-gr-3406970_a.jpg" },
  { id: 15, nombre: "Turrón de Almendra", precio: "$12000", descripcion: "Turrón español con almendras tostadas.", categoria: "Dulces", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24080669/Almendra-Natural-FRESCAMPO-200-gr-3226878_a.jpg" },
  { id: 16, nombre: "Cerveza Artesanal", precio: "$13000", descripcion: "Cerveza hecha a mano con malta seleccionada.", categoria: "Bebidas", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24487933/Cerveza-Cajica-Miel-Paq-X-4-Und-330ml-C-u-924591_a.jpg" },
  { id: 17, nombre: "Vino Tinto", precio: "$25000", descripcion: "Vino tinto reserva, ideal para acompañar carnes.", categoria: "Bebidas", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24488569/Vino-Tinto-Cabernet-Sauvignon-X-750ml-24281_a.jpg" },
  { id: 18, nombre: "Galletas de Chocolate", precio: "$5000", descripcion: "Galletas crujientes con trozos de chocolate.", categoria: "Dulces", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24853487/Galleta-Dulce-Clasica-CHOKIS-222-Gramo-3013743_a.jpg" },
  { id: 19, nombre: "Leche de Almendra", precio: "$8500", descripcion: "Bebida vegetal de almendras, sin azúcar.", categoria: "Lácteos", imagen: "https://exitocol.vtexassets.com/arquivos/ids/24071297/Forza-Almendra-Original-1429261_a.jpg" },
  { id: 20, nombre: "Té Chai", precio: "$6000", descripcion: "Mezcla de especias para preparar té chai.", categoria: "Bebidas", imagen: "https://exitocol.vtexassets.com/arquivos/ids/22840514/Te-Chai-Con-Especias-TAEQ-100-gr-3482463_a.jpg" }
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
        <img id ="imgProducto" src="${producto.imagen}" alt="${producto.nombre}">
        
        <div class="card-body">
          <p class="card-text" style = "font-style:italic">${producto.descripcion}</p>
          <p style ="margin:0"><strong>Precio:</strong> ${producto.precio}</p>
          <p style ="margin:0"><strong>Categoría:</strong> ${producto.categoria}</p>
        </div>

        <div class="quantity-controls">
          <button class="btn btn-sm btn-decrement">
            <i class="fa fa-chevron-left"></i> <!-- Icono de flecha izquierda -->
          </button>
          <span class="quantity-display">1</span>
          <button class="btn btn-sm btn-increment">
            <i class="fa fa-chevron-right"></i> <!-- Icono de flecha derecha -->
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