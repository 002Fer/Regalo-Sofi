/**
 * LÓGICA PRINCIPAL DE LA EXPERIENCIA ROMÁNTICA & CUMPLEAÑOS
 */

// Variables globales del reproductor de música
let ytPlayer = null;
let ytReady = false;
let html5Audio = null;
let isUsingYouTube = false;
let isMusicPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar datos dinámicos desde CONFIG
    cargarDatosConfiguracion();

    // 2. Iniciar sistema de confeti festivo de cumpleaños en Canvas
    iniciarParticulasConfeti();

    // 3. Iniciar contador de tiempo en tiempo real
    iniciarContadorAmor();

    // 4. Iniciar observador de scroll para animaciones suaves
    iniciarAnimacionesScroll();

    // 5. Configurar interacción de la pantalla de bienvenida y reproductor de música
    configurarBienvenidaYMusica();

    // 6. Configurar el visor de fotos (Lightbox)
    configurarLightbox();
});

/**
 * Inserta todos los textos, fotos, razones y carta desde config.js
 */
function cargarDatosConfiguracion() {
    // Nombre y encabezado
    const elHeroNames = document.getElementById('hero-names');
    if (elHeroNames) {
        if (CONFIG.ella && CONFIG.el) {
            elHeroNames.innerHTML = `${CONFIG.ella} <span>&</span> ${CONFIG.el}`;
        } else {
            elHeroNames.textContent = CONFIG.ella || "Sofi";
        }
    }

    const elBirthdayTitle = document.getElementById('birthday-title');
    if (elBirthdayTitle) elBirthdayTitle.textContent = CONFIG.tituloCumple;

    const elBirthdaySubtitle = document.getElementById('birthday-subtitle');
    if (elBirthdaySubtitle) elBirthdaySubtitle.textContent = CONFIG.subtituloCumple;

    const elCounterQuote = document.getElementById('counter-quote');
    if (elCounterQuote) elCounterQuote.textContent = `"${CONFIG.fraseContador}"`;

    // Fecha formateada para la insignia de aniversario
    const elAnniversaryDate = document.getElementById('anniversary-date');
    if (elAnniversaryDate && CONFIG.fechaAniversario) {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaTexto = CONFIG.fechaAniversario.toLocaleDateString('es-ES', opciones);
        elAnniversaryDate.textContent = `Juntos desde el ${fechaTexto}`;
    }

    // Galería de fotos (Polaroid)
    const elPolaroidGrid = document.getElementById('polaroid-grid');
    if (elPolaroidGrid && CONFIG.fotos) {
        elPolaroidGrid.innerHTML = '';
        CONFIG.fotos.forEach((foto, index) => {
            const card = document.createElement('div');
            card.className = 'polaroid-card';
            card.setAttribute('data-index', index);
            card.innerHTML = `
                <div class="polaroid-tape"></div>
                <div class="polaroid-img-wrapper">
                    <img src="${foto.url}" alt="${foto.titulo}" class="polaroid-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800'">
                </div>
                <div class="polaroid-content">
                    <div class="polaroid-date">${foto.fecha || 'Momento especial'}</div>
                    <h3 class="polaroid-title">${foto.titulo}</h3>
                    <p class="polaroid-caption">${foto.descripcion || ''}</p>
                </div>
            `;
            elPolaroidGrid.appendChild(card);
        });
    }

    // Razones por las que te amo
    const elReasonsGrid = document.getElementById('reasons-grid');
    if (elReasonsGrid && CONFIG.razones) {
        elReasonsGrid.innerHTML = '';
        const iconos = ['🎉', '✨', '🎂', '💖', '🥂', '🌸', '🌹', '💫'];
        CONFIG.razones.forEach((razon, idx) => {
            const icon = iconos[idx % iconos.length];
            const div = document.createElement('div');
            div.className = 'reason-card';
            div.innerHTML = `
                <div class="reason-icon">${icon}</div>
                <div class="reason-text">${razon}</div>
            `;
            elReasonsGrid.appendChild(div);
        });
    }

    // Carta de amor
    const elLetterSaludo = document.getElementById('letter-saludo');
    if (elLetterSaludo) elLetterSaludo.textContent = CONFIG.carta.saludo;

    const elLetterBody = document.getElementById('letter-body');
    if (elLetterBody && CONFIG.carta.parrafos) {
        elLetterBody.innerHTML = '';
        CONFIG.carta.parrafos.forEach(parrafo => {
            const p = document.createElement('p');
            p.textContent = parrafo;
            elLetterBody.appendChild(p);
        });
    }

    const elLetterDespedida = document.getElementById('letter-despedida');
    if (elLetterDespedida) elLetterDespedida.textContent = CONFIG.carta.despedida;

    const elLetterFirma = document.getElementById('letter-firma');
    if (elLetterFirma) elLetterFirma.textContent = CONFIG.carta.firma;
}

