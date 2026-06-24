/* --- OPTIMIZACIÓN Y ANIMACIONES PREMIUM --- */

document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECTORES PRINCIPALES
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = document.querySelector(".close-modal");
  const navLinks = document.querySelectorAll(".nav-links a");

  // ===== CARRUSEL INFINITO CON CLONADO + EFECTO CURVO =====
  const track = document.getElementById("carouselTrack");
  const carouselContainer = document.querySelector(".carousel-container");

  if (track && carouselContainer) {
    const items = track.querySelectorAll(".carousel-item");

    // Clonar items para loop infinito
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    // Duración según cantidad
    const totalWidth = items.length * 350;
    const speed = 60;
    const duration = totalWidth / speed;
    track.style.animationDuration = duration + "s";

    // Hover manejado por JS (no CSS :hover)
    let currentHovered = null;

    track.addEventListener("mouseover", (e) => {
      const item = e.target.closest(".carousel-item");
      if (!item || item === currentHovered) return;

      // Quitar hover del anterior
      if (currentHovered) {
        currentHovered.classList.remove("is-hovered");
        currentHovered.style.zIndex = "";
      }

      // Activar hover del nuevo
      currentHovered = item;
      item.classList.add("is-hovered");
      item.style.transform = "rotateY(0deg) scale(1.05) translateZ(30px)";
      item.style.zIndex = "15";
    });

    carouselContainer.addEventListener("mouseleave", () => {
      if (currentHovered) {
        currentHovered.classList.remove("is-hovered");
        currentHovered.style.zIndex = "";
        currentHovered = null;
      }
    });

    // Efecto curvo dinámico
    const updateCurve = () => {
      const containerRect = carouselContainer.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      track.querySelectorAll(".carousel-item").forEach((item) => {
        // No tocar el item con hover
        if (item === currentHovered) return;

        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const distFromCenter =
          (itemCenterX - centerX) / (containerRect.width / 2);

        const rotateY = distFromCenter * 35;
        const scale = 1 - Math.abs(distFromCenter) * 0.15;
        const translateZ = -Math.abs(distFromCenter) * 80;

        item.style.transform = `rotateY(${rotateY}deg) scale(${Math.max(scale, 0.75)}) translateZ(${translateZ}px)`;
      });

      requestAnimationFrame(updateCurve);
    };

    requestAnimationFrame(updateCurve);
  }

  // ===== MODAL DE SERVICIO (Ver más) =====
  const serviceData = {
    "Sitios Web": {
      icon: "fas fa-laptop-code",
      text: "Diseño y desarrollo de sitios web profesionales adaptados a las necesidades de tu negocio. Desde landing pages hasta plataformas completas con funcionalidad avanzada.",
      features: [
        "Diseño 100% responsivo para todos los dispositivos",
        "Optimización SEO para posicionamiento en buscadores",
        "Velocidad de carga optimizada",
        "Panel de administración intuitivo",
        "Integración con redes sociales",
      ],
    },
    "Diseño Publicitario": {
      icon: "fas fa-ad",
      text: "Creación de material gráfico de alto impacto visual para campañas publicitarias digitales e impresas que conectan con tu audiencia.",
      features: [
        "Flyers y volantes profesionales",
        "Banners para redes sociales",
        "Tarjetas de presentación creativas",
        "Diseño de campañas completas",
        "Adaptación a múltiples formatos",
      ],
    },
    Invitaciones: {
      icon: "fas fa-envelope-open-text",
      text: "Invitaciones digitales animadas con diseño elegante y personalizado para cualquier tipo de evento especial.",
      features: [
        "Animaciones interactivas",
        "Confirmación de asistencia integrada",
        "Cuenta regresiva al evento",
        "Mapa de ubicación incluido",
        "Compatibles con WhatsApp y redes",
      ],
    },
    "Identidad Visual": {
      icon: "fas fa-id-card",
      text: "Construcción completa de la identidad de marca que transmite los valores y la esencia de tu negocio de forma profesional.",
      features: [
        "Diseño de logotipo único",
        "Paleta de colores y tipografías",
        "Manual de marca completo",
        "Papelería corporativa",
        "Versiones para diferentes aplicaciones",
      ],
    },
    "Edición Multimedia": {
      icon: "fas fa-video",
      text: "Post-producción profesional de contenido audiovisual para redes sociales, presentaciones y proyectos creativos.",
      features: [
        "Edición de video profesional",
        "Motion graphics y animación",
        "Intros y outros personalizados",
        "Corrección de color avanzada",
        "Optimización para cada plataforma",
      ],
    },
  };

  // Crear modal en el DOM
  const serviceBackdrop = document.createElement("div");
  serviceBackdrop.className = "service-modal-backdrop";
  serviceBackdrop.innerHTML = `
        <div class="service-modal">
            <button class="service-modal-close">&times;</button>
            <i class="service-modal-icon"></i>
            <h3 class="service-modal-title"></h3>
            <p class="service-modal-text"></p>
            <ul class="service-modal-features"></ul>
        </div>
    `;
  document.body.appendChild(serviceBackdrop);

  const openServiceModal = (title) => {
    const data = serviceData[title];
    if (!data) return;

    serviceBackdrop.querySelector(".service-modal-icon").className =
      `service-modal-icon ${data.icon}`;
    serviceBackdrop.querySelector(".service-modal-title").textContent = title;
    serviceBackdrop.querySelector(".service-modal-text").textContent =
      data.text;
    serviceBackdrop.querySelector(".service-modal-features").innerHTML =
      data.features
        .map((f) => `<li><i class="fas fa-check-circle"></i> ${f}</li>`)
        .join("");

    serviceBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeServiceModal = () => {
    serviceBackdrop.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  // Click en "Ver más" — delegación global
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".overlay-btn");
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const item = btn.closest(".carousel-item");
      if (!item) return;
      const title = item.querySelector(".carousel-title");
      if (title) openServiceModal(title.textContent.trim());
      return;
    }

    if (e.target.classList.contains("service-modal-close")) {
      closeServiceModal();
      return;
    }

    if (e.target === serviceBackdrop) {
      closeServiceModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && serviceBackdrop.classList.contains("active")) {
      closeServiceModal();
    }
  });

  // 2. ANIMACIÓN DE APARICIÓN (Scroll Reveal)
  const appearanceOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearanceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        appearanceObserver.unobserve(entry.target);
      }
    });
  }, appearanceOptions);

  document.querySelectorAll(".card.glass, .project-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    appearanceObserver.observe(card);
  });

  // 3. FUNCIONALIDAD DEL MODAL DE PROYECTOS
  window.abrirProyecto = function (src) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = "";

    const cleanSrc = src.replace("../", "");
    const isYouTube =
      cleanSrc.includes("youtube.com") ||
      cleanSrc.includes("embed") ||
      cleanSrc.includes("youtu.be");
    const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(cleanSrc);

    if (isYouTube) {
      modalBody.innerHTML = `
                <iframe width="100%" height="450px" 
                    src="${cleanSrc}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen 
                    style="border-radius:20px;">
                </iframe>`;
    } else if (isImage) {
      modalBody.innerHTML = `<img src="${cleanSrc}" class="modal-img" style="width:100%; border-radius:20px;">`;
    } else {
      modalBody.innerHTML = `
                <video controls autoplay class="modal-video" style="width:100%; border-radius:20px;">
                    <source src="${cleanSrc}" type="video/mp4">
                </video>`;
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const cerrarModal = () => {
    if (modal) {
      modal.style.display = "none";
      modalBody.innerHTML = "";
      document.body.style.overflow = "auto";
    }
  };

  if (closeBtn) closeBtn.onclick = cerrarModal;
  window.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });

  // 4. INDICADOR DE PÁGINA ACTIVA
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.style.color = "#00f7ff";
      link.style.borderBottom = "2px solid #00f7ff";
    }
  });
});

// Detecta el toque en dispositivos móviles para alternar la descripción
document.querySelectorAll(".carousel-item, .glass").forEach((card) => {
  card.addEventListener("click", function (e) {
    // Si la pantalla es móvil, alternamos la clase active
    if (window.innerWidth <= 768) {
      // Quitamos la clase 'active' de las otras tarjetas para que solo una esté abierta
      document.querySelectorAll(".carousel-item, .glass").forEach((c) => {
        if (c !== card) c.classList.remove("active");
      });

      // Alternamos la tarjeta actual
      this.classList.toggle("active");
    }
  });
});
