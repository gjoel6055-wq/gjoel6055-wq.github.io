const btnNo = document.getElementById('btn-no');
const btnSi = document.getElementById('btn-si');
const mensajeExito = document.getElementById('mensaje-exito');
const mensajeOriginal = document.querySelector('.mensaje');
const contenedorBotones = document.querySelector('.botones');

// Variable global para guardar el número si es que lo enviaron
let numeroDestino = "";

window.onload = () => {
    const parametros = new URLSearchParams(window.location.search);
    const codigo = parametros.get('code');

    if (codigo) {
        try {
            const datosDecodificados = JSON.parse(decodeURIComponent(atob(codigo)));

            document.querySelector('h1').innerText = `Para ${datosDecodificados.n} 💌`;
            mensajeOriginal.innerText = datosDecodificados.m;

            // Si el generador incluyó un número de WhatsApp, lo guardamos
            if (datosDecodificados.w) {
                numeroDestino = datosDecodificados.w;
            }

        } catch (error) {
            console.error("El enlace parece estar roto o modificado.");
            mensajeOriginal.innerText = "Hubo un error leyendo esta carta. Asegúrate de copiar el link completo.";
        }
    } else {
        mensajeOriginal.innerText = "Falta el código de la carta en la dirección web.";
    }
};

function huirBoton() {
    const anchoPantalla = window.innerWidth - btnNo.offsetWidth;
    const altoPantalla = window.innerHeight - btnNo.offsetHeight;

    const nuevoX = Math.floor(Math.random() * anchoPantalla);
    const nuevoY = Math.floor(Math.random() * altoPantalla);

    btnNo.style.position = 'fixed';
    btnNo.style.left = `${nuevoX}px`;
    btnNo.style.top = `${nuevoY}px`;
}

btnNo.addEventListener('mouseover', huirBoton);
btnNo.addEventListener('touchstart', function(e) {
    e.preventDefault();
    huirBoton();
});

// La nueva lógica del botón "Sí"
btnSi.addEventListener('click', () => {
    // Mostramos el mensaje de éxito en la pantalla como siempre
    mensajeOriginal.style.display = 'none';
    contenedorBotones.style.display = 'none';
    mensajeExito.style.display = 'block';

    // Si tenemos un número guardado, la redirigimos a WhatsApp
    if (numeroDestino !== "") {
        // Armamos el texto predeterminado que ella te enviará
        const textoRespuesta = encodeURIComponent("¡Hola! Vi la carta y la respuesta es SÍ ✨ Me encantaría salir.");
        const urlWhatsapp = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${textoRespuesta}`;

        // Abrimos WhatsApp en una pestaña nueva después de 1.5 segundos para que alcance a leer el mensaje de éxito
        setTimeout(() => {
            window.open(urlWhatsapp, '_blank');
        }, 1500);
    }
});