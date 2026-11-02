document.addEventListener("contextmenu", function (_0x3069f2) {
  _0x3069f2.preventDefault();
}, false);
(function () {
  var _0x4bd8ae = console;
  Object.defineProperty(window, 'console', {
    'get': function () {
      return _0x4bd8ae;
    },
    'set': function (_0x13e14c) {
      _0x4bd8ae = _0x13e14c;
    }
  });
})();
async function cargar() {
  const _0x187786 = await fetch("https://script.google.com/macros/s/AKfycbyXGiTXl5F6p7_ClG6ne18nEqIXNhHiQYLNdp5G1uU2_jo1dbJ5-knpFeoU_5mwXK1E/exec?action=obtener");
  const _0x4628bb = await _0x187786.json();
  const _0x23e751 = document.getElementById("indumentaria");
  _0x23e751.innerHTML = '';
  _0x4628bb.disponibles.forEach(_0x5b5487 => {
    const _0x2a82c6 = document.createElement("option");
    _0x2a82c6.value = _0x5b5487;
    _0x2a82c6.textContent = _0x5b5487;
    _0x23e751.appendChild(_0x2a82c6);
  });
}
async function enviar() {

  const _0x13869e = document.getElementById('btn');
  _0x13869e.disabled = true;
  const _0x586d14 = {
    'participante': document.getElementById("participante").value.trim(),
    'pareja': document.getElementById("pareja").value.trim(),
    'indumentaria': document.getElementById("indumentaria").value,
    'telefono': document.getElementById('telefono').value.trim()
  };
    if(_0x586d14.participante ==""||_0x586d14.pareja==""||_0x586d14.telefono==""){
    Swal.fire({
        'icon': "warning",
        'title': "Ocurrio un problema",
        'text': "Debes llenar todos los campos.",
        'confirmButtonText': "Entendido"
      })
      _0x13869e.disabled = false;
      return;
  }
  try {
    const _0x2c18e6 = await fetch("https://script.google.com/macros/s/AKfycbyXGiTXl5F6p7_ClG6ne18nEqIXNhHiQYLNdp5G1uU2_jo1dbJ5-knpFeoU_5mwXK1E/exec?action=registrar", {
      'method': 'POST',
      'body': new URLSearchParams(_0x586d14)
    });
    const _0xbf429b = await _0x2c18e6.json();
    if (_0xbf429b.ok !== true) {
      await Swal.fire({
        'icon': "error",
        'title': "Lo sentimos 😔",
        'text': "Alguien más ha registrado la indumentaria antes que tú. Por favor intenta nuevamente eligiendo otra indumentaria.",
        'confirmButtonText': "Entendido"
      });
      _0x13869e.disabled = false;
      await cargar();
      return;
    }
    await Swal.fire({
      'icon': "success",
      'title': "¡Registro exitoso! 🎉",
      'text': "Tu preinscripción fue registrada correctamente.",
      'confirmButtonText': "Perfecto"
    });
    location.reload();
  } catch (_0x1d04f6) {
    console.error(_0x1d04f6);
    await Swal.fire({
      'icon': "error",
      'title': "Error inesperado",
      'text': "Ocurrió un problema al registrar tu información. Intenta nuevamente.",
      'confirmButtonText': 'Aceptar'
    });
    _0x13869e.disabled = false;
  }
}
cargar();