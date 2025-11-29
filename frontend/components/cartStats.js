/**
 * Componente Cart & Stats
 * Maneja la visualización del carrito y las estadísticas.
 */

// Función auxiliar para obtener el carrito
function getCart() {
    return JSON.parse(localStorage.getItem('mini-tienda-cart')) || [];
}

// Función auxiliar para guardar el carrito
function saveCart(cart) {
    localStorage.setItem('mini-tienda-cart', JSON.stringify(cart));
}

/**
 * Renderiza la vista del Carrito
 */
function renderCart(container) {
    container.innerHTML = '<h2>Tu Carrito de Compras</h2>';

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML += '<p>El carrito está vacío. ¡Ve a Productos para agregar algo!</p>';
        return;
    }

    // Botón para vaciar todo el carrito
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Vaciar Carrito Completo';
    clearBtn.style.backgroundColor = '#ff4444'; // Un poco de estilo inline rápido
    clearBtn.style.color = 'white';
    clearBtn.style.marginBottom = '10px';
    
    clearBtn.addEventListener('click', () => {
        // Uso del BOM: confirm
        if (confirm('¿Estás seguro de que quieres borrar todo el carrito?')) {
            localStorage.removeItem('mini-tienda-cart');
            renderCart(container); // Re-renderizar la vista
        }
    });
    
    container.appendChild(clearBtn);

    // Crear tabla usando DOM
    const table = document.createElement('table');
    table.className = 'cart-table';
    table.style.width = '100%';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="cart-body"></tbody>
    `;

    const tbody = table.querySelector('#cart-body');

    cart.forEach((product, index) => {
        const row = document.createElement('tr');
        
        // Columna Nombre
        const tdName = document.createElement('td');
        tdName.textContent = product.name;
        
        // Columna Precio
        const tdPrice = document.createElement('td');
        tdPrice.textContent = `$${product.price}`;
        
        // Columna Acción (Borrar uno)
        const tdAction = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.onclick = () => {
            cart.splice(index, 1);
            saveCart(cart);
            renderCart(container);
        };
        tdAction.appendChild(deleteBtn);

        row.appendChild(tdName);
        row.appendChild(tdPrice);
        row.appendChild(tdAction);
        tbody.appendChild(row);
    });

    container.appendChild(table);

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Total a pagar: $${total.toFixed(2)}</h3>`;
    container.appendChild(totalDiv);
}

/**
 * Renderiza la vista de Estadísticas
 */
function renderStats(container) {
    container.innerHTML = '<h2>Estadísticas de Compra</h2>';

    const cart = getCart();
    
    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const averagePrice = totalItems > 0 ? (totalPrice / totalItems).toFixed(2) : 0;

    const statsList = document.createElement('ul');
    
    const stat1 = document.createElement('li');
    stat1.textContent = `Artículos en el carrito: ${totalItems}`;
    
    const stat2 = document.createElement('li');
    stat2.textContent = `Valor total del carrito: $${totalPrice.toFixed(2)}`;
    
    const stat3 = document.createElement('li');
    stat3.textContent = `Precio promedio por artículo: $${averagePrice}`;

    statsList.appendChild(stat1);
    statsList.appendChild(stat2);
    statsList.appendChild(stat3);

    container.appendChild(statsList);
    
}