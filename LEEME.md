# 💌 Tu Regalo Web Romántico & Elegante

¡Felicidades! Tienes lista una página web personalizada, romántica y con una experiencia interactiva de 5 toques.

---

## 📂 Estructura del Proyecto

- `index.html` → La página web principal (con la pantalla interactiva de apertura, contador en vivo, fotos y carta).
- `js/config.js` → **El archivo donde cambias todos los datos:** nombres, fecha de noviazgo, fotos, dedicatoria y carta.
- `js/main.js` → Lógica de los 5 toques, porcentaje, contador en tiempo real, música y lluvia de pétalos.
- `css/style.css` → Diseño visual, colores, tipografías y efectos de animación.

---

## ✏️ ¿Cómo personalizar tus datos en 1 minuto?

Abre el archivo `js/config.js` con cualquier editor de texto (o Bloc de notas) y modifica:

1. **Nombres**:
   ```javascript
   ella: "Valeria",
   el: "Alejandro",
   ```
2. **Fecha de inicio de noviazgo**:
   ```javascript
   // Formato: Año, Mes (0=Enero, 1=Feb, 2=Mar, etc.), Día, Hora, Minuto
   fechaAniversario: new Date(2023, 1, 14, 19, 30, 0),
   ```
3. **Fotos**:
   Puedes pegar enlaces de imágenes de internet o colocar tus fotos en la carpeta `img/` y llamarlas `"img/foto1.jpg"`, `"img/foto2.jpg"`, etc.
4. **Canción de fondo**:
   Puedes dejar la melodía que viene por defecto, cambiar el enlace por otro MP3 en línea o colocar tu canción favorita.
5. **Carta de amor & Razones**:
   Modifica los párrafos de la carta y las frases con tus propias palabras y recuerdos.

---

## 🌐 ¿Cómo subirla a internet GRATIS para compartir el enlace?

Si deseas enviarle el enlace a su WhatsApp o que lo abra en su celular:

### Opción 1: Netlify Drop (La más fácil y rápida - Sin registrar código)
1. Entra a [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa `regalo` a la ventana de tu navegador.
3. ¡Listo! Netlify te dará un enlace público al instante (ejemplo: `https://amor-cumpleanos.netlify.app`).

### Opción 2: GitHub Pages
1. Sube los archivos a un repositorio en GitHub.
2. Ve a **Settings > Pages** y activa la rama `main`.
3. Tu enlace quedará como `https://tu-usuario.github.io/regalo`.