/**
 * Calcula con precisión años, meses, días, horas, minutos y segundos transcurridos
 */
function calcularTiempoTranscurrido(fechaInicio, fechaFin) {
    let anyos = fechaFin.getFullYear() - fechaInicio.getFullYear();
    let meses = fechaFin.getMonth() - fechaInicio.getMonth();
    let dias = fechaFin.getDate() - fechaInicio.getDate();
    let horas = fechaFin.getHours() - fechaInicio.getHours();
    let minutos = fechaFin.getMinutes() - fechaInicio.getMinutes();
    let segundos = fechaFin.getSeconds() - fechaInicio.getSeconds();

    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        dias--;
    }
    if (dias < 0) {
        const ultimoDiaMesAnterior = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        anyos--;
    }

    return { anyos, meses, dias, horas, minutos, segundos };
}

/**
 * Actualiza el contador de amor en vivo cada segundo
 */
function iniciarContadorAmor() {
    const elYears = document.getElementById('count-years');
    const elMonths = document.getElementById('count-months');
    const elDays = document.getElementById('count-days');
    const elHours = document.getElementById('count-hours');
    const elMinutes = document.getElementById('count-minutes');
    const elSeconds = document.getElementById('count-seconds');

    function actualizar() {
        const ahora = new Date();
        const inicio = CONFIG.fechaAniversario;

        if (ahora < inicio) {
            if (elYears) elYears.textContent = '0';
            if (elMonths) elMonths.textContent = '0';
            if (elDays) elDays.textContent = '0';
            if (elHours) elHours.textContent = '0';
            if (elMinutes) elMinutes.textContent = '0';
            if (elSeconds) elSeconds.textContent = '0';
            return;
        }

        const tiempo = calcularTiempoTranscurrido(inicio, ahora);

        if (elYears) elYears.textContent = tiempo.anyos;
        if (elMonths) elMonths.textContent = tiempo.meses;
        if (elDays) elDays.textContent = tiempo.dias;
        if (elHours) elHours.textContent = String(tiempo.horas).padStart(2, '0');
        if (elMinutes) elMinutes.textContent = String(tiempo.minutos).padStart(2, '0');
        if (elSeconds) elSeconds.textContent = String(tiempo.segundos).padStart(2, '0');
    }

    actualizar();
    setInterval(actualizar, 1000);
}

/**
 * Extrae el ID de un video o canción de YouTube / YouTube Music a partir de su URL
 */
function extraerYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|(?:www\.|music\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
}

/**
 * Inicializa el sistema de audio (Prioridad a archivo local MP3 + Respaldo en YouTube)
 */
function inicializarSistemaAudio() {
    const rutaLocal = CONFIG.musica.archivoLocal;
    
    // Si existe archivo local MP3, darle prioridad absoluta
    if (rutaLocal) {
        html5Audio = new Audio(rutaLocal);
        html5Audio.loop = true;
        html5Audio.volume = 0.8;
        html5Audio.addEventListener('playing', () => actualizarIconoMusica(true));
        html5Audio.addEventListener('pause', () => actualizarIconoMusica(false));
    }

    const ytVideoId = extraerYouTubeId(CONFIG.musica.url);

    if (ytVideoId && !rutaLocal) {
        isUsingYouTube = true;
        // Cargar YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = function() {
            ytPlayer = new YT.Player('youtube-audio-player', {
                height: '1',
                width: '1',
                videoId: ytVideoId,
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                    'loop': 1,
                    'playlist': ytVideoId,
                    'origin': window.location.origin
                },
                events: {
                    'onReady': () => {
                        ytReady = true;
                    },
                    'onStateChange': (event) => {
                        if (event.data === YT.PlayerState.PLAYING) {
                            actualizarIconoMusica(true);
                        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                            actualizarIconoMusica(false);
                        }
                    }
                }
            });
        };
    }
}

