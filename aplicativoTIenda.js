
  // Importar Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import { getFirestore, collection, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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

  // Función para obtener los últimos 3 identificadores
  async function obtenerUltimosIdentificadores() {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"), orderBy("createdAt", "desc"), limit(3));
      const ulIdentificadores = document.getElementById("ultimosIdentificadores");
      ulIdentificadores.innerHTML = ''; // Limpiar lista existente
      const docsArray = querySnapshot.docs; // Convertir a array
      const maxItems = Math.min(docsArray.length, 3); // Obtener el mínimo entre la cantidad de documentos y 3

      for (let i = 0; i < maxItems; i++) {
        const data = docsArray[i].data();
        const identificador = data.identificador;

        // Crear un nuevo elemento li
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center position-relative";

        // Crear el icono de copiado
        const copyIcon = document.createElement("i");
        copyIcon.className = "bi bi-clipboard"; // Usar Bootstrap Icons
        copyIcon.style.cursor = "pointer"; // Cambiar el cursor a pointer

        // Crear el icono de verificación
        const checkIcon = document.createElement("i");
        checkIcon.className = "bi bi-check-circle-fill text-success position-absolute";
        checkIcon.style.display = "none"; // Oculto por defecto
        checkIcon.style.left = "40px"; // Ajusta la posición
        checkIcon.style.transition = "opacity 0.4s"; // Efecto de desvanecimiento

        // Añadir el texto del identificador al li
        li.textContent = identificador;

        // Añadir el icono de copiado y el de verificación al li
        li.prepend(copyIcon);
        li.appendChild(checkIcon);

        // Añadir el li a la lista
        ulIdentificadores.appendChild(li);

        // Funcionalidad del icono de copiado
        copyIcon.onclick = () => {
          navigator.clipboard.writeText(identificador).then(() => {
            checkIcon.style.display = "block"; // Mostrar el icono de verificación
            checkIcon.style.opacity = "1"; // Asegurarse de que sea visible
            document.getElementById('fourDigitCode').value = identificador;
            
            // Desvanecer el icono de verificación después de 0.4 segundos
            setTimeout(() => {
              checkIcon.style.opacity = "0"; // Desvanecer
              setTimeout(() => {
                checkIcon.style.display = "none"; // Ocultar después de desvanecer
              }, 400); // Esperar 0.4s antes de ocultar
            }, 400); // Esperar 0.4s antes de comenzar a desvanecer
          }).catch(err => {
            console.error("Error al copiar el texto: ", err);
          });
        };
      }

    } catch (error) {
      console.error("Error al obtener los últimos identificadores: ", error);
    }
  }

  // Lógica de inicio de sesión
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar envío del formulario de login

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Credenciales predeterminadas
    const validEmail = "admin@ejemplo.com";
    const validPassword = "123456";

    // Validación de las credenciales
    if (emailInput.value === validEmail && passwordInput.value === validPassword) {
      // Si las credenciales son correctas, mostrar la sección de código
      document.querySelector('.login-section').style.display = 'none';
      document.querySelector('.code-section').style.display = 'block';
      document.getElementById('title3Last').style.display = 'block';
      document.querySelector('.login-section').style.display = 'none';

      // Llama a la función al cargar la página
      obtenerUltimosIdentificadores();
    } else {
      alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  });

  // Validación del formulario de código de 4 cifras y consulta en Firebase
  document.getElementById('codeForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar envío

    const codeInput = document.getElementById('fourDigitCode');
    const codeValue = codeInput.value.trim(); // Eliminar espacios en blanco al inicio o final

    // Verificar que el código tenga exactamente 4 cifras
    if (codeValue.length !== 4 || isNaN(codeValue)) {
      codeInput.classList.add('is-invalid');
    } else {
      codeInput.classList.remove('is-invalid');

      try {
        // Consultar Firebase para buscar el código en la colección "productos"
        const querySnapshot = await getDocs(collection(db, "productos"));
        let found = false;
        let idsArray = []; // Array para almacenar el campo "ids"
        let productData = null; // Variable para almacenar los datos del producto

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const identificador = data.identificador;

          if (String(identificador) === String(codeValue)) {
            found = true;
            productData = data; // Guardar los datos del producto encontrado

            // Capturar el campo "ids" y guardarlo en el array
            if (data.ids && Array.isArray(data.ids)) {
              idsArray = data.ids; // Asignar el array de "ids" al array local
            }
          }
        });

        if (!found) {
          alert("El código no existe en la base de datos.");
        } else {
          // Mostrar los datos del producto en la pantalla
          document.getElementById('productoDetalles').style.display = 'block';
          document.getElementById('productoIdentificador').textContent = productData.identificador;
          document.getElementById('productoNombre').textContent = productData.nombre || 'N/A';
          document.getElementById('productoDireccion').textContent = productData.direccion || 'N/A';
          document.getElementById('productoTelefono').textContent = productData.telefono || 'N/A';
          document.getElementById('productoPrecio').textContent = productData.total.toLocaleString('es-ES') || 'N/A';
          document.getElementById('productoIds').textContent = idsArray.join(', ');

          document.querySelector('.cards-section').style.display = 'block'; // Mostrar la sección de cards
          document.getElementById('title3Last').style.transform = 'translateY(100px)'; // Mover hacia abajo 20px

          // Mostrar las tarjetas
          const cardContainer = document.getElementById('cardContainer');
          cardContainer.innerHTML = ''; // Limpiar el contenedor

          idsArray.forEach(id => {
            const idCard = `
              <div class="col-lg-4 col-md-6 col-sm-12 mb-4"> <!-- Diseño responsivo: 3 productos en pantallas grandes, 2 en medianas, 1 en pequeñas -->
                <div class="card">
                  <img src="licor.png" class="card-img-top" alt="Imagen del producto">
                  <div class="check-icon" id="check-${id}"><i class="bi bi-check-circle-fill"></i></div>
                  <div class="card-body">
                    <h5 class="card-title">ID: ${id}</h5>
                    <input type="checkbox" class="form-check-input" id="check-${id}-input">
                  </div>
                </div>
              </div>
            `;
            cardContainer.innerHTML += idCard; // Agregar la tarjeta al contenedor
          });

          // Agregar evento a cada checkbox
          idsArray.forEach(id => {
            const checkbox = document.getElementById(`check-${id}-input`);
            const checkIcon = document.getElementById(`check-${id}`);

            checkbox.addEventListener('change', function() {
              if (this.checked) {
                checkIcon.style.display = 'block'; // Mostrar icono de check
              } else {
                checkIcon.style.display = 'none'; // Ocultar icono de check
              }
            });
          });
        }
      } catch (error) {
        console.error("Error al consultar Firebase: ", error);
        alert("Error al consultar la base de datos.");
      }
    }
  });
