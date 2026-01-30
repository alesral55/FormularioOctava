 document.addEventListener('contextmenu', function(e) {
     e.preventDefault();
 }, false);
 
 (function() {
     var _z = console;
     Object.defineProperty(window, "console", {
         get: function() {
             return _z;
         },
         set: function(val) {
             _z = val;
         }
     });
 })();

const API = "https://script.google.com/macros/s/AKfycbyXGiTXl5F6p7_ClG6ne18nEqIXNhHiQYLNdp5G1uU2_jo1dbJ5-knpFeoU_5mwXK1E/exec";

async function cargar() {
  const res = await fetch(API + "?action=obtener");
  const data = await res.json();

  const sel = document.getElementById("indumentaria");
  sel.innerHTML = "";

  data.disponibles.forEach(n => {
    const o = document.createElement("option");
    o.value = n;
    o.textContent = n;
    sel.appendChild(o);
  });
}


async function enviar() {
  const btn = document.getElementById("btn");
  btn.disabled = true;

  const payload = {
    participante: document.getElementById("participante").value.trim(),
    pareja: document.getElementById("pareja").value.trim(),
    indumentaria: document.getElementById("indumentaria").value,
    telefono: document.getElementById("telefono").value.trim()
  };

  try {
    const response = await fetch(API + "?action=registrar", {
      method: "POST",
      body: new URLSearchParams(payload)
    });

    const res = await response.json();

    if (res.ok !== true) {
      await Swal.fire({
        icon: "error",
        title: "Lo sentimos 😔",
        text: "Alguien más ha registrado la indumentaria antes que tú. Por favor intenta nuevamente eligiendo otra indumentaria.",
        confirmButtonText: "Entendido"
      });

      btn.disabled = false;
      await cargar(); 
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "¡Registro exitoso! 🎉",
      text: "Tu preinscripción fue registrada correctamente. Recuerda realizar tu anticipo dentro de los próximos 7 días.",
      confirmButtonText: "Perfecto"
    });

    location.reload();

  } catch (err) {
    console.error(err);

    await Swal.fire({
      icon: "error",
      title: "Error inesperado",
      text: "Ocurrió un problema al registrar tu información. Intenta nuevamente.",
      confirmButtonText: "Aceptar"
    });

    btn.disabled = false;
  }
}
cargar();