function actualizarIconoMusica(reproduciendo) {
    isMusicPlaying = reproduciendo;
    const musicIcon = document.getElementById('music-icon');
    const musicText = document.getElementById('music-text');
    if (musicIcon) {
        if (reproduciendo) {
            musicIcon.classList.add('rotating');
        } else {
            musicIcon.classList.remove('rotating');
        }
    }
    if (musicText) {
        musicText.textContent = reproduciendo ? 'Es Verdad ♪' : 'Música: Pausada';
    }
}

function reproducirMusica() {
    if (html5Audio) {
        html5Audio.play().then(() => {
            actualizarIconoMusica(true);
        }).catch(err => {
            console.log("Audio HTML5 esperando interacción:", err);
            // Si falla el local, intentar YouTube si está disponible
            if (isUsingYouTube && ytPlayer && ytReady && typeof ytPlayer.playVideo === 'function') {
                ytPlayer.playVideo();
                actualizarIconoMusica(true);
            }
        });
    } else if (isUsingYouTube && ytPlayer && ytReady && typeof ytPlayer.playVideo === 'function') {
        ytPlayer.playVideo();
        actualizarIconoMusica(true);
    }
}

function pausarMusica() {
    if (isUsingYouTube && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        ytPlayer.pauseVideo();
        actualizarIconoMusica(false);
    } else if (html5Audio) {
        html5Audio.pause();
        actualizarIconoMusica(false);
    }
}

function toggleMusica() {
    if (isMusicPlaying) {
        pausarMusica();
    } else {
        reproducirMusica();
    }
}

/**
 * Configura la apertura del sobre de bienvenida con 5 toques progresivos y música
 */
function configurarBienvenidaYMusica() {
    inicializarSistemaAudio();

    const welcomeScreen = document.getElementById('welcome-screen');
    const btnOpen = document.getElementById('btn-open-gift');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const envelope = document.getElementById('welcome-envelope');
    const progressFill = document.getElementById('progress-bar-fill');
    const progressPercent = document.getElementById('progress-percent');
    const progressMsg = document.getElementById('progress-msg');
    const dots = document.querySelectorAll('.click-dots .dot');
    const musicBtn = document.getElementById('music-toggle-btn');

    let clickCount = 0;
    const TOTAL_CLICKS = 5;
    let isUnlocked = false;

    // Mensajes festivos e iconos para cada toque
    const feedbackPorPaso = [
        { msg: "¡Eso! Presiona otra vez con más alegría 🥳", btn: "¡Presiona otra vez!", icon: "🎉" },
        { msg: "¡Un poquito más, mi vida! ✨", btn: "¡Un poco más!", icon: "🎂" },
        { msg: "¡Ya casi descubres tu sorpresa! 🎁", btn: "¡Ya casi!", icon: "✨" },
        { msg: "¡Solo falta el toque final! 🎈", btn: "¡Último toque!", icon: "💖" },
        { msg: "¡Feliz Cumpleaños, Mi Amor! 🎉🥳", btn: "¡Sorpresa!", icon: "🎆" }
    ];

    function registrarToque(e) {
        if (isUnlocked) return;

        clickCount++;
        const indexPaso = Math.min(clickCount - 1, feedbackPorPaso.length - 1);
        const porcentaje = Math.min(Math.round((clickCount / TOTAL_CLICKS) * 100), 100);

        if (btnOpen) {
            btnOpen.classList.add('clicked');
            setTimeout(() => btnOpen.classList.remove('clicked'), 150);
        }

        if (envelope) {
            envelope.classList.remove('shake');
            void envelope.offsetWidth;
            envelope.classList.add('shake');
        }

        // Mini ráfaga de confeti festivo en el punto del toque
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
        dispararMiniConfeti(clientX, clientY, clickCount);

        // Actualizar barra de progreso y porcentaje
        if (progressFill) progressFill.style.width = `${porcentaje}%`;
        if (progressPercent) progressPercent.textContent = `${porcentaje}%`;

        // Actualizar dots indicadores
        dots.forEach((dot, idx) => {
            if (idx < clickCount) {
                dot.classList.add('active');
            }
        });

        // Actualizar textos dinámicos
        const pasoActual = feedbackPorPaso[indexPaso];
        if (progressMsg) {
            progressMsg.textContent = pasoActual.msg;
            progressMsg.style.animation = 'none';
            void progressMsg.offsetWidth;
            progressMsg.style.animation = 'fadeInMsg 0.4s ease-out';
        }
        if (btnText) btnText.textContent = pasoActual.btn;
        if (btnIcon) btnIcon.textContent = pasoActual.icon;

        // Si se alcanzaron los 5 toques -> Desbloquear y abrir con confeti total
        if (clickCount >= TOTAL_CLICKS) {
            isUnlocked = true;
            abrirRegaloFinal();
        }
    }

    function abrirRegaloFinal() {
        if (envelope) envelope.classList.add('open');
        
        // Gran explosión de confeti de cumpleaños
        dispararConfetiExplosion();

        // Iniciar la canción "Es verdad"
        reproducirMusica();

        // Ocultar pantalla de bienvenida suavemente
        setTimeout(() => {
            if (welcomeScreen) {
                welcomeScreen.classList.add('hidden');
            }
        }, 900);
    }

    if (btnOpen) btnOpen.addEventListener('click', registrarToque);
    if (envelope) envelope.addEventListener('click', registrarToque);

    // Botón de control de música en la esquina superior
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusica);
    }
}

