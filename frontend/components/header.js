/**
 * Componente Header
 * Se encarga de renderizar la barra de navegación.
 * @param {HTMLElement} container
 */
function renderHeader(container) {
    // Creación de elementos usando el DOM
    const header = document.createElement('header');
    header.className = 'app-header';

    const nav = document.createElement('nav');
    
    // Titulo de la tienda
    const title = document.createElement('h1');
    title.textContent = 'Mini Tienda';
    
    // Enlaces de navegación
    // usamos el BOM (Browser Object Model) a través de los href con '#'
    // para activar el evento 'hashchange' en main.js
    const ul = document.createElement('ul');
    ul.className = 'nav-links';

    const createLink = (text, hash) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = text;
        a.href = hash;
        li.appendChild(a);
        return li;
    };

    ul.appendChild(createLink('Productos', '#/products'));
    ul.appendChild(createLink('Carrito', '#/cart'));
    ul.appendChild(createLink('Estadísticas', '#/stats'));

    //Estructura
    nav.appendChild(title);
    nav.appendChild(ul);
    header.appendChild(nav);

    container.appendChild(header);
}