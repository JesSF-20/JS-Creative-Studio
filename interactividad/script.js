// --- FUNCIONALIDAD DEL MODAL Y APERTURA DE PROYECTOS ---

const modal = document.getElementById('projectModal'); // Asegúrate que en tu HTML el ID sea projectModal
const modalBody = document.getElementById('modalBody'); // Asegúrate que el ID del contenedor interno sea modalBody
const closeBtn = document.querySelector('.close-modal');

// Función unificada para abrir proyectos
function abrirProyecto(src) {
    if (!modalBody) return;
    
    modalBody.innerHTML = ''; // Limpiar contenido previo
    
    // 1. Lógica para YouTube (Iframes)
    if (src.includes('youtube.com') || src.includes('embed') || src.includes('youtu.be')) {
        // Dentro de tu función abrirProyecto, el iframe debe verse así:
modalBody.innerHTML = `
    <iframe width="100%" height="450px" 
        src="${src}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen 
        style="border-radius:15px;">
    </iframe>`;
    } 
    // 2. Lógica para Imágenes
    else if (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.gif')) {
        modalBody.innerHTML = `<img src="${src}" class="modal-img" style="width:100%; border-radius:15px;">`;
    } 
    // 3. Lógica para Videos Locales
    else {
        modalBody.innerHTML = `
            <video controls autoplay class="modal-video" style="width:100%; border-radius:15px;">
                <source src="${src}" type="video/mp4">
                Tu navegador no soporta videos.
            </video>`;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

// Escuchar clics en los títulos (h3 con clase .open-modal)
document.querySelectorAll('.open-modal').forEach(item => {
    item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        // Quitamos el ../ si existe para que funcione en GitHub
        const cleanSrc = src.replace('../', '');
        abrirProyecto(cleanSrc);
    });
});

// Función para cerrar el modal
function cerrarModal() {
    if (modal) {
        modal.style.display = 'none';
        modalBody.innerHTML = ''; // Importante: vacía el contenido para detener el audio/video
        document.body.style.overflow = 'auto';
    }
}

// Listeners para cerrar
if (closeBtn) closeBtn.onclick = cerrarModal;

window.onclick = (e) => {
    if (e.target === modal) cerrarModal();
};

window.onkeydown = (e) => {
    if (e.key === "Escape") cerrarModal();
};