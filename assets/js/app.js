/**
 * Interacciones de interfaz del prototipo (sin lógica de negocio).
 */
(function () {
  'use strict';

  function pintarIconos() {
    const ui = window.TICOUI;
    if (!ui) return;

    document.querySelectorAll('[data-icono]').forEach(function (nodo) {
      nodo.innerHTML = ui.icono(
        nodo.getAttribute('data-icono'),
        nodo.getAttribute('data-clases') || 'h-5 w-5'
      );
    });

    document.querySelectorAll('[data-icono-relleno]').forEach(function (nodo) {
      nodo.innerHTML = ui.iconoRelleno(
        nodo.getAttribute('data-icono-relleno'),
        nodo.getAttribute('data-clases') || 'h-5 w-5'
      );
    });
  }

  function renderizarListas() {
    const ui = window.TICOUI;
    const datos = window.TICO;
    if (!ui || !datos) return;

    document.querySelectorAll('[data-lista]').forEach(function (contenedor) {
      const lista = contenedor.getAttribute('data-lista');
      const limite = parseInt(contenedor.getAttribute('data-limite') || '0', 10);
      const vista = contenedor.getAttribute('data-vista') || 'grilla';

      if (lista === 'categorias') {
        contenedor.innerHTML = datos.CATEGORIAS.map(ui.tarjetaCategoria).join('');
      }

      if (lista === 'productos') {
        let productos = datos.PRODUCTOS;
        const ids = (contenedor.getAttribute('data-ids') || '')
          .split(',')
          .map(function (id) { return id.trim(); })
          .filter(Boolean);

        if (ids.length) {
          productos = ids
            .map(function (id) {
              return datos.PRODUCTOS.find(function (producto) { return producto.id === id; });
            })
            .filter(Boolean);
        } else if (limite > 0) {
          productos = productos.slice(0, limite);
        }

        contenedor.innerHTML = productos
          .map(function (producto) { return ui.tarjetaProducto(producto, vista); })
          .join('');
      }

      if (lista === 'vendedores') {
        const vendedores = limite > 0 ? datos.VENDEDORES.slice(0, limite) : datos.VENDEDORES;
        contenedor.innerHTML = vendedores.map(ui.tarjetaVendedor).join('');
      }
    });
  }

  function iniciarMenu() {
    const boton = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-movil');
    const iconoMenu = document.getElementById('icono-menu');
    const iconoCerrar = document.getElementById('icono-cerrar');
    if (!boton || !menu) return;

    function alternar(abierto) {
      menu.classList.toggle('hidden', !abierto);
      boton.setAttribute('aria-expanded', String(abierto));
      if (iconoMenu) iconoMenu.classList.toggle('hidden', abierto);
      if (iconoCerrar) iconoCerrar.classList.toggle('hidden', !abierto);
    }

    boton.addEventListener('click', function () {
      alternar(menu.classList.contains('hidden'));
    });

    menu.querySelectorAll('a').forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        alternar(false);
      });
    });
  }

  function iniciarMenuUsuario() {
    const contenedor = document.querySelector('[data-menu-usuario]');
    if (!contenedor) return;

    const boton = contenedor.querySelector('[data-boton-usuario]');
    const panel = contenedor.querySelector('[data-panel-usuario]');
    const icono = contenedor.querySelector('[data-boton-usuario-icono]');
    if (!boton || !panel) return;

    function alternar(abierto) {
      panel.classList.toggle('hidden', !abierto);
      boton.setAttribute('aria-expanded', String(abierto));
      boton.setAttribute('aria-label', abierto ? 'Cerrar menú de usuario' : 'Abrir menú de usuario');
      if (icono) icono.classList.toggle('rotate-180', abierto);
    }

    boton.addEventListener('click', function (evento) {
      evento.stopPropagation();
      alternar(panel.classList.contains('hidden'));
    });

    panel.querySelectorAll('a').forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        alternar(false);
      });
    });

    document.addEventListener('click', function (evento) {
      if (!contenedor.contains(evento.target)) alternar(false);
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') alternar(false);
    });
  }

  function iniciarHeader() {
    const header = document.getElementById('cabecera');
    if (!header) return;

    function actualizar() {
      header.classList.toggle('shadow-suave', window.scrollY > 8);
    }

    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
  }

  function evitarEnvioDeBusqueda() {
    document.querySelectorAll('form[role="search"]').forEach(function (formulario) {
      formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();
      });
    });
  }

  function ponerAnio() {
    document.querySelectorAll('[data-anio]').forEach(function (nodo) {
      nodo.textContent = String(new Date().getFullYear());
    });
  }

  window.TICOAPP = {
    renderizarListas: renderizarListas,
  };

  document.addEventListener('DOMContentLoaded', function () {
    pintarIconos();
    renderizarListas();
    iniciarMenu();
    iniciarMenuUsuario();
    iniciarHeader();
    evitarEnvioDeBusqueda();
    ponerAnio();
  });
})();