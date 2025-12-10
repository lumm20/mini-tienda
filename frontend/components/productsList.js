/**
 * Componente ProductsList
 * Obtiene los productos del backend y los muestra.
 * Maneja la lógica de agregar al carrito.
 */
async function renderProductsList(container) {
    container.innerHTML = '<h2>Nuestros Productos</h2>';

    const grid = document.createElement('div');
    grid.className = 'products-grid';
    container.appendChild(grid);

    try {
        const response = await fetch('http://localhost:3000/api/products');

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const products = data.products || []; 

        if (products.length === 0) {
            grid.innerHTML = '<p>No hay productos disponibles por el momento.</p>';
            return;
        }

        console.log(products);
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            // Imagen del producto
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'product-image-wrapper';
            
            const img = document.createElement('img');
            img.className = 'product-image';
            img.src = product.image || 'https://via.placeholder.com/300x200/1a1625/a78bfa?text=Producto';
            img.alt = product.name;
            // Manejar error de carga de imagen
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/300x200/1a1625/a78bfa?text=Sin+Imagen';
            };
            
            imgWrapper.appendChild(img);
            // Nombre
            const name = document.createElement('h3');
            name.textContent = product.name;

            // Descripción
            const desc = document.createElement('p');
            desc.textContent = product.description || '';

            // Precio
            const price = document.createElement('p');
            price.className = 'price';
            price.textContent = `$${product.price}`;

            // Botón Agregar al Carrito
            const button = document.createElement('button');
            button.textContent = 'Agregar al carrito';
            
            button.addEventListener('click', () => {
                addToCart(product);
            });

            card.appendChild(imgWrapper);
            card.appendChild(name);
            card.appendChild(desc);
            card.appendChild(price);
            card.appendChild(button);

            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error cargando productos:', error);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '20px';
        errorDiv.textContent = 'Ocurrió un error al cargar los productos. Por favor, intenta de nuevo más tarde.';
        
        container.appendChild(errorDiv);
    }
}

/**
 * Función auxiliar para guardar en LocalStorage
 */
function addToCart(product) {
    // Leer carrito actual (o iniciar uno vacío)
    let cart = JSON.parse(localStorage.getItem('mini-tienda-cart')) || [];

    // Agregar producto
    cart.push(product);

    // Guardar nuevo estado
    localStorage.setItem('mini-tienda-cart', JSON.stringify(cart));

    // Feedback al usuario (BOM)
    alert(`¡${product.name} agregado al carrito!`);
}