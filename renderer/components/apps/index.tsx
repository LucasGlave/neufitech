import tiktok from "./tiktok/tiktokFunctions";
import whatsapp from "./whatsapp/whatsappFunctions";

const AppManagement = async (app: string, command: string) => {
  switch (app) {
    case "tiktok":
      switch (command) {
        case "comentar":
          tiktok.Comentar();
          break;
        case "cerrarComentarios":
          tiktok.CerrarComentarios();
          break;
        case "pausar":
          tiktok.Pausar();
          break;
        default:
          console.log(`Comando desconocido en ${app}`);
      }
      break;
    case "whatsapp":
      switch (command) {
        case "interaccionRapida":
          setTimeout(() => {
            whatsapp.InteraccionRapida();
          }, 2500);
          break;
        case "scrollBottom":
          whatsapp.ScrollBottom();
          break;
        case "scrollBottomChat":
          console.log("entre");
          whatsapp.ScrollBottomChat();
          break;
        case "scrollTop":
          whatsapp.ScrollTop();
          break;
        case "scrollTopChat":
          console.log("entre");
          whatsapp.ScrollTopChat();
          break;
        default:
          console.log(`Comando desconocido en ${app}`);
      }
      break;
  }
};

export default AppManagement;
