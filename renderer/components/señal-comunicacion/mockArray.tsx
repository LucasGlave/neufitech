// //imports cocina
// import cocina from "../../public/cocina.jpg";
// import desayunar from "../../public/desayuno.jpg";
// import almorzar from "../../public/almuerzo.jpg";
// import merendar from "../../public/merienda.jpg";
// import cenar from "../../public/cena.jpg";
// import ayudaComer from "../../public/ayudaComer.jpg";
// import comer from "../../public/comer.jpg";
// import beberAgua from "../../public/beberAgua.jpg";
// import jugo from "../../public/jugo.jpg";

// //imports baño
// import bano from "../../public/bano.jpg";
// import lavarManos from "../../public/lavarManos.jpg";
// import cepillarDientes from "../../public/cepillarDientes.jpg";
// import ducharse from "../../public/ducharse.jpg";
// import necesitoBano from "../../public/necesitoBano.jpg";

// //imports habitacion
// import habitacion from "../../public/descansar.jpg";
// import descansar from "../../public/descansar.jpg";
// import prenderLuz from "../../public/prenderLuz.jpg";
// import apagarLuz from "../../public/apagarLuz.jpg";

// //imports emociones
// import emociones from "../../public/emociones.jpg";
// import feliz from "../../public/feliz.jpg";
// import enojado from "../../public/enojado.jpg";
// import triste from "../../public/triste.jpg";
// import asustado from "../../public/asustado.jpg";
// import soledad from "../../public/soledad.jpg";
// import abrazo from "../../public/abrazo.jpg";
// import teQuiero from "../../public/teQuiero.jpg";
// import graciasAyuda from "../../public/graciasAyuda.jpg";

// //imports entretenimiento
// import entretenimiento from "../../public/entretenimiento.jpg";
// import escucharMusica from "../../public/escucharMusica.jpg";
// import mirarPelicula from "../../public/mirarPelicula.jpg";
// import mirarSerie from "../../public/mirarSerie.jpg";
// import leer from "../../public/leer.jpg";

// //imports comunicacion
// import comunicacion from "../../public/comunicacion.jpg";
// import si from "../../public/si.jpg";
// import no from "../../public/no.jpg";
// import noLoSe from "../../public/noLoSe.jpg";
// import gracias from "../../public/gracias.jpg";
// import porFavor from "../../public/porFavor.jpg";
// import ayudaComunicacion from "../../public/ayudaComunicacion.jpg";

// export const mockCategories = [
//   { COCINA: cocina },
//   { BANO: bano },
//   { HABITACION: habitacion },
//   { EMOCIONES: emociones },
//   { ENTRETENIMIENTO: entretenimiento },
//   { COMUNICACION: comunicacion },
// ];
export const arrayModel = [
  {
    title: "COCINA",
    url: "cocina.jpg",
    entries: [
      { frase: "QUIERO COMER", url: "comer.jpg" },
      { frase: "TENGO SED", url: "beberAgua.jpg" },
      { frase: "QUIERO TOMAR AGUA", url: "beberAgua.jpg" },
      { frase: "QUIERO TOMAR JUGO", url: "jugo.jpg" },
      { frase: "QUIERO DESAYUNAR", url: "desayuno.jpg" },
      { frase: "QUIERO ALMORZAR", url: "almuerzo.jpg" },
      { frase: "QUIERO MERENDAR", url: "merienda.jpg" },
      { frase: "QUIERO CENAR", url: "cena.jpg" },
      { frase: "NECESITO AYUDA PARA COMER", url: "ayudaComer.jpg" },
    ],
  },
  {
    title: "BAÑO",
    url: "bano.jpg",
    entries: [
      { frase: "QUIERO LAVAR MIS MANOS", url: "lavarManos.jpg" },
      { frase: "QUIERO CEPILLAR MIS DIENTES", url: "cepillarDientes.jpg" },
      { frase: "QUIERO BAÑARME", url: "ducharse.jpg" },
      { frase: "NECESITO IR AL BAÑO", url: "necesitoBano.jpg" },
    ],
  },
  {
    title: "HABITACION",
    url: "descansar.jpg",
    entries: [
      { frase: "QUIERO DESCANSAR", url: "descansar.jpg" },
      { frase: "ENCIENDE LA LUZ", url: "prenderLuz.jpg" },
      { frase: "APAGA LA LUZ", url: "apagarLuz.jpg" },
    ],
  },
  {
    title: "ENTRETENIMIENTO",
    url: "entretenimiento.jpg",
    entries: [
      { frase: "QUIERO ESCUCHAR MUSICA", url: "escucharMusica.jpg" },
      { frase: "DESEO MIRAR UNA PELICULA", url: "mirarPelicula.jpg" },
      { frase: "DESEO MIRAR UNA SERIE", url: "mirarSerie.jpg" },
      { frase: "QUIERO LEER UN LIBRO", url: "leer.jpg" },
    ],
  },
  {
    title: "EMOCIONES",
    url: "emociones.jpg",
    entries: [
      { frase: "ESTOY TRISTE", url: "triste.jpg" },
      { frase: "ESTOY FELIZ", url: "feliz.jpg" },
      { frase: "ESTOY ENOJADO", url: "enojado.jpg" },
      { frase: "ESTOY ASUSTADO", url: "asustado.jpg" },
      { frase: "ME SIENTO SOLO", url: "soledad.jpg" },
      { frase: "NECESITO UN ABRAZO", url: "abrazo.jpg" },
      { frase: "TE QUIERO", url: "teQuiero.jpg" },
      { frase: "GRACIAS POR TU AYUDA", url: "graciasAyuda.jpg" },
    ],
  },
  {
    title: "COMUNICACION",
    url: "comunicacion.jpg",
    entries: [
      { frase: "SI", url: "si.jpg" },
      { frase: "NO", url: "no.jpg" },
      { frase: "NO LO SE", url: "noLoSe.jpg" },
      { frase: "GRACIAS", url: "gracias.jpg" },
      { frase: "POR FAVOR", url: "porFavor.jpg" },
      {
        frase: "NECESITO AYUDA PARA COMUNICARME",
        url: "ayudaComunicacion.jpg",
      },
    ],
  },
];

