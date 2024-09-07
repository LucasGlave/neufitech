const whatsappRoutes = [{
    "Perfil": {
        keyCombination: ["control", "alt", "comma"],
        buttons: {
            "Volver": {
                keyPress: "escape"
            }
        }
    }
},
{
    "Chat-anterior": {
        keyCombination: ["control", "alt", "shift", "tab"],
        buttons: {
            "Chat-anterior": {
                keyCombination: ["control", "alt", "shift", "tab"],
            },
            "Buscar-en-chat": {
                keyCombination: ["control", "alt", "shift", "f"]
            },
            "Fijar-chat": {
                keyCombination: ["control", "alt", "shift", "p"]
            },
            "Volver": {
                keyPress: ""
            }
        }
    }
},
{
    "Chat-siguiente": {
        keyCombination: ["control", "alt", "tab"],
        buttons: {
            "Buscar-en-chat": {
                keyCombination: ["control", "alt", "shift", "f"]
            },
            "Chat-siguiente": {
                keyCombination: ["control", "alt", "tab"],
            },
            "Fijar-chat": {
                keyCombination: ["control", "alt", "shift", "p"]
            },
            "Volver": {
                keyPress: ""
            }
        }
    }
},
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
                "Agregar": { keyPress: "enter" }
            },
            "Seleccionar-persona": {
                keyPress: "enter"
            },
            "Volver": {
                keyPress: "escape"
            }
        }
    }
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
]

export default whatsappRoutes;