/**
 * Mini ráfaga de confeti multicolor que brota en cada toque
 */
function dispararMiniConfeti(x, y, nivel) {
    const cantidad = 8 + nivel * 3;
    const colores = ['#f368e0', '#ff9f43', '#ee5253', '#0abde3', '#10ac84', '#feca57', '#ff6b6b', '#54a0ff'];
    const emojis = ['🎉', '✨', '🎈', '⭐', '🎂', '🎊'];

    for (let i = 0; i < cantidad; i++) {
        const span = document.createElement('span');
        
        if (Math.random() < 0.35) {
            span.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.fontSize = `${Math.random() * 14 + 14}px`;
        } else {
            // Cuadrito / Círculo de confeti
            span.style.width = `${Math.random() * 8 + 6}px`;
            span.style.height = `${Math.random() * 10 + 6}px`;
            span.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            span.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        }

        span.style.position = 'fixed';
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.zIndex = '100001';
        span.style.pointerEvents = 'none';
        span.style.transition = 'all 0.85s cubic-bezier(0.1, 0.8, 0.3, 1)';
        span.style.transform = 'translate(-50%, -50%) scale(1)';
        document.body.appendChild(span);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 110 + 40;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance - 30;

        requestAnimationFrame(() => {
            span.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) rotate(${Math.random() * 720}deg) scale(0.2)`;
            span.style.opacity = '0';
        });

        setTimeout(() => span.remove(), 900);
    }
}

/**
 * Gran cañón de confeti festivo al desbloquear el 100%
 */
function dispararConfetiExplosion() {
    const colores = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#ff6b81', '#70a1ff', '#eccc68', '#a55eea'];
    const totalPiezas = 90;

    for (let i = 0; i < totalPiezas; i++) {
        const piece = document.createElement('div');
        const color = colores[Math.floor(Math.random() * colores.length)];
        const isRound = Math.random() > 0.6;
        const width = Math.random() * 12 + 6;
        const height = isRound ? width : Math.random() * 16 + 8;

        piece.style.position = 'fixed';
        piece.style.left = `${50 + (Math.random() - 0.5) * 20}%`;
        piece.style.top = '60%';
        piece.style.width = `${width}px`;
        piece.style.height = `${height}px`;
        piece.style.backgroundColor = color;
        piece.style.borderRadius = isRound ? '50%' : '3px';
        piece.style.zIndex = '100000';
        piece.style.pointerEvents = 'none';
        piece.style.transform = 'translate(-50%, -50%)';
        piece.style.transition = `all ${Math.random() * 0.8 + 1.2}s cubic-bezier(0.15, 0.85, 0.35, 1)`;
        document.body.appendChild(piece);

        const destX = (Math.random() - 0.5) * window.innerWidth * 0.95;
        const destY = - (Math.random() * window.innerHeight * 0.75 + 100);

        requestAnimationFrame(() => {
            piece.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${Math.random() * 1080}deg) scale(${Math.random() * 0.6 + 0.4})`;
            piece.style.opacity = '0';
        });

        setTimeout(() => piece.remove(), 2100);
    }
}

