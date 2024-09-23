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
  // {
  //   "Chat-anterior": {
  //     keyCombination: ["control", "alt", "shift", "["],
  //     buttons: {
  //       "Chat-anterior": {
  //         keyCombination: ["control", "alt", "shift", "["],
  //       },
  //       "Buscar-en-chat": {
  //         keyCombination: ["control", "alt", "shift", "f"],
  //       },
  //       "Fijar-chat": {
  //         keyCombination: ["control", "alt", "shift", "p"],
  //       },
  //       Volver: {
  //         keyPress: "escape",
  //       },
  //     },
  //   },
  // },
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
  // {
  //   "Chat-siguiente": {
  //     keyCombination: ["control", "alt", "shift", "]"],
  //     buttons: {
  //       "Buscar-en-chat": {
  //         keyCombination: ["control", "alt", "shift", "f"],
  //       },
  //       "Chat-siguiente": {
  //         keyCombination: ["control", "alt", "shift", "]"],
  //       },
  //       "Fijar-chat": {
  //         keyCombination: ["control", "alt", "shift", "p"],
  //       },
  //       Volver: {
  //         keyPress: "escape",
  //       },
  //     },
  //   },
  // },
  // {
  //     "Buscar-chat": {
  //         keyCombination: ["control", "alt", "/"]
  //     }
  // },
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
  // {
  //     "Seleccionar": {
  //         keyPress: "enter",
  //         buttons: {
  //             "Buscar-en-chat": {
  //                 keyCombination: ["control", "alt", "shift", "f"]
  //             },
  //             "Fijar-chat": {
  //                 keyCombination: ["control", "alt", "shift", "p"]
  //             },
  //             "Volver": {
  //                 keyPress: "escape"
  //             }
  //         }
  //     }
  // }
];

export default whatsappRoutes;