// export const mockActivities = {
//   CATEGORIAS: [
//     { COCINA: cocina },
//     { BAÑO: bano },
//     { HABITACION: habitacion },
//     { EMOCIONES: emociones },
//     { ENTRETENIMIENTO: entretenimiento },
//     { COMUNICACION: comunicacion },
//   ],
//   COCINA: [
//     { "QUIERO COMER": comer },
//     { "TENGO SED": beberAgua },
//     { "QUIERO TOMAR AGUA": beberAgua },
//     { "QUIERO TOMAR JUGO": jugo },
//     { "QUIERO DESAYUNAR": desayunar },
//     { "QUIERO ALMORZAR": almorzar },
//     { "QUIERO MERENDAR": merendar },
//     { "QUIERO CENAR": cenar },
//     { "NECESITO AYUDA PARA COMER": ayudaComer },
//   ],
//   BAÑO: [
//     { "QUIERO LAVAR MIS MANOS": lavarManos },
//     { "QUIERO CEPILLAR MIS DIENTES": cepillarDientes },
//     { "QUIERO BAÑARME": ducharse },
//     { "NECESITO IR AL BAÑO": necesitoBano },
//   ],
//   HABITACION: [
//     { "QUIERO DESCANSAR": descansar },
//     { "ENCIENDE LA LUZ": prenderLuz },
//     { "DESEO MIRAR UNA PELICULA": mirarPelicula },
//     { "APAGA LA LUZ": apagarLuz },
//   ],
//   ENTRETENIMIENTO: [
//     { "QUIERO ESCUCHAR MUSICA": escucharMusica },
//     { "DESEO MIRAR UNA PELICULA": mirarPelicula },
//     { "DESEO MIRAR UNA SERIE": mirarSerie },
//     { "QUIERO LEER UN LIBRO": leer },
//   ],
//   EMOCIONES: [
//     { "ESTOY TRISTE": triste },
//     { "ESTOY FELIZ": feliz },
//     { "ESTOY ENOJADO": enojado },
//     { "ESTOY ASUSTADO": asustado },
//     { "ME SIENTO SOLO": soledad },
//     { "NECESITO UN ABRAZO": abrazo },
//     { "TE QUIERO": teQuiero },
//     { "GRACIAS POR TU AYUDA": graciasAyuda },
//   ],
//   COMUNICACION: [
//     { SI: si },
//     { NO: no },
//     { "NO LO SE": noLoSe },
//     { GRACIAS: gracias },
//     { "POR FAVOR": porFavor },
//     { "NECESITO AYUDA PARA COMUNICARME": ayudaComunicacion },
//   ],
// };