/**
 * Modal Lightbox para ver las fotos en grande
 */
function configurarLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const btnClose = document.getElementById('lightbox-close');

    const grid = document.getElementById('polaroid-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.polaroid-card');
            if (!card) return;
            const idx = parseInt(card.getAttribute('data-index'), 10);
            const foto = CONFIG.fotos[idx];
            if (foto && modal && modalImg) {
                modalImg.src = foto.url;
                if (modalTitle) modalTitle.textContent = foto.titulo;
                if (modalDesc) modalDesc.textContent = foto.descripcion || foto.fecha || '';
                modal.classList.add('active');
            }
        });
    }

    if (btnClose && modal) {
        btnClose.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

/**
 * Animaciones suaves con Intersection Observer al scrollear
 */
function iniciarAnimacionesScroll() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(sec => observer.observe(sec));
}

/**
 * Sistema de confeti festivo en Canvas para cumpleaños
 * Piezas rectangulares, circulares y estrellas con balanceo 3D
 */
function iniciarParticulasConfeti() {
    const canvas = document.getElementById('canvas-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const coloresConfeti = [
        '#f368e0', // Rosa fiesta
        '#ff9f43', // Naranja pastel
        '#ee5253', // Rojo celebración
        '#0abde3', // Celeste brillante
        '#10ac84', // Menta
        '#feca57', // Dorado / Amarillo brillante
        '#ff6b81', // Rosa fuerte
        '#54a0ff', // Azul cielo
        '#5f27cd'  // Violeta
    ];

    const numConfetis = 55;
    const confetis = [];

    class Confeti {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : -30;
            this.w = Math.random() * 10 + 6;
            this.h = Math.random() * 12 + 6;
            this.speedY = Math.random() * 1.6 + 0.9;
            this.speedX = Math.random() * 1.2 - 0.6;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05;
            this.tilt = Math.random() * Math.PI;
            this.tiltSpeed = Math.random() * 0.07 + 0.03;
            this.color = coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)];
            this.opacity = Math.random() * 0.4 + 0.6;
            this.isCircle = Math.random() < 0.25;
            this.isSparkle = Math.random() < 0.2;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.tilt) * 1.2 + this.speedX;
            this.rotation += this.rotationSpeed;
            this.tilt += this.tiltSpeed;

            if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
                this.reset(false);
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(Math.cos(this.tilt), 1); // Simula el giro 3D de la pieza de papel

            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            if (this.isSparkle) {
                // Pequeña estrella de brillo
                const r = this.w * 0.5;
                ctx.beginPath();
                ctx.moveTo(0, -r);
                ctx.lineTo(r * 0.3, -r * 0.3);
                ctx.lineTo(r, 0);
                ctx.lineTo(r * 0.3, r * 0.3);
                ctx.lineTo(0, r);
                ctx.lineTo(-r * 0.3, r * 0.3);
                ctx.lineTo(-r, 0);
                ctx.lineTo(-r * 0.3, -r * 0.3);
                ctx.closePath();
                ctx.fill();
            } else if (this.isCircle) {
                // Confeti circular
                ctx.beginPath();
                ctx.arc(0, 0, this.w * 0.4, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Confeti rectangular tradicional
                ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < numConfetis; i++) {
        confetis.push(new Confeti());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        confetis.forEach(c => {
            c.update();
            c.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}
