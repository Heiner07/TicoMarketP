/**
 * Componentes visuales compartidos por las páginas del prototipo.
 * Genera HTML a partir de los datos de demostración.
 */
(function () {
  'use strict';

  const ICONOS = {
    laptop: '<rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M2 20h20"/>',
    sofa: '<path d="M5.5 11V8.5A2.5 2.5 0 0 1 8 6h8a2.5 2.5 0 0 1 2.5 2.5V11"/><path d="M3 14.5a2 2 0 0 1 4 0V16h10v-1.5a2 2 0 0 1 4 0V19H3z"/>',
    shirt: '<path d="M8.5 4 12 5.8 15.5 4l3.5 3.6-2.5 2V20h-9V9.6l-2.5-2z"/>',
    car: '<path d="M4.5 16 6 10.8A2 2 0 0 1 8 9h8a2 2 0 0 1 2 1.8L19.5 16"/><rect x="3" y="16" width="18" height="3.2" rx="1.2"/><circle cx="7.5" cy="20.4" r="1.4"/><circle cx="16.5" cy="20.4" r="1.4"/>',
    dumbbell: '<rect x="5" y="7" width="3.5" height="10" rx="1.2"/><rect x="15.5" y="7" width="3.5" height="10" rx="1.2"/><path d="M8.5 12h7M2.5 10.5v3M21 10.5v3"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 2 2 0 0 1 1-3.7h3a3 3 0 0 0 3-3A9 9 0 0 0 12 3z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="9.5" cy="7.5" r="1"/><circle cx="14" cy="7" r="1"/>',
    coffee: '<path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/><path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 4.5c0 .8.5 1.2.5 2M11.5 4.5c0 .8.5 1.2.5 2"/>',
    paw: '<circle cx="7" cy="9" r="1.5"/><circle cx="12" cy="7" r="1.5"/><circle cx="17" cy="9" r="1.5"/><path d="M12 11c-2.2 0-4 1.6-4 3.6 0 1.4 1 2.4 2.4 2.4.9 0 1.2-.4 1.6-.4s.7.4 1.6.4c1.4 0 2.4-1 2.4-2.4 0-2-1.8-3.6-4-3.6z"/>',
    bike: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-6h4l-3 6M10 11h6l2 6M9 8h3"/>',
    shoe: '<path d="M3.5 15.5h17l-1.2-3.4a2 2 0 0 0-1.9-1.3h-1.8l-2.6-2.3H9.6L8 11l-4.5 1.6z"/><path d="M3 18.5h18"/><path d="M9.5 8.5l1.2 2.3"/>',
    music: '<path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M10.5 5h3"/>',
    mug: '<path d="M4 7h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 8h1.5a2.5 2.5 0 0 1 0 5H16"/>',
    plant: '<path d="M12 20V9"/><path d="M12 13c-4 0-6-2.5-6-6 3.5 0 6 2 6 6z"/><path d="M12 10c0-3.5 2.2-6 6-6 0 3.6-2.4 6-6 6z"/>',
    table: '<path d="M4 10h16M6 10V7h12v3M5.5 10v9M18.5 10v9"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    menu: '<path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>',
    close: '<path d="M6 18 18 6M6 6l12 12"/>',
    chevron: '<path d="m8 10 4 4 4-4"/>',
    arrow: '<path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>',
    'chevron-right': '<path d="m9 5 7 7-7 7"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
    'map-pin': '<path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M19.5 10.5c0 7.1-7.5 11.2-7.5 11.2S4.5 17.6 4.5 10.5a7.5 7.5 0 1 1 15 0z"/>',
    check: '<path d="m4.5 12.5 5 5 10-11"/>',
    'badge-check': '<path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>',
    shield: '<path d="M9 12.75 11.25 15 15 9.75m-3-7.04A11.96 11.96 0 0 1 3.6 6 12 12 0 0 0 3 9.75c0 5.59 3.82 10.29 9 11.62 5.18-1.33 9-6.03 9-11.62 0-1.31-.21-2.57-.6-3.75h-.15A11.95 11.95 0 0 1 12 2.71z"/>',
    truck: '<path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.4a1.1 1.1 0 0 1-1.1-1.1V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.1c.62 0 1.13-.5 1.09-1.12a17.9 17.9 0 0 0-3.21-9.2 2.06 2.06 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.18v-.96c0-.56-.42-1.05-.99-1.1a48.55 48.55 0 0 0-10.02 0 1.11 1.11 0 0 0-.99 1.1v7.64m12-6.68v6.68m0 4.5v-4.5m0 0h-12"/>',
    receipt: '<path d="M19.5 14.25v-2.63a3.38 3.38 0 0 0-3.38-3.37h-1.5A1.13 1.13 0 0 1 13.5 7.13v-1.5a3.38 3.38 0 0 0-3.38-3.38H8.25m2.25 0H5.63c-.62 0-1.13.5-1.13 1.13v17.25c0 .62.5 1.13 1.13 1.13h12.75c.62 0 1.13-.5 1.13-1.13V11.25a9 9 0 0 0-9-9z"/>',
    lock: '<path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75"/><path d="M6.75 10.5h10.5a2.25 2.25 0 0 1 2.25 2.25v6.75a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V12.75a2.25 2.25 0 0 1 2.25-2.25z"/>',
    plus: '<path d="M12 4.5v15m7.5-7.5h-15"/>',
    heart: '<path d="M21 8.25c0-2.49-2.1-4.5-4.69-4.5-1.93 0-3.6 1.13-4.31 2.73-.71-1.6-2.38-2.73-4.31-2.73C5.1 3.75 3 5.76 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>',
    chat: '<path d="M2.25 12.76c0 1.6 1.12 2.99 2.71 3.23 1.09.16 2.18.28 3.29.37V21l4.08-4.08a1.53 1.53 0 0 1 1.04-.44 48.3 48.3 0 0 0 5.68-.49c1.58-.24 2.7-1.63 2.7-3.23V6.74c0-1.6-1.12-3-2.7-3.23A48.4 48.4 0 0 0 12 3c-2.39 0-4.74.18-7.04.51C3.37 3.75 2.25 5.14 2.25 6.74v6.02z"/>',
    users: '<path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 20.12a7.5 7.5 0 0 1 15 0A17.93 17.93 0 0 1 12 21.75c-2.68 0-5.22-.58-7.5-1.63z"/>',
    store: '<path d="M3.75 9.75 5.5 4.5h13l1.75 5.25"/><path d="M4.5 9.75v9h15v-9"/><path d="M9.75 18.75v-5.25h4.5v5.25"/><path d="M3.75 9.75c0 1.24 1.01 2.25 2.25 2.25s2.25-1 2.25-2.25c0 1.24 1.01 2.25 2.25 2.25S12.75 11 12.75 9.75c0 1.24 1.01 2.25 2.25 2.25s2.25-1 2.25-2.25"/>',
    sparkles: '<path d="M9.81 15.9 9 18.75l-.81-2.85a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.85-.81a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.81 2.85a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.85.81a4.5 4.5 0 0 0-3.09 3.09z"/><path d="m18.26 8.72-.26 1.03-.26-1.03a3.38 3.38 0 0 0-2.45-2.46L14.25 6l1.04-.26a3.38 3.38 0 0 0 2.45-2.46L18 2.25l.26 1.03a3.38 3.38 0 0 0 2.46 2.46L21.75 6l-1.03.26a3.38 3.38 0 0 0-2.46 2.46z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.25"/>',
    'trending-up': '<path d="m3 17.5 6-6.5 4 4 8-8"/><path d="M15 7h6v6"/>',
    megaphone: '<path d="M3 10.5v3a1 1 0 0 0 1 1h2l5 4V5.5l-5 4H4a1 1 0 0 0-1 1z"/><path d="M14 8.5a4 4 0 0 1 0 7"/><path d="M17 5.5a8 8 0 0 1 0 13"/>',
    filter: '<path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M8 3v4M16 3v4M3.5 9.5h17"/>',
    tag: '<path d="M20.5 12.5 12 21l-9-9V3.5h8.5l9 9z"/><circle cx="7.5" cy="8" r="1.2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 1.9"/>',
    'chevron-left': '<path d="m15 5-7 7 7 7"/>',
    'arrow-left': '<path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>',
    alert: '<path d="M12 9v4.5M12 17h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    monitor: '<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8.5 20.5h7M12 16.5v4"/>',
    keyboard: '<rect x="2.5" y="6.5" width="19" height="11" rx="2"/><path d="M6 10.5h.01M9.5 10.5h.01M13 10.5h.01M16.5 10.5h.01M6 14h.01M18 14h.01M9.5 14h5"/>',
    plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>',
    camera: '<path d="M3 8.5h3l1.5-2h9L18 8.5h3v10H3z"/><circle cx="12" cy="13.5" r="3.2"/>',
    upload: '<path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5"/><path d="M4 16v3.5h16V16"/>',
    image: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m3.5 17 5-4.5 3.5 3 3-2.5 5.5 4"/>',
    pencil: '<path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z"/><path d="m13.5 7.5 3 3"/>',
    trash: '<path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13"/><path d="M10 11v5M14 11v5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    flag: '<path d="M5 21V4h9l1 2h5v8h-5l-1-2H5"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M16.5 14.5h.01"/>',
    building: '<path d="M4 21V4h10v17M14 9h6v12"/><path d="M7.5 8h3M7.5 12h3M7.5 16h3M17 13h.01M17 17h.01"/>',
    bag: '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    wrench: '<path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L4 17l3 3 5.3-5.3a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.9-2.9z"/>',
    download: '<path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v3.5h16V17"/>',
  };

  const TONOS = {
    azul: {
      fondo: 'from-brand-50 via-white to-brand-100',
      icono: 'text-brand-600',
      orbe: 'bg-brand-200/50',
    },
    verde: {
      fondo: 'from-tico-50 via-white to-tico-100',
      icono: 'text-tico-600',
      orbe: 'bg-tico-200/50',
    },
    ambar: {
      fondo: 'from-amber-50 via-white to-amber-100',
      icono: 'text-amber-600',
      orbe: 'bg-amber-200/50',
    },
    rosa: {
      fondo: 'from-rose-50 via-white to-rose-100',
      icono: 'text-rose-500',
      orbe: 'bg-rose-200/50',
    },
    violeta: {
      fondo: 'from-violet-50 via-white to-violet-100',
      icono: 'text-violet-600',
      orbe: 'bg-violet-200/50',
    },
  };

  function icono(nombre, clases) {
    const trazos = ICONOS[nombre] || ICONOS.check;
    return (
      '<svg class="' + (clases || 'h-5 w-5') + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true">' + trazos + '</svg>'
    );
  }

  function iconoRelleno(nombre, clases) {
    const trazos = ICONOS[nombre] || ICONOS.star;
    return (
      '<svg class="' + (clases || 'h-5 w-5') + '" viewBox="0 0 24 24" fill="currentColor" ' +
      'stroke="none" aria-hidden="true">' + trazos + '</svg>'
    );
  }

  function tarjetaProducto(producto, modo) {
    const categoria = window.TICO.categoriaPorId(producto.categoria);
    const vendedor = window.TICO.vendedorPorId(producto.vendedorId);
    const tono = TONOS[producto.tono] || TONOS.azul;
    const enLista = modo === 'lista';
    const sello = producto.verificado
      ? '<span class="sello absolute left-3 top-3 bg-white/95 text-tico-700 shadow-sm">' +
        icono('badge-check', 'h-3.5 w-3.5') + ' Verificado</span>'
      : '';
    const imagenClases = enLista
      ? 'relative aspect-[4/3] overflow-hidden bg-gradient-to-br sm:aspect-auto sm:h-auto sm:w-64 sm:shrink-0 '
      : 'relative aspect-[4/3] overflow-hidden bg-gradient-to-br ';
    const contenidoClases = enLista ? 'flex flex-1 flex-col p-4 sm:p-5' : 'flex flex-1 flex-col p-4';
    const tituloClases = enLista
      ? 'mt-1 text-base font-bold leading-snug text-ink-900'
      : 'mt-1 min-h-[2.5rem] line-clamp-2 text-sm font-bold leading-snug text-ink-900';
    const iconoClases = enLista ? 'h-16 w-16 sm:h-24 sm:w-24' : 'h-20 w-20';
    const condicion = enLista
      ? '<p class="mt-1 text-xs text-ink-500">' + producto.condicion + '</p>'
      : '';

    return (
      '<article class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-tarjeta transition duration-200 hover:-translate-y-1 hover:border-brand-100 hover:shadow-suave">' +
      '<a href="producto.html" class="flex h-full flex-col' + (enLista ? ' sm:flex-row' : '') + '">' +
      '<div class="' + imagenClases + tono.fondo + '">' +
      '<span class="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full ' + tono.orbe + '"></span>' +
      '<span class="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full ' + tono.orbe + ' opacity-70"></span>' +
      sello +
      '<span class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-400">' +
      icono('heart', 'h-4 w-4') + '</span>' +
      '<span class="absolute inset-0 flex items-center justify-center ' + tono.icono +
      ' transition-transform duration-300 group-hover:scale-105">' + icono(producto.icono, iconoClases) + '</span>' +
      '</div>' +
      '<div class="' + contenidoClases + '">' +
      '<p class="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">' + categoria.nombre + '</p>' +
      '<h3 class="' + tituloClases + '">' + producto.titulo + '</h3>' +
      condicion +
      '<p class="mt-2 text-lg font-extrabold tracking-tight text-ink-900">' +
      window.TICO.formatearColones(producto.precio) + '</p>' +
      '<div class="mt-1.5 flex items-center gap-1 text-xs text-ink-500">' +
      icono('map-pin', 'h-3.5 w-3.5 shrink-0') +
      '<span class="truncate">' + producto.ubicacion + '</span></div>' +
      '<div class="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs">' +
      '<span class="flex items-center gap-1 font-semibold text-ink-700">' +
      iconoRelleno('star', 'h-3.5 w-3.5 text-amber-400') + producto.rating.toFixed(1) +
      '<span class="font-normal text-ink-400">(' + producto.resenas + ')</span></span>' +
      '<span class="truncate text-ink-400">' + vendedor.nombre + '</span>' +
      '</div></div></a></article>'
    );
  }

  function tarjetaVendedor(vendedor) {
    const premium = vendedor.premium
      ? '<span class="sello bg-amber-50 text-amber-700">' + icono('sparkles', 'h-3.5 w-3.5') + ' Premium</span>'
      : '';

    return (
      '<article class="tarjeta flex h-full flex-col gap-4 p-6 transition hover:-translate-y-1 hover:shadow-suave">' +
      '<div class="flex items-start justify-between gap-3">' +
      '<div class="flex items-center gap-3">' +
      '<span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-lg font-extrabold text-white">' +
      vendedor.iniciales + '</span>' +
      '<div><h3 class="font-bold text-ink-900">' + vendedor.nombre + '</h3>' +
      '<p class="text-xs text-ink-500">' + vendedor.descripcion + '</p></div></div>' +
      '<span class="text-tico-600" title="Vendedor verificado">' + icono('badge-check', 'h-6 w-6') + '</span>' +
      '</div>' +
      '<div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink-500">' +
      '<span class="flex items-center gap-1 font-semibold text-ink-700">' +
      iconoRelleno('star', 'h-3.5 w-3.5 text-amber-400') + vendedor.rating.toFixed(1) + '</span>' +
      '<span>' + vendedor.ventas + ' ventas</span>' +
      '<span class="flex items-center gap-1">' + icono('map-pin', 'h-3.5 w-3.5') + vendedor.ubicacion + '</span>' +
      '</div>' +
      '<div class="flex flex-wrap gap-2">' +
      '<span class="sello bg-tico-50 text-tico-700">' + icono('badge-check', 'h-3.5 w-3.5') + ' Identidad verificada</span>' +
      premium +
      '</div>' +
      '<a href="vendedor.html" class="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">' +
      'Ver perfil ' + icono('chevron-right', 'h-4 w-4') + '</a>' +
      '</article>'
    );
  }

  function tarjetaCategoria(categoria) {
    const tono = TONOS[categoria.tono] || TONOS.azul;
    return (
      '<a href="catalogo.html" class="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-tarjeta transition hover:-translate-y-1 hover:border-brand-100 hover:shadow-suave">' +
      '<span class="flex h-12 w-12 items-center justify-center rounded-xl ' + tono.fondo + ' ' + tono.icono + '">' +
      icono(categoria.icono, 'h-6 w-6') + '</span>' +
      '<span class="text-sm font-bold text-ink-900">' + categoria.nombre + '</span>' +
      '<span class="text-xs text-ink-500">' + categoria.anuncios + ' anuncios</span>' +
      '</a>'
    );
  }

  window.TICOUI = {
    icono: icono,
    iconoRelleno: iconoRelleno,
    tarjetaProducto: tarjetaProducto,
    tarjetaVendedor: tarjetaVendedor,
    tarjetaCategoria: tarjetaCategoria,
  };
})();