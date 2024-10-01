import tiktok from "./tiktok/tiktokFunctions";
import whatsapp from "./whatsapp/whatsappFunctions";

const AppManagement = (app: string, command: string) => {
    switch (app) {
        case "tiktok":
            switch (command) {
                case "comentar":
                    tiktok.Comentar()
                    break;
                case "cerrarComentarios":
                    tiktok.CerrarComentarios()
                    break;
                case "pausar":
                    tiktok.Pausar()
                    break;
            }
        case "whatsapp":
            switch (command) {
                case "seleccionarChat":
                    setTimeout(() => {
                        whatsapp.SeleccionarChat()
                    }, 3000)
                    break;
                case "close":
                    window.ipc.closeWhatsapp()
                    break;
            }
    }
}

export default AppManagement