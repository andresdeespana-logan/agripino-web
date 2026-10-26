/* =========================================================
   DATOS DE CONTACTO: cambiar SOLO aquí y se actualiza toda la web.
   whatsapp: número con prefijo de país, sin espacios ni "+" (ej. 34612345678)
   ========================================================= */
var CONFIG = {
  telefono: "630 441 204",
  whatsapp: "34630441204",       // mismo número que el teléfono
  email: "agripino_ortiz63@hotmail.com",
  mensajeWhatsapp: "Hola, buenos días. Me gustaría pedir cita en la peluquería.",
  mapsUrl: "https://maps.app.goo.gl/jZgoULTzz87WoUDC6",
  mapaEmbed: "https://www.google.com/maps?q=Peluquer%C3%ADa+de+Caballeros+Agripino+Ortiz,+Calle+Rafael+Terol+32,+03001+Alicante&output=embed"
};

(function () {
  var datosOk = CONFIG.email.indexOf("pendiente") === -1;
  if (datosOk) document.documentElement.classList.add("datos-ok");

  var wa = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.mensajeWhatsapp);
  var tel = "tel:+34" + CONFIG.telefono.replace(/\s+/g, "");

  document.querySelectorAll("[data-whatsapp]").forEach(function (a) { a.href = wa; });
  document.querySelectorAll("[data-tel]").forEach(function (a) { a.href = tel; });
  document.querySelectorAll("[data-tel-texto]").forEach(function (el) { el.textContent = CONFIG.telefono; });
  document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + CONFIG.email; a.textContent = CONFIG.email; });
  document.querySelectorAll("[data-maps]").forEach(function (a) { a.href = CONFIG.mapsUrl; });

  // Mapa: se inserta solo en un servidor normal (en la vista previa queda el aviso con el botón)
  var mapa = document.getElementById("mapa");
  if (mapa && !/claude|anthropic/.test(location.hostname) && location.protocol.indexOf("http") === 0) {
    var f = document.createElement("iframe");
    f.src = CONFIG.mapaEmbed;
    f.title = "Mapa de la Peluquería de Caballeros Agripino Ortiz";
    f.loading = "lazy";
    f.referrerPolicy = "no-referrer-when-downgrade";
    mapa.appendChild(f);
  }

  // Letra más grande (se recuerda en este navegador)
  var btn = document.getElementById("btn-letra");
  function aplicar(on) {
    document.documentElement.classList.toggle("letra-grande", on);
    if (btn) { btn.setAttribute("aria-pressed", on ? "true" : "false"); btn.textContent = on ? "Letra normal" : "Letra más grande"; }
  }
  try { aplicar(localStorage.getItem("agripino-letra") === "1"); } catch (e) {}
  if (btn) btn.addEventListener("click", function () {
    var on = !document.documentElement.classList.contains("letra-grande");
    aplicar(on);
    try { localStorage.setItem("agripino-letra", on ? "1" : "0"); } catch (e) {}
  });

  // Panorámica: en móvil empieza centrada
  var pano = document.getElementById("panoramica");
  if (pano) {
    var centrar = function () { pano.scrollLeft = (pano.scrollWidth - pano.clientWidth) / 2; };
    var img = pano.querySelector("img");
    if (img && img.complete) centrar(); else if (img) img.addEventListener("load", centrar);
  }

  var anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
