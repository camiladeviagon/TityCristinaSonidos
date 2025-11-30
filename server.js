import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./src/routes/index.routes.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Render asigna el puerto en process.env.PORT
const PORT = process.env.PORT || 3000;

// Configuración de Handlebars
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));


// Middleware para parsear formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// 🔹 Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // cambia esto si usas otro proveedor
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔹 Ruta para procesar el formulario de contacto
app.post("/contacto", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  const mailOptions = {
    from: `"Página Tity" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO, // correo de Tity
    subject: `Nuevo mensaje de ${nombre} desde la web`,
    text: `
Nombre: ${nombre}
Correo: ${correo}

Mensaje:
${mensaje}
    `,
    replyTo: correo,
  };

  try {
    await transporter.sendMail(mailOptions);
    // Puedes redirigir a una página de gracias o enviar JSON
    res.redirect("/?enviado=1");
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.redirect("/?error=1");
  }
});

// Rutas principales del sitio
app.use("/", indexRoutes);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
