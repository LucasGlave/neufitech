//imports cocina
import cocina from "../../../public/cocina.jpg";
import desayunar from "../../../public/desayuno.jpg";
import almorzar from "../../../public/almuerzo.jpg";
import merendar from "../../../public/merienda.jpg";
import cenar from "../../../public/cena.jpg";
import ayudaComer from "../../../public/ayudaComer.jpg";
import comer from "../../../public/comer.jpg";
import beberAgua from "../../../public/beberAgua.jpg";
import jugo from "../../../public/jugo.jpg";

//imports baño
import bano from "../../../public/bano.jpg";
import lavarManos from "../../../public/lavarManos.jpg";
import cepillarDientes from "../../../public/cepillarDientes.jpg";
import ducharse from "../../../public/ducharse.jpg";
import necesitoBano from "../../../public/necesitoBano.jpg";

//imports habitacion
import habitacion from "../../../public/descansar.jpg";
import descansar from "../../../public/descansar.jpg";
import prenderLuz from "../../../public/prenderLuz.jpg";
import apagarLuz from "../../../public/apagarLuz.jpg";

//imports emociones
import emociones from "../../../public/emociones.jpg";
import feliz from "../../../public/feliz.jpg";
import enojado from "../../../public/enojado.jpg";
import triste from "../../../public/triste.jpg";
import asustado from "../../../public/asustado.jpg";
import soledad from "../../../public/soledad.jpg";
import abrazo from "../../../public/abrazo.jpg";
import teQuiero from "../../../public/teQuiero.jpg";
import graciasAyuda from "../../../public/graciasAyuda.jpg";

//imports entretenimiento
import entretenimiento from "../../../public/entretenimiento.jpg";
import escucharMusica from "../../../public/escucharMusica.jpg";
import mirarPelicula from "../../../public/mirarPelicula.jpg";
import mirarSerie from "../../../public/mirarSerie.jpg";
import leer from "../../../public/leer.jpg";

//imports comunicacion
import comunicacion from "../../../public/comunicacion.jpg";
import si from "../../../public/si.jpg";
import no from "../../../public/no.jpg";
import noLoSe from "../../../public/noLoSe.jpg";
import gracias from "../../../public/gracias.jpg";
import porFavor from "../../../public/porFavor.jpg";
import ayudaComunicacion from "../../../public/ayudaComunicacion.jpg";

export const mockCategories = [
  { COCINA: cocina },
  { BAÑO: bano },
  { HABITACION: habitacion },
  { EMOCIONES: emociones },
  { ENTRETENIMIENTO: entretenimiento },
  { COMUNICACION: comunicacion },
];
export const mockActivities = [
  {
    COCINA: [
      { "QUIERO COMER": comer },
      { "TENGO SED": beberAgua },
      { "QUIERO TOMAR AGUA": beberAgua },
      { "QUIERO TOMAR JUGO": jugo },
      { "QUIERO DESAYUNAR": desayunar },
      { "QUIERO ALMORZAR": almorzar },
      { "QUIERO MERENDAR": merendar },
      { "QUIERO CENAR": cenar },
      { "NECESITO AYUDA PARA COMER": ayudaComer },
    ],
    BAÑO: [
      { "QUIERO LAVAR MIS MANOS": lavarManos },
      { "QUIERO CEPILLAR MIS DIENTES": cepillarDientes },
      { "QUIERO BAÑARME": ducharse },
      { "NECESITO IR AL BAÑO": necesitoBano },
    ],
    HABITACION: [
      { "QUIERO DESCANSAR": descansar },
      { "ENCIENDE LA LUZ": prenderLuz },
      { "APAGA LA LUZ": apagarLuz },
    ],
    ENTRETENIMIENTO: [
      { "QUIERO ESCUCHAR MUSICA": escucharMusica },
      { "DESEO MIRAR UNA PELICULA": mirarPelicula },
      { "DESEO MIRAR UNA SERIE": mirarSerie },
      { "QUIERO LEER UN LIBRO": leer },
    ],
    EMOCIONES: [
      { "ESTOY TRISTE": triste },
      { "ESTOY FELIZ": feliz },
      { "ESTOY ENOJADO": enojado },
      { "ESTOY ASUSTADO": asustado },
      { "ME SIENTO SOLO": soledad },
      { "NECESITO UN ABRAZO": abrazo },
      { "TE QUIERO": teQuiero },
      { "GRACIAS POR TU AYUDA": graciasAyuda },
    ],
    COMUNICACION: [
      { SI: si },
      { NO: no },
      { "NO LO SE": noLoSe },
      { GRACIAS: gracias },
      { "POR FAVOR": porFavor },
      { "NECESITO AYUDA PARA COMUNICARME": ayudaComunicacion },
    ],
  },
];
