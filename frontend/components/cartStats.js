/**
 * Componente Cart & Stats
 * Maneja la visualización del carrito, estadísticas y PROCESO DE COMPRA REAL.
 */

// Obtener carrito del storage
function getCart() {
    return JSON.parse(localStorage.getItem('mini-tienda-cart')) || [];
}

// Guardar carrito en storage
function saveCart(cart) {
    localStorage.setItem('mini-tienda-cart', JSON.stringify(cart));
}

/**
 * Lógica para enviar la venta al Backend
 */
async function realizarCompra() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega juegos primero.");
        return;
    }

    if (!confirm(`¿Confirmar compra de ${cart.length} artículos?`)) return;

    const groupedItems = {};
    let totalAmount = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price);
        totalAmount += price;

        if (groupedItems[item.id]) {
            groupedItems[item.id].productQuantity += 1;
            groupedItems[item.id].subtotal += price;
        } else {
            groupedItems[item.id] = {
                productId: item.id,
                productQuantity: 1,
                unitPrice: price,
                subtotal: price
            };
        }
    });

    const details = Object.values(groupedItems);

    // 2. Enviar a la API
    try {
        const response = await fetch('http://localhost:3000/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                totalAmount: totalAmount,
                details: details
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al procesar la venta');
        }

        alert(`¡Compra realizada con éxito! ID de venta: ${result.saleId}`);
        
        // Limpiar carrito y recargar vista
        localStorage.removeItem('mini-tienda-cart');
        // Redirigir a productos o recargar
        window.location.hash = '#/products'; 

    } catch (error) {
        console.error('Error en compra:', error);
        alert('Hubo un error al procesar tu compra. Revisa la consola para más detalles.');
    }
}

/**
 * Renderiza la vista del Carrito
 */
function renderCart(container) {
    container.innerHTML = '<h2>Tu Carrito de Compras</h2>';

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML += '<p style="text-align:center; color: #a78bfa;">El carrito está vacío. ¡Ve por unos juegazos!</p>';
        return;
    }

    // Contenedor de acciones
    const actionsDiv = document.createElement('div');
    actionsDiv.style.display = 'flex';
    actionsDiv.style.gap = '10px';
    actionsDiv.style.marginBottom = '20px';
    actionsDiv.style.justifyContent = 'flex-end';

    // Botón Vaciar
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Vaciar Carrito';
    clearBtn.style.backgroundColor = '#ef4444'; 
    clearBtn.style.width = 'auto';
    clearBtn.onclick = () => {
        if (confirm('¿Borrar todo?')) {
            localStorage.removeItem('mini-tienda-cart');
            renderCart(container);
        }
    };

    const buyBtn = document.createElement('button');
    buyBtn.textContent = 'CONFIRMAR COMPRA 🎮';
    buyBtn.style.background = 'linear-gradient(90deg, #00f260, #0575e6)'; // Verde/Azul victorioso
    buyBtn.style.width = 'auto';
    buyBtn.onclick = realizarCompra; // Llama a la función async

    actionsDiv.appendChild(clearBtn);
    actionsDiv.appendChild(buyBtn);
    container.appendChild(actionsDiv);

    // Tabla
    const table = document.createElement('table');
    table.className = 'cart-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Juego</th>
                <th>Precio</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="cart-body"></tbody>
    `;

    const tbody = table.querySelector('#cart-body');

    cart.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td style="color: #4ade80; font-weight:bold;">$${product.price}</td>
        `;
        
        const tdAction = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = () => {
            cart.splice(index, 1);
            saveCart(cart);
            renderCart(container);
        };
        tdAction.appendChild(deleteBtn);
        row.appendChild(tdAction);
        
        tbody.appendChild(row);
    });

    container.appendChild(table);

    // Total
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const totalDiv = document.createElement('div');
    totalDiv.style.textAlign = 'right';
    totalDiv.style.fontSize = '1.5rem';
    totalDiv.style.color = 'white';
    totalDiv.innerHTML = `Total a pagar: <span style="color:#4ade80">$${total.toFixed(2)}</span>`;
    container.appendChild(totalDiv);
}

/**
 * Renderiza estadísticas simples
 */
function renderStats(container) {
    container.innerHTML = '<h2>Estadísticas Gamer</h2>';
    const cart = getCart();
    
    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    // Contenedor de stats
    const statsContainer = document.createElement('div');
    statsContainer.className = 'products-grid';

    const createStatCard = (title, value) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.textAlign = 'center';
        card.innerHTML = `
            <h3 style="color:var(--secondary-pink)">${title}</h3>
            <p style="font-size: 2rem; color: white;">${value}</p>
        `;
        return card;
    };

    statsContainer.appendChild(createStatCard('Juegos en Carrito', totalItems));
    statsContainer.appendChild(createStatCard('Total a Invertir', `$${totalPrice.toFixed(2)}`));

    container.appendChild(statsContainer);
}