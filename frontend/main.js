const app = document.getElementById('app');

function router() {
    app.innerHTML = '';
    if (typeof renderHeader === 'function') {
        renderHeader(app);
    } else {
        console.warn('renderHeader no está definido aún.');
        const navPlaceholder = document.createElement('nav');
        navPlaceholder.innerHTML = '<a href="#/products">Productos</a> | <a href="#/cart">Carrito</a>';
        app.appendChild(navPlaceholder);
    }

    const content = document.createElement('div');
    content.id = 'content';
    app.appendChild(content);

    const hash = window.location.hash;

    console.log('Navegando a:', hash);

    switch (hash) {
        case '#/products':
        case '':
            if (typeof renderProductsList === 'function') {
                renderProductsList(content);
            } else {
                content.innerHTML = '<h2>Vista de Productos (En construcción)</h2>';
            }
            break;

        case '#/cart':
            if (typeof renderCart === 'function') {
                renderCart(content);
            } else {
                content.innerHTML = '<h2>Vista de Carrito (En construcción)</h2>';
            }
            break;
            
        case '#/stats':
            if (typeof renderStats === 'function') {
                renderStats(content);
            } else {
                content.innerHTML = '<h2>Vista de Estadísticas (En construcción)</h2>';
            }
            break;

        default:
            content.innerHTML = '<h2>404 - Página no encontrada</h2>';
            break;
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);