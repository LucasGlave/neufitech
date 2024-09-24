const whatsappRoutes = [
  {
    Perfil: {
      keyCombination: ["control", "alt", "comma"],
      buttons: {
        Volver: {
          keyPress: "escape",
        },
      },
    },
  },
  {
    "Seleccionar-chat": {
      tabLoop: 13,
      buttons: {
        "Chat-anterior": {
          keyPress: "Arrow up",
        },
        "Chat-siguiente": {
          keyPress: "Arrow down",
        },
        Aceptar: {
          keyPress: "enter",
        },
        Volver: {
          keyPress: "escape",
        },
      },
    },
  },
  {
    "Nuevo-chat": {
      keyCombination: ["control", "alt", "n"],
      buttons: {
        "Nuevo-grupo": {
          keyCombination: ["control", "alt", "shift", "n"],
          Agregar: { keyPress: "enter" },
        },
        "Seleccionar-persona": {
          keyPress: "enter",
        },
        Volver: {
          keyPress: "escape",
        },
      },
    },
  },
];

export default whatsappRoutes;
