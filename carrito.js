let carritoTotal = 0;  // Variable global para almacenar el total del carrito
let carritoProductos = []; // Lista de productos en el carrito

// Obtener el modal del carrito
var modal = document.getElementById("jsModalCarrito");

// Obtener el botón para cerrar el modal
var closeButton = document.querySelector(".jsModalClose");

// Función para abrir el modal de carrito
function abrirModal() {
    modal.style.display = "block";
    var modalTotal = document.getElementById("modal-total");
    modalTotal.textContent = `$${carritoTotal.toFixed(2)}`;
    actualizarListaProductos();
}

// Función para cerrar el modal de carrito
function cerrarModal() {
    modal.style.display = "none";
}

// Asignar evento de clic al botón para cerrar el modal
closeButton.addEventListener("click", cerrarModal);

// Obtener todos los botones de "Agregar al carrito"
var addToCartButtons = document.querySelectorAll('.cart-btn');

// Función para agregar un producto al carrito
function addToCart(productName, price) {
    // Agregar el producto al carritoProductos
    carritoProductos.push({ productName: productName, price: price });

    // Actualizar la lista de productos en el carrito
    actualizarListaProductos();

    // Actualizar el total del carrito
    carritoTotal += price;

    // Actualizar el total en el modal
    var modalTotal = document.getElementById("modal-total");
    modalTotal.textContent = `$${carritoTotal.toFixed(2)}`;

    // Abrir el modal al agregar un producto al carrito
    abrirModal();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(price, index) {
    // Restar el precio del producto eliminado del total del carrito
    carritoTotal -= price;
    
    // Eliminar el producto del carritoProductos
    carritoProductos.splice(index, 1);

    // Actualizar la lista de productos en el carrito
    actualizarListaProductos();

    // Actualizar el total en el modal
    var modalTotal = document.getElementById("modal-total");
    modalTotal.textContent = `$${carritoTotal.toFixed(2)}`;
}

// Función para actualizar la lista de productos en el carrito
function actualizarListaProductos() {
    var modalCartItems = document.getElementById("modal-cart-items");
    modalCartItems.innerHTML = ""; // Limpiar la lista de productos

    carritoProductos.forEach((producto, index) => {
        var listItem = document.createElement("li");
        listItem.textContent = `${producto.productName} - $${producto.price.toFixed(2)}`;

        // Agregar un botón para eliminar
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function() {
            eliminarDelCarrito(producto.price, index);
        });

        listItem.appendChild(deleteButton);  // Añadir el botón de eliminar

        // Agregar el nuevo elemento a la lista del carrito
        modalCartItems.appendChild(listItem);
    });
}

// Asignar evento de clic a todos los botones de "Agregar al carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        var productName = event.target.getAttribute('data-product-name');
        var price = parseFloat(event.target.getAttribute('data-price'));
        addToCart(productName, price);
    });
});
