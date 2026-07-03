// 1. Capturamos todos los elementos de la página
const inputNombre = document.getElementById('input-nombre');
const inputMensaje = document.getElementById('input-mensaje');
const inputWhatsapp = document.getElementById('input-whatsapp');
const btnGenerar = document.getElementById('btn-generar');
const zonaResultado = document.getElementById('zona-resultado');
const inputResultado = document.getElementById('link-generado');
const imagenQr = document.getElementById('imagen-qr');
const btnCopiar = document.getElementById('btn-copiar');
const btnDescargarQr = document.getElementById('btn-descargar-qr');

// 2. Lógica al presionar "Generar Carta"
btnGenerar.addEventListener('click', () => {
    const nombre = inputNombre.value;
    const mensaje = inputMensaje.value;
    // Capturamos el número y limpiamos los espacios o el símbolo +
    const whatsapp = inputWhatsapp.value.replace(/\D/g, '');

    if (!nombre || !mensaje) {
        alert("Por favor, llena el nombre y el mensaje para crear la carta.");
        return;
    }

    // Armamos los datos encriptados
    const datos = JSON.stringify({ n: nombre, m: mensaje, w: whatsapp });
    const codigoSecreto = btoa(encodeURIComponent(datos));

    // Generamos la URL
    const rutaBase = window.location.href.split('generador.html')[0];
    const linkFinal = `${rutaBase}carta.html?code=${codigoSecreto}`;

    // Mostramos la URL en pantalla
    inputResultado.value = linkFinal;

    // Generamos el QR
    const urlApiQr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(linkFinal)}`;
    imagenQr.src = urlApiQr;
    imagenQr.style.display = 'block';

    // Desplegamos la zona inferior
    btnDescargarQr.style.display = 'block';
    zonaResultado.style.display = 'block';
    zonaResultado.classList.remove('oculto');
});

// 3. Seleccionar texto al hacer clic
inputResultado.addEventListener('click', () => inputResultado.select());

// 4. Copiar al portapapeles
btnCopiar.addEventListener('click', () => {
    navigator.clipboard.writeText(inputResultado.value).then(() => {
        const textoOriginal = btnCopiar.innerText;
        btnCopiar.innerText = '¡Copiado! ✓';
        btnCopiar.style.backgroundColor = '#10b981';
        setTimeout(() => {
            btnCopiar.innerText = textoOriginal;
            btnCopiar.style.backgroundColor = '#4b5563';
        }, 2000);
    });
});

// 5. Descargar el Código QR
btnDescargarQr.addEventListener('click', () => {
    const urlImagen = imagenQr.src;
    // Reemplaza espacios del nombre con guiones bajos para el archivo
    const nombrePersona = inputNombre.value.trim().replace(/\s+/g, '_');

    btnDescargarQr.innerText = 'Procesando...';
    btnDescargarQr.style.backgroundColor = '#1d4ed8';

    fetch(urlImagen)
        .then(respuesta => respuesta.blob())
        .then(blob => {
            const urlLocal = window.URL.createObjectURL(blob);
            const enlaceFalso = document.createElement('a');
            enlaceFalso.href = urlLocal;
            enlaceFalso.download = `codigo_qr_carta_${nombrePersona}.png`;
            document.body.appendChild(enlaceFalso);
            enlaceFalso.click();
            document.body.removeChild(enlaceFalso);
            window.URL.revokeObjectURL(urlLocal);

            btnDescargarQr.innerText = '📥 Descargar QR';
            btnDescargarQr.style.backgroundColor = '#2563eb';
        })
        .catch(error => {
            console.error("Error al descargar: ", error);
            alert("No se pudo descargar de forma automática.");
            btnDescargarQr.innerText = '📥 Descargar QR';
            btnDescargarQr.style.backgroundColor = '#2563eb';
        });
});

