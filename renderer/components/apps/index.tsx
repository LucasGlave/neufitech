import { CerrarComentarios, Comentar, Pausar } from "./tiktok/tiktokFunctions";

const AppManagement = (app: string, command: string) => {
    switch (app) {
        case "tiktok":
            switch (command) {
                case "comentar":
                    Comentar()
                    break;
                case "CerrarComentarios":
                    CerrarComentarios()
                    break;
                case "pausar":
                    Pausar()
                    break;
            }
        case "whatsapp":
            switch (command) {
                case "comentar":
                    Comentar()
                    break;
                case "pausar":
                    Pausar
                    break;
            }
    }
}

export default AppManagement