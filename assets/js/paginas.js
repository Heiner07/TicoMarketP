/**
 * Interacciones visuales de las páginas internas (catálogo, detalle,
 * publicación, perfil de vendedor, transacciones y planes).
 * No implementa lógica de negocio: solo cambia la presentación.
 */
(function () {
  'use strict';

  function iniciarFiltros() {
    const boton = document.getElementById('btn-filtros');
    const panel = document.getElementById('panel-filtros');
    const texto = document.getElementById('texto-filtros');
    if (!boton || !panel) return;

    boton.addEventListener('click', function () {
      const abrir = panel.classList.contains('hidden');
      panel.classList.toggle('hidden', !abrir);
      boton.setAttribute('aria-expanded', String(abrir));
      if (texto) texto.textContent = abrir ? 'Ocultar filtros' : 'Filtros';
    });
  }

  function iniciarVista() {
    const contenedor = document.getElementById('resultados-productos');
    const btnGrilla = document.getElementById('vista-grilla');
    const btnLista = document.getElementById('vista-lista');
    if (!contenedor || !btnGrilla || !btnLista) return;

    function marcar(boton, activo) {
      boton.classList.toggle('bg-brand-50', activo);
      boton.classList.toggle('text-brand-700', activo);
      boton.classList.toggle('text-ink-400', !activo);
      boton.setAttribute('aria-pressed', String(activo));
    }

    function aplicar(modo) {
      const esLista = modo === 'lista';
      contenedor.setAttribute('data-vista', modo);
      contenedor.classList.toggle('sm:grid-cols-2', !esLista);
      contenedor.classList.toggle('xl:grid-cols-3', !esLista);
      contenedor.classList.toggle('gap-5', !esLista);
      contenedor.classList.toggle('gap-4', esLista);
      marcar(btnGrilla, !esLista);
      marcar(btnLista, esLista);

      if (window.TICOAPP && window.TICOAPP.renderizarListas) {
        window.TICOAPP.renderizarListas();
      }
    }

    btnGrilla.addEventListener('click', function () {
      aplicar('grilla');
    });

    btnLista.addEventListener('click', function () {
      aplicar('lista');
    });
  }

  function iniciarGaleria() {
    const principal = document.getElementById('icono-galeria');
    const etiqueta = document.getElementById('etiqueta-galeria');
    const miniaturas = document.querySelectorAll('[data-miniatura]');
    if (!principal || !miniaturas.length) return;

    miniaturas.forEach(function (boton) {
      boton.addEventListener('click', function () {
        const nombre = boton.getAttribute('data-icono-miniatura');
        const texto = boton.getAttribute('data-etiqueta');

        if (nombre && window.TICOUI) {
          principal.innerHTML = window.TICOUI.icono(nombre, 'h-32 w-32 sm:h-44 sm:w-44');
        }
        if (texto && etiqueta) {
          etiqueta.textContent = texto;
        }

        miniaturas.forEach(function (otra) {
          const activa = otra === boton;
          otra.classList.toggle('ring-2', activa);
          otra.classList.toggle('ring-brand-600', activa);
          otra.classList.toggle('border-transparent', activa);
          otra.classList.toggle('ring-1', !activa);
          otra.classList.toggle('ring-gray-200', !activa);
          otra.classList.toggle('border-gray-200', !activa);
          otra.setAttribute('aria-pressed', String(activa));
        });
      });
    });
  }

  function iniciarPestanas() {
    const botones = document.querySelectorAll('[data-tab]');
    const paneles = document.querySelectorAll('[data-panel]');
    if (!botones.length || !paneles.length) return;

    function activar(nombre, enfocar) {
      botones.forEach(function (boton) {
        const activo = boton.getAttribute('data-tab') === nombre;
        boton.classList.toggle('border-brand-700', activo);
        boton.classList.toggle('text-brand-700', activo);
        boton.classList.toggle('border-transparent', !activo);
        boton.classList.toggle('text-ink-500', !activo);
        boton.setAttribute('aria-selected', String(activo));
        boton.setAttribute('tabindex', activo ? '0' : '-1');
        if (activo && enfocar) boton.focus();
      });

      paneles.forEach(function (panel) {
        panel.classList.toggle('hidden', panel.getAttribute('data-panel') !== nombre);
      });
    }

    botones.forEach(function (boton) {
      boton.addEventListener('click', function () {
        activar(boton.getAttribute('data-tab'), false);
      });

      boton.addEventListener('keydown', function (evento) {
        if (evento.key !== 'ArrowLeft' && evento.key !== 'ArrowRight') return;
        evento.preventDefault();

        const lista = Array.prototype.slice.call(botones);
        const indice = lista.indexOf(boton);
        const siguiente = evento.key === 'ArrowRight'
          ? lista[(indice + 1) % lista.length]
          : lista[(indice - 1 + lista.length) % lista.length];

        activar(siguiente.getAttribute('data-tab'), true);
      });
    });

    document.querySelectorAll('[data-tab-link]').forEach(function (enlace) {
      enlace.addEventListener('click', function (evento) {
        evento.preventDefault();
        activar(enlace.getAttribute('data-tab-link'), false);
        const seccion = document.getElementById('resenas');
        if (seccion) seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    if (window.location.hash === '#resenas') {
      activar('resenas', false);
    }
  }

  function iniciarPublicacion() {
    const formulario = document.getElementById('form-publicacion');
    if (!formulario) return;

    const paneles = formulario.querySelectorAll('[data-paso-panel]');
    const indicadores = document.querySelectorAll('[data-paso-indicador]');
    const progreso = document.getElementById('progreso-publicacion');
    const alerta = document.getElementById('alerta-publicacion');
    const alertaTexto = document.getElementById('alerta-texto');
    const exito = document.getElementById('publicacion-exito');
    const titulo = document.getElementById('pub-titulo');
    const precio = document.getElementById('pub-precio');
    const categoria = document.getElementById('pub-categoria');
    const condicion = document.getElementById('pub-condicion');
    const descripcion = document.getElementById('pub-descripcion');
    const contador = document.getElementById('contador-descripcion');
    const provincia = document.getElementById('pub-provincia');
    const canton = document.getElementById('pub-canton');
    const previewTitulo = document.getElementById('preview-titulo');
    const previewPrecio = document.getElementById('preview-precio');
    const previewCategoria = document.getElementById('preview-categoria');
    const previewCondicion = document.getElementById('preview-condicion');
    const previewUbicacion = document.getElementById('preview-ubicacion');
    const previewIcono = document.getElementById('preview-icono');
    const errorTitulo = document.getElementById('error-titulo');
    const errorPrecio = document.getElementById('error-precio');
    const fotos = document.getElementById('pub-fotos');
    const estadoFotos = document.getElementById('estado-fotos');
    const iconosCategoria = {
      tecnologia: 'laptop',
      hogar: 'sofa',
      moda: 'shirt',
      vehiculos: 'car',
      deportes: 'dumbbell',
      arte: 'palette',
      alimentos: 'coffee',
      mascotas: 'paw',
    };
    let pasoActual = 1;

    function mostrarAlerta(texto) {
      if (!alerta || !alertaTexto) return;
      alertaTexto.textContent = texto;
      alerta.classList.remove('hidden');
    }

    function ocultarAlerta() {
      if (alerta) alerta.classList.add('hidden');
    }

    function marcarCampo(campo, error, mostrar) {
      if (!campo || !error) return;
      campo.classList.toggle('campo-error', mostrar);
      campo.setAttribute('aria-invalid', String(mostrar));
      error.classList.toggle('hidden', !mostrar);
    }

    function actualizarPreview() {
      if (!previewTitulo || !window.TICO) return;
      const valorTitulo = titulo.value.trim();
      const valorPrecio = parseInt(precio.value, 10);
      const lugar = canton.value.trim() ? canton.value.trim() + ', ' + provincia.value : provincia.value;

      previewTitulo.textContent = valorTitulo || 'Título de tu producto';
      previewPrecio.textContent = valorPrecio > 0 ? window.TICO.formatearColones(valorPrecio) : '₡0';
      previewCategoria.textContent = categoria.options[categoria.selectedIndex].textContent;
      previewCondicion.textContent = condicion.options[condicion.selectedIndex].textContent;
      previewUbicacion.textContent = lugar || 'Ubicación';
      if (contador) contador.textContent = String(descripcion.value.length);

      if (previewIcono && window.TICOUI) {
        const nombre = iconosCategoria[categoria.value] || 'tag';
        previewIcono.innerHTML = window.TICOUI.icono(nombre, 'h-16 w-16');
      }
    }

    function actualizarIndicadores(paso) {
      indicadores.forEach(function (indicador) {
        const numero = parseInt(indicador.getAttribute('data-paso-indicador'), 10);
        const circulo = indicador.querySelector('[data-paso-circulo]');
        const numeroTexto = indicador.querySelector('[data-paso-numero]');
        const check = indicador.querySelector('[data-paso-check]');
        const completado = numero < paso;
        const activo = numero === paso;

        indicador.classList.toggle('border-brand-300', activo);
        indicador.classList.toggle('ring-1', activo);
        indicador.classList.toggle('ring-brand-100', activo);
        indicador.classList.toggle('border-tico-200', completado);
        indicador.classList.toggle('bg-tico-50/40', completado);
        indicador.classList.toggle('opacity-70', !activo && !completado);

        if (circulo) {
          circulo.classList.toggle('bg-brand-700', activo);
          circulo.classList.toggle('text-white', activo || completado);
          circulo.classList.toggle('bg-tico-500', completado);
          circulo.classList.toggle('bg-gray-100', !activo && !completado);
          circulo.classList.toggle('text-ink-500', !activo && !completado);
        }
        if (numeroTexto) numeroTexto.classList.toggle('hidden', completado);
        if (check) check.classList.toggle('hidden', !completado);
      });

      if (progreso) progreso.style.width = Math.min(paso / 3 * 100, 100) + '%';
    }

    function mostrarPaso(paso) {
      pasoActual = paso;
      paneles.forEach(function (panel) {
        panel.classList.toggle('hidden', parseInt(panel.getAttribute('data-paso-panel'), 10) !== paso);
      });
      actualizarIndicadores(paso);
      ocultarAlerta();
      if (paso > 1) {
        formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    function validarPaso1() {
      const tituloValido = titulo.value.trim().length >= 10;
      const precioValor = parseInt(precio.value, 10);
      const precioValido = !isNaN(precioValor) && precioValor > 0;

      marcarCampo(titulo, errorTitulo, !tituloValido);
      marcarCampo(precio, errorPrecio, !precioValido);

      if (!tituloValido || !precioValido) {
        mostrarAlerta('Completa el título y el precio para continuar.');
        (tituloValido ? precio : titulo).focus();
        return false;
      }
      return true;
    }

    function validarPaso3() {
      const cantonValido = canton.value.trim().length > 0;
      const provinciaValida = provincia.value.trim().length > 0;

      canton.classList.toggle('campo-error', !cantonValido);
      canton.setAttribute('aria-invalid', String(!cantonValido));

      if (!cantonValido || !provinciaValida) {
        mostrarAlerta('Indica la provincia y el cantón donde entregarás el producto.');
        if (!cantonValido) canton.focus();
        return false;
      }
      return true;
    }

    formulario.querySelectorAll('[data-siguiente]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        if (pasoActual === 1 && !validarPaso1()) return;
        if (pasoActual < 3) mostrarPaso(pasoActual + 1);
      });
    });

    formulario.querySelectorAll('[data-atras]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        if (pasoActual > 1) mostrarPaso(pasoActual - 1);
      });
    });

    const botonPublicar = formulario.querySelector('[data-publicar]');
    if (botonPublicar) {
      botonPublicar.addEventListener('click', function () {
        if (!validarPaso3()) return;
        formulario.classList.add('hidden');
        actualizarIndicadores(4);
        if (exito) {
          exito.classList.remove('hidden');
          exito.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    if (exito) {
      exito.querySelectorAll('[data-reiniciar]').forEach(function (boton) {
        boton.addEventListener('click', function () {
          exito.classList.add('hidden');
          formulario.classList.remove('hidden');
          formulario.reset();
          if (estadoFotos) estadoFotos.textContent = '';
          mostrarPaso(1);
          actualizarPreview();
          formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    [titulo, precio, categoria, condicion, descripcion, provincia, canton].forEach(function (campo) {
      if (!campo) return;
      campo.addEventListener('input', function () {
        if (campo === titulo) marcarCampo(titulo, errorTitulo, false);
        if (campo === precio) marcarCampo(precio, errorPrecio, false);
        if (campo === canton) canton.classList.remove('campo-error');
        ocultarAlerta();
        actualizarPreview();
      });
      campo.addEventListener('change', actualizarPreview);
    });

    if (fotos && estadoFotos) {
      fotos.addEventListener('change', function () {
        const cantidad = fotos.files ? fotos.files.length : 0;
        estadoFotos.textContent = cantidad ? cantidad + ' foto(s) seleccionada(s) para la demostración.' : '';
      });
    }

    actualizarPreview();
    actualizarIndicadores(1);
  }

  function iniciarEntrega() {
    const opciones = document.querySelectorAll('[data-entrega-opcion]');
    if (!opciones.length) return;

    opciones.forEach(function (opcion) {
      const radio = opcion.querySelector('input[type="radio"]');
      if (!radio) return;

      radio.addEventListener('change', function () {
        opciones.forEach(function (otra) {
          const activa = otra.querySelector('input[type="radio"]').checked;
          otra.classList.toggle('border-brand-200', activa);
          otra.classList.toggle('bg-brand-50/50', activa);
          otra.classList.toggle('ring-1', activa);
          otra.classList.toggle('ring-brand-100', activa);
          otra.classList.toggle('border-gray-200', !activa);
          otra.classList.toggle('bg-white', !activa);
        });
      });
    });
  }

  function iniciarOpcionesCompra() {
    const opciones = document.querySelectorAll('[data-opcion-compra]');
    if (!opciones.length) return;

    opciones.forEach(function (opcion) {
      const radio = opcion.querySelector('input[type="radio"]');
      if (!radio) return;

      radio.addEventListener('change', function () {
        opciones.forEach(function (otra) {
          const otroRadio = otra.querySelector('input[type="radio"]');
          if (!otroRadio || otroRadio.name !== radio.name) return;
          const activa = otroRadio.checked;
          otra.classList.toggle('border-brand-200', activa);
          otra.classList.toggle('bg-brand-50/50', activa);
          otra.classList.toggle('ring-1', activa);
          otra.classList.toggle('ring-brand-100', activa);
          otra.classList.toggle('border-gray-200', !activa);
          otra.classList.toggle('bg-white', !activa);
        });
      });
    });
  }

  function iniciarCompra() {
    const modal = document.getElementById('modal-compra');
    const botonAbrir = document.getElementById('btn-comprar');
    const botonCerrar = document.getElementById('cerrar-compra');
    const fondo = document.getElementById('modal-compra-fondo');
    const paso1 = document.querySelector('[data-compra-paso="1"]');
    const paso2 = document.getElementById('compra-exito');
    const acciones = document.getElementById('acciones-compra');
    const accionesExito = document.getElementById('acciones-compra-exito');
    const confirmar = document.getElementById('confirmar-compra');
    const cerrarExito = document.getElementById('cerrar-compra-exito');
    const metodo = document.getElementById('compra-metodo');
    const entregaTexto = document.getElementById('compra-entrega');
    if (!modal || !botonAbrir) return;

    let ultimoFoco = null;

    function mostrarPaso1() {
      if (paso1) paso1.classList.remove('hidden');
      if (paso2) paso2.classList.add('hidden');
      if (acciones) acciones.classList.remove('hidden');
      if (accionesExito) accionesExito.classList.add('hidden');
    }

    function abrir(origen) {
      ultimoFoco = origen || document.activeElement;
      mostrarPaso1();
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      if (botonCerrar) botonCerrar.focus();
    }

    function cerrar() {
      if (modal.classList.contains('hidden')) return;
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    botonAbrir.addEventListener('click', function () {
      abrir(botonAbrir);
    });
    if (botonCerrar) botonCerrar.addEventListener('click', cerrar);
    if (fondo) fondo.addEventListener('click', cerrar);
    if (cerrarExito) cerrarExito.addEventListener('click', cerrar);

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') cerrar();
    });

    if (confirmar) {
      confirmar.addEventListener('click', function () {
        const pago = document.querySelector('input[name="pago-compra"]:checked');
        const entrega = document.querySelector('input[name="entrega-compra"]:checked');

        if (metodo && pago) metodo.textContent = pago.getAttribute('data-metodo') || pago.value;
        if (entregaTexto && entrega) entregaTexto.textContent = entrega.value;

        if (paso1) paso1.classList.add('hidden');
        if (paso2) paso2.classList.remove('hidden');
        if (acciones) acciones.classList.add('hidden');
        if (accionesExito) accionesExito.classList.remove('hidden');
        if (paso2) paso2.focus();
      });
    }
  }

  function iniciarSeguir() {
    const boton = document.getElementById('btn-seguir');
    if (!boton) return;

    boton.addEventListener('click', function () {
      const siguiendo = boton.getAttribute('aria-pressed') === 'true';
      const nuevoEstado = !siguiendo;
      boton.setAttribute('aria-pressed', String(nuevoEstado));
      boton.textContent = nuevoEstado ? 'Siguiendo' : 'Seguir';
      boton.classList.toggle('btn-verde', !nuevoEstado);
      boton.classList.toggle('btn-contorno', nuevoEstado);
    });
  }

  function iniciarPlanes() {
    const botones = document.querySelectorAll('[data-plan-vista]');
    const paneles = document.querySelectorAll('[data-plan-panel]');
    if (!botones.length || !paneles.length) return;

    function activar(vista) {
      botones.forEach(function (boton) {
        const activo = boton.getAttribute('data-plan-vista') === vista;
        boton.setAttribute('aria-pressed', String(activo));
        boton.classList.toggle('bg-brand-700', activo);
        boton.classList.toggle('text-white', activo);
        boton.classList.toggle('shadow-sm', activo);
        boton.classList.toggle('text-ink-500', !activo);
        boton.classList.toggle('hover:text-brand-700', !activo);
      });

      paneles.forEach(function (panel) {
        panel.classList.toggle('hidden', panel.getAttribute('data-plan-panel') !== vista);
      });
    }

    botones.forEach(function (boton) {
      boton.addEventListener('click', function () {
        activar(boton.getAttribute('data-plan-vista'));
      });
    });

    const inicial = document.querySelector('[data-plan-vista][aria-pressed="true"]');
    activar(inicial ? inicial.getAttribute('data-plan-vista') : 'compradores');
  }

  function iniciarAcordeon() {
    const botones = document.querySelectorAll('[data-acordeon-boton]');
    if (!botones.length) return;

    botones.forEach(function (boton) {
      const panel = document.getElementById(boton.getAttribute('aria-controls'));
      if (!panel) return;

      boton.addEventListener('click', function () {
        const abierto = boton.getAttribute('aria-expanded') === 'true';
        const nuevo = !abierto;
        boton.setAttribute('aria-expanded', String(nuevo));
        panel.classList.toggle('hidden', !nuevo);
        boton.classList.toggle('text-brand-700', nuevo);
        boton.classList.toggle('text-ink-900', !nuevo);

        const icono = boton.querySelector('[data-acordeon-icono]');
        if (icono) {
          icono.classList.toggle('rotate-45', nuevo);
          icono.classList.toggle('text-brand-600', nuevo);
          icono.classList.toggle('text-ink-400', !nuevo);
        }
      });
    });
  }

  function iniciarAvisoDemo() {
    const aviso = document.getElementById('aviso-planes');
    const texto = document.getElementById('aviso-planes-texto');
    const cerrar = document.getElementById('cerrar-aviso');
    const botones = document.querySelectorAll('[data-aviso]');
    if (!aviso || !botones.length) return;

    let temporizador = null;

    function ocultar() {
      aviso.classList.add('hidden');
      if (temporizador) {
        clearTimeout(temporizador);
        temporizador = null;
      }
    }

    function mostrar(mensaje) {
      if (texto) texto.textContent = mensaje;
      aviso.classList.remove('hidden');
      if (temporizador) clearTimeout(temporizador);
      temporizador = setTimeout(ocultar, 6000);
    }

    botones.forEach(function (boton) {
      boton.addEventListener('click', function () {
        mostrar(boton.getAttribute('data-aviso') || 'Este es un prototipo: la acción se habilitará con el lanzamiento.');
      });
    });

    if (cerrar) cerrar.addEventListener('click', ocultar);
  }

  function iniciarTransacciones() {
    const cuerpo = document.getElementById('cuerpo-transacciones');
    const lista = document.getElementById('lista-transacciones');
    const datos = window.TICO;
    const ui = window.TICOUI;
    if (!cuerpo || !lista || !datos || !datos.TRANSACCIONES || !ui) return;

    const modal = document.getElementById('modal-transaccion');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalContenido = document.getElementById('modal-contenido');
    const cerrar = document.getElementById('cerrar-modal');
    const fondo = document.getElementById('modal-fondo');
    const buscar = document.getElementById('buscar-transaccion');
    const filtroRol = document.getElementById('filtro-rol');
    const filtroEstado = document.getElementById('filtro-estado');
    const limpiar = document.getElementById('limpiar-transacciones');
    const conteo = document.getElementById('conteo-transacciones');
    const conteoVisible = document.getElementById('conteo-visible');
    const vacio = document.getElementById('transacciones-vacio');
    const total = datos.TRANSACCIONES.length;
    let ultimoFoco = null;

    const ESTADOS = {
      camino: { texto: 'En camino', clases: 'bg-brand-50 text-brand-700' },
      revision: { texto: 'En revisión', clases: 'bg-amber-50 text-amber-700' },
      pendiente: { texto: 'Por enviar', clases: 'bg-amber-50 text-amber-700' },
      completada: { texto: 'Completada', clases: 'bg-tico-50 text-tico-700' },
      cancelada: { texto: 'Cancelada', clases: 'bg-rose-50 text-rose-700' },
    };

    const ICONOS_TONO = {
      azul: 'bg-brand-50 text-brand-600',
      verde: 'bg-tico-50 text-tico-600',
      ambar: 'bg-amber-50 text-amber-600',
      rosa: 'bg-rose-50 text-rose-500',
      violeta: 'bg-violet-50 text-violet-600',
    };

    function normalizar(texto) {
      return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function rolTexto(transaccion) {
      return transaccion.rol === 'compra' ? 'Compra' : 'Venta';
    }

    function selloEstado(transaccion) {
      const estado = ESTADOS[transaccion.estado] || ESTADOS.camino;
      return '<span class="sello whitespace-nowrap ' + estado.clases + '">' +
        '<span class="h-1.5 w-1.5 rounded-full bg-current"></span>' + estado.texto + '</span>';
    }

    function atributosFila(transaccion) {
      return ' data-fila-transaccion data-estado="' + transaccion.estado + '"' +
        ' data-rol="' + transaccion.rol + '"' +
        ' data-buscar="' + normalizar(transaccion.id + ' ' + transaccion.producto + ' ' + transaccion.contraparte) + '"';
    }

    function filaTabla(transaccion) {
      const tono = ICONOS_TONO[transaccion.tono] || ICONOS_TONO.azul;
      const rolClases = transaccion.rol === 'compra' ? 'bg-brand-50 text-brand-700' : 'bg-violet-50 text-violet-700';
      return '<tr class="border-t border-gray-100 transition hover:bg-brand-50/30"' + atributosFila(transaccion) + '>' +
        '<td class="whitespace-nowrap px-5 py-4 align-middle">' +
        '<span class="font-bold text-ink-900">' + transaccion.id + '</span>' +
        '<span class="block text-[11px] text-ink-400">' + transaccion.fecha + '</span></td>' +
        '<td class="px-5 py-4">' +
        '<div class="flex items-center gap-3">' +
        '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ' + tono + '">' +
        ui.icono(transaccion.icono, 'h-5 w-5') + '</span>' +
        '<div><p class="font-semibold leading-snug text-ink-900">' + transaccion.producto + '</p>' +
        '<p class="text-[11px] text-ink-500">' + transaccion.contraparte + '</p></div></div></td>' +
        '<td class="whitespace-nowrap px-5 py-4"><span class="sello ' + rolClases + '">' + rolTexto(transaccion) + '</span></td>' +
        '<td class="whitespace-nowrap px-5 py-4 text-right font-bold text-ink-900">' + datos.formatearColones(transaccion.monto) + '</td>' +
        '<td class="whitespace-nowrap px-5 py-4">' + selloEstado(transaccion) + '</td>' +
        '<td class="whitespace-nowrap px-5 py-4 text-right">' +
        '<button type="button" data-ver-pedido="' + transaccion.id + '" class="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-brand-700 transition hover:text-brand-800">' +
        'Ver detalle ' + ui.icono('chevron-right', 'h-3.5 w-3.5') + '</button></td></tr>';
    }

    function tarjetaMovil(transaccion) {
      const tono = ICONOS_TONO[transaccion.tono] || ICONOS_TONO.azul;
      return '<article class="rounded-2xl border border-gray-100 bg-white p-4 shadow-tarjeta"' + atributosFila(transaccion) + '>' +
        '<div class="flex items-start justify-between gap-3">' +
        '<div class="flex min-w-0 items-start gap-3">' +
        '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ' + tono + '">' +
        ui.icono(transaccion.icono, 'h-5 w-5') + '</span>' +
        '<div class="min-w-0"><p class="text-[11px] font-bold text-ink-400">' + transaccion.id + ' · ' + transaccion.fecha + '</p>' +
        '<p class="mt-0.5 text-sm font-bold leading-snug text-ink-900">' + transaccion.producto + '</p></div></div>' +
        '<span class="shrink-0">' + selloEstado(transaccion) + '</span></div>' +
        '<div class="mt-3 flex items-center justify-between gap-3">' +
        '<span class="text-xs text-ink-500">' + rolTexto(transaccion) + ' · ' + transaccion.contraparte + '</span>' +
        '<span class="text-sm font-extrabold text-ink-900">' + datos.formatearColones(transaccion.monto) + '</span></div>' +
        '<button type="button" data-ver-pedido="' + transaccion.id + '" class="btn-contorno mt-3 w-full px-4 py-2 text-xs">Ver detalle</button>' +
        '</article>';
    }

    function plantillaModal(transaccion) {
      const estado = ESTADOS[transaccion.estado] || ESTADOS.camino;
      const tono = ICONOS_TONO[transaccion.tono] || ICONOS_TONO.azul;
      const rol = rolTexto(transaccion);
      const esCancelada = transaccion.estado === 'cancelada';
      const etiquetas = ['Pago', 'Envío', 'Entrega'];
      const pasos = etiquetas.map(function (etiqueta, indice) {
        const hecho = indice < transaccion.avance;
        const activo = indice === transaccion.avance;
        const circulo = hecho
          ? 'bg-tico-500 text-white'
          : activo
            ? 'bg-brand-700 text-white ring-4 ring-brand-100'
            : 'border border-gray-200 bg-white text-ink-400';
        const detalle = hecho ? 'Completado' : activo ? 'En curso' : 'Pendiente';
        const contenido = hecho
          ? ui.icono('check', 'h-4 w-4')
          : '<span class="text-[11px] font-bold">' + (indice + 1) + '</span>';
        return '<div class="text-center">' +
          '<span class="mx-auto flex h-8 w-8 items-center justify-center rounded-full ' + circulo + '">' + contenido + '</span>' +
          '<p class="mt-1.5 text-[11px] font-bold text-ink-900">' + etiqueta + '</p>' +
          '<p class="text-[10px] text-ink-400">' + detalle + '</p></div>';
      }).join('');

      const progreso = esCancelada
        ? '<div class="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs leading-relaxed text-rose-700">' +
          'Este pedido fue cancelado. No se completó ningún cobro y la evidencia quedó archivada.</div>'
        : '<div class="grid grid-cols-3 gap-2">' + pasos + '</div>';

      const filas = [
        ['Pedido', transaccion.id],
        ['Fecha', transaccion.fecha],
        ['Rol', rol],
        ['Método de pago', transaccion.metodo],
        ['Entrega', transaccion.entrega],
        ['Ubicación', transaccion.ubicacion],
      ].map(function (fila) {
        return '<div class="flex items-start justify-between gap-4 py-2.5">' +
          '<dt class="text-ink-500">' + fila[0] + '</dt>' +
          '<dd class="text-right font-semibold text-ink-900">' + fila[1] + '</dd></div>';
      }).join('');

      const comprobante = transaccion.comprobante
        ? '<div class="mt-5 rounded-2xl border p-4 ' +
          (esCancelada ? 'border-gray-200 bg-gray-50' : 'border-tico-100 bg-tico-50/60') + '">' +
          '<div class="flex items-center justify-between gap-3">' +
          '<span class="flex items-center gap-2 text-xs font-bold ' +
          (esCancelada ? 'text-ink-500' : 'text-tico-700') + '">' +
          ui.icono('receipt', 'h-4 w-4') + 'Evidencia de pago</span>' +
          (esCancelada
            ? '<span class="sello bg-white text-ink-500">' + ui.icono('receipt', 'h-3.5 w-3.5') + 'Archivada</span>'
            : '<span class="sello bg-white text-tico-700">' + ui.icono('check', 'h-3.5 w-3.5') + 'Verificada</span>') +
          '</div>' +
          '<p class="mt-3 font-mono text-sm font-bold text-ink-900">' + transaccion.comprobante + '</p>' +
          '<p class="text-xs text-ink-500">' + transaccion.metodo + ' · ' +
          datos.formatearColones(transaccion.monto) + ' · ' + transaccion.fecha + '</p>' +
          '<button type="button" class="btn-contorno mt-3 w-full px-4 py-2 text-xs">' +
          ui.icono('download', 'h-4 w-4') + 'Descargar comprobante</button>' +
          '<p class="mt-2 text-[10px] text-ink-400">' +
          (esCancelada ? 'Comprobante archivado. No se realizó ningún cobro.' : 'Documento de demostración, sin validez real.') +
          '</p></div>'
        : '';

      return '<div class="flex items-start justify-between gap-3">' +
        '<div class="flex items-start gap-3">' +
        '<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ' + tono + '">' +
        ui.icono(transaccion.icono, 'h-6 w-6') + '</span>' +
        '<div><p class="text-xs font-semibold text-ink-500">' + rol + ' · ' + transaccion.contraparte + '</p>' +
        '<h3 class="mt-0.5 text-sm font-bold leading-snug text-ink-900">' + transaccion.producto + '</h3></div></div>' +
        '<span class="sello shrink-0 ' + estado.clases + '">' + estado.texto + '</span></div>' +
        '<p class="mt-4 text-2xl font-extrabold tracking-tight text-ink-900">' +
        datos.formatearColones(transaccion.monto) + '</p>' +
        '<div class="mt-5">' + progreso + '</div>' +
        '<dl class="mt-5 divide-y divide-gray-100 text-xs">' + filas + '</dl>' +
        comprobante +
        '<div class="mt-5 space-y-2">' +
        '<button type="button" class="btn-contorno w-full px-4 py-2.5 text-xs">' +
        ui.icono('chat', 'h-4 w-4') + 'Contactar a ' + transaccion.contraparte + '</button>' +
        '<button type="button" class="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50">' +
        ui.icono('flag', 'h-4 w-4') + 'Reportar un problema</button></div>';
    }

    function abrirModal(id, origen) {
      const transaccion = datos.TRANSACCIONES.find(function (item) {
        return item.id === id;
      });
      if (!transaccion || !modal || !modalContenido) return;

      ultimoFoco = origen || document.activeElement;
      if (modalTitulo) modalTitulo.textContent = transaccion.id;
      modalContenido.innerHTML = plantillaModal(transaccion);
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      if (cerrar) cerrar.focus();
    }

    function cerrarModal() {
      if (!modal || modal.classList.contains('hidden')) return;
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    function aplicarFiltros() {
      const texto = buscar ? normalizar(buscar.value.trim()) : '';
      const rol = filtroRol ? filtroRol.value : '';
      const estado = filtroEstado ? filtroEstado.value : '';

      document.querySelectorAll('[data-fila-transaccion]').forEach(function (fila) {
        const coincide = (!texto || fila.getAttribute('data-buscar').indexOf(texto) !== -1) &&
          (!rol || fila.getAttribute('data-rol') === rol) &&
          (!estado || fila.getAttribute('data-estado') === estado);
        fila.classList.toggle('hidden', !coincide);
      });

      const visibles = cuerpo.querySelectorAll('[data-fila-transaccion]:not(.hidden)').length;
      if (conteo) conteo.textContent = visibles + ' de ' + total + ' transacciones';
      if (conteoVisible) conteoVisible.textContent = String(visibles);
      if (vacio) vacio.classList.toggle('hidden', visibles !== 0);
    }

    cuerpo.innerHTML = datos.TRANSACCIONES.map(filaTabla).join('');
    lista.innerHTML = datos.TRANSACCIONES.map(tarjetaMovil).join('');

    [buscar, filtroRol, filtroEstado].forEach(function (campo) {
      if (!campo) return;
      campo.addEventListener('input', aplicarFiltros);
      campo.addEventListener('change', aplicarFiltros);
    });

    if (limpiar) {
      limpiar.addEventListener('click', function () {
        if (buscar) buscar.value = '';
        if (filtroRol) filtroRol.value = '';
        if (filtroEstado) filtroEstado.value = '';
        aplicarFiltros();
        if (buscar) buscar.focus();
      });
    }

    document.addEventListener('click', function (evento) {
      const disparador = evento.target.closest ? evento.target.closest('[data-ver-pedido]') : null;
      if (!disparador) return;
      abrirModal(disparador.getAttribute('data-ver-pedido'), disparador);
    });

    if (cerrar) cerrar.addEventListener('click', cerrarModal);
    if (fondo) fondo.addEventListener('click', cerrarModal);

    document.addEventListener('keydown', function (evento) {
      if (evento.key !== 'Escape') return;
      cerrarModal();
    });

    aplicarFiltros();
  }

  function evitarEnvioFiltros() {
    const formulario = document.getElementById('form-filtros');
    if (!formulario) return;
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    iniciarFiltros();
    iniciarVista();
    iniciarGaleria();
    iniciarPestanas();
    iniciarPublicacion();
    iniciarEntrega();
    iniciarOpcionesCompra();
    iniciarCompra();
    iniciarSeguir();
    iniciarPlanes();
    iniciarAcordeon();
    iniciarAvisoDemo();
    iniciarTransacciones();
    evitarEnvioFiltros();
  });
})();