const whatsappRoutes = [{
    "Perfil": {
        keyCombination: ["control", "alt", "comma"],
        buttons: {
            "Volver": {
                keyPress:"escape"
            }
        }
    }
},
{
    "Chat-anterior": {
        keyCombination: ["control", "alt", "shift", "tab"]
    }
},
{
    "Chat-siguiente": {
        keyCombination: ["control", "alt", "tab"]
    }
},
{
    "Buscar-chat": {
        keyCombination: ["control", "alt", "shift", "7"]
    }
},
{
    "Nuevo-chat": {
        keyCombination: ["control", "alt", "n"],
        buttons: {
            "Anterior": {
                keyCombination: ["control", "alt", "shift", "tab"]
            },
            "Siguiente": {
                keyCombination: ["control", "alt", "tab"]
            },
            "Nuevo-grupo": {
                keyCombination: ["control", "alt", "shift", "n"],
                "Agregar": { keyPress: "enter" }
            },
            "Seleccionar": {
                keyPress: "enter"
            },
            "Volver": {
                keyPress:"escape"
            }
        }
    }
},
{
    "Seleccionar": {
        keyPress: "enter",
        buttons: {
            "Buscar-en-chat": {
                keyCombination: ["control", "alt", "shift", "f"]
            },
            "Fijar-chat": {
                keyCombination: ["control", "alt", "shift", "p"]
            },
            "Volver": {
                keyPress:"escape"
            }
        }
    }
}
]

export default whatsappRoutes;