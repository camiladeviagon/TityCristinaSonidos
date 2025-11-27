import { Router } from "express";

const router = Router();

// GET página principal
router.get("/", (req, res) => {
  const data = {
    titulo: "Tity Cristina Sonidos – Sonidista disidente",
    descripcion:
      "Soy Tity, sonidista disidente. Me dedico a la producción de sonido en vivo y a las mezclas de sala y monitores, acompañando desde la técnica a artistas, bandas y causas con sentido. Trabajo desde una mirada crítica y feminista del sonido, cuidando que cada presentación tenga coherencia política, emocional y estética. Me interesa que la técnica sea un espacio seguro y habitable para mujeres, disidencias y cuerpxs que históricamente han sido desplazadxs del escenario.",
    trabajosDestacados: [
      {
        titulo: "Diavol Strain – Gira Seattle y Portland (E.E.U.U.)",
        rol: "Sonidista de sala y monitores",
        anio: "2025",
        descripcion:
          "Operación de mezcla en vivo en fechas en Seattle y Portland, consolidando un sonido oscuro, nítido y contundente para la banda.",
      },
      {
        titulo: "Producción Técnica Femfest Mujeres y Disidencias – 20 años",
        rol: "Producción técnica y coordinación de sonido",
        anio: "2024",
        descripcion:
          "Acompañamiento técnico integral en uno de los festivales feministas más emblemáticos, articulando equipos, escenarios y memoria sonora.",
      },
      {
        titulo: "Diavol Strain – Apertura a Placebo",
        rol: "Sonidista en vivo",
        anio: "2024",
        descripcion:
          "Mezcla en vivo para Diavol Strain en show de apertura a Placebo, asegurando presencia y carácter en un escenario masivo.",
      },
    ],
  };

  res.render("home", data);
});

// POST formulario de contacto
router.post("/contacto", (req, res) => {
  const { nombre, email, mensaje } = req.body;
  console.log("Nuevo mensaje de contacto para Tity Cristina Sonidos:", {
    nombre,
    email,
    mensaje,
  });

  res.render("home", {
    enviado: true,
    titulo: "Tity Cristina Sonidos – Sonidista disidente",
    descripcion:
      "Soy Tity, sonidista disidente. Me dedico a la producción de sonido en vivo y a las mezclas de sala y monitores, acompañando desde la técnica a artistas, bandas y causas con sentido.",
  });
});

export default router;
