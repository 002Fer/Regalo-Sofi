/**
 * ARCHIVO DE CONFIGURACIÓN
 * Puedes personalizar todos los datos de esta página fácilmente aquí.
 */

const CONFIG = {
    // Nombres de la pareja
    ella: "¡¡¡¡24!!!!",

    
    // Título especial de felicitación
    tituloCumple: "¡Feliz Cumpleaños, Mi amorcito!",
    subtituloCumple: "Hoy celebro el día en que nació la persona más maravillosa del mundo ❤️",

    // Fecha de inicio de noviazgo / aniversario
    // Formato: AÑO, MES (0 es Enero, 1 es Febrero, ..., 11 es Diciembre), DÍA, HORA (0-23), MINUTO (0-59)
    fechaAniversario: new Date(2022, 1, 10, 20, 0, 0), // Modifica esta fecha según tu aniversario

    // Frase romántica sobre el tiempo juntos
    fraseContador: "Cada segundo a tu lado es el regalo más hermoso de mi vida.",

    // Canción de fondo: "Es verdad" de Daniel, Me Estás Matando
    musica: {
        // Archivo descargado en tu carpeta 'audio/'
        archivoLocal: "audio/Es Verdad.mp3",
        // Enlace alternativo de respaldo
        url: "https://music.youtube.com/watch?v=fDUVn21Ajgg",
        titulo: "Es verdad - Daniel, Me Estás Matando",
        autoplay: true // Se activará en cuanto ella complete los 5 toques
    },

    // Galería de Recuerdos / Fotos (Tus fotos de la carpeta img/)
    fotos: [
        {
            url: "img/foto1.jpeg",
            titulo: "Nuestras primera fotos",
            fecha: "Recuerdo especial",
            descripcion: "Cada instante contigo se queda grabado en mi corazón."
        },
        {
            url: "img/foto2.jpeg",
            titulo: "Uno de nuestros aniversarios",
            fecha: "Momentos mágicos",
            descripcion: "La sonrisa que ilumina cada uno de mis días."
        },
        {
            url: "img/foto3.jpeg",
            titulo: "Complicidad y amor",
            fecha: "Inolvidable",
            descripcion: "Cumpliendo pequeños antojos que tenias."
        },
        {
            url: "img/foto4.jpeg",
            titulo: "Aventuras juntos",
            fecha: "Nuestro camino",
            descripcion: "Caminar de tu mano hace que la vida sea maravillosa."
        },
        {
            url: "img/foto5.jpeg",
            titulo: "La dueña de mi corazón",
            fecha: "Una mini tu XD",
            descripcion: "Gracias por ser exactamente como eres, mi persona favorita."
        },
        {
            url: "img/Foto6.jpeg",
            titulo: "Flores que nunca te haran falta",
            fecha: "Juntos por siempre",
            descripcion: "Verte feliz con tus flores me llena de felicidad tambien."
        },
        {
            url: "img/foto7.jpeg",
            titulo: "Mi mayor felicidad",
            fecha: "Recuerdos únicos",
            descripcion: "Tenerte en mi vida es el regalo más bonito del universo."
        },
        {
            url: "img/foto8.jpeg",
            titulo: "Por una vida entera juntos",
            fecha: "Nuestro futuro",
            descripcion: "Grandes momentos que paso a tu lado no haran falta."
        },
        {
            url: "img/Foto9.jpeg",
            titulo: "El mejor regalo de mi vida",
            fecha: "Otra mini tu",
            descripcion: "Gracias por existir y por llenar mis días de alegría y felicidad."
        }
    ],

    // Razones o frases de amor cortas (tarjetas interactivas)
    razones: [
        "Por la forma tan linda y pura en la que me miras.",
        "Porque tu risa es mi sonido favorito en todo el mundo.",
        "Por cómo me apoyas y crees en mí incluso cuando yo dudo.",
        "Por cada abrazo que me hace sentir en casa y en paz.",
        "Porque haces que los días comunes se conviertan en mágicos.",
        "Por tu ternura, tu bondad y la grandeza de tu corazón."
    ],

    // Carta de Amor (Párrafos)
    carta: {
        saludo: "Para la persona más hermosa de mi universo,",
        parrafos: [
            "Hoy es un día sumamente especial, no solo porque es tu cumpleaños, sino tambien porque puedo pasarlo a tu lado, eres la persona más especial en mi vida y espero seguir compartiendo muchos mas años a tu lado.",
            "Cada día que paso a tu lado me confirma lo afortunado que soy. Cada momento es unico y especial a pesar de que no todos los días sean para hacer mucho, con solo estar a tu lado lo disfruto porque eres mi mejor compañia.",
            "En este nuevo año de vida que comienzas, te deseo toda la felicidad del mundo, que cada uno de tus sueños y metas se cumplan, que Dios te bendiga, y prometo estar a tu lado para apoyarte en tus retos y amarte con todo mi corazón.",
            "¡Feliz cumpleaños, mi vida! Gracias por existir y por ser mi más bonito regalo.",
            "",
            "Contigo lo quiero todo, tu compañia, tus abrazos",
            "tus besos. Quiero estar a tu lado en las buenas en",
            "las malas. Quiero que me permitas amarte toda la vida.",

        ],
        despedida: "Con todo mi amor por siempre y para siempre,",
        firma: "Te amo infinitamente ❤️"
    }
};
