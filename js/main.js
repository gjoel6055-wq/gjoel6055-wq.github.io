// Capturamos el botón y el cuerpo de la página
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Revisamos si ya guardaste una preferencia en el navegador previamente
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️ Claro';
}

// Escuchamos el clic en el botón
themeToggleBtn.addEventListener('click', () => {
    // Si está en oscuro, lo pasamos a claro
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌙 Oscuro';
        localStorage.setItem('theme', 'light');
    } else {
        // Si está en claro, lo pasamos a oscuro
        body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️ Claro';
        localStorage.setItem('theme', 'dark');
    }
});