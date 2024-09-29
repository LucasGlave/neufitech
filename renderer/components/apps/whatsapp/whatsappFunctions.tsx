import { WebviewTag } from "electron";

const SeleccionarChat = async () => {
  const result = await window.ipc.clickChat();
  console.log(result.message)
};

const Perfil = () => {
  const webview = document.getElementById('app') as WebviewTag;
  webview?.focus()
  if (webview) {
    webview.executeJavaScript(`
            try {
              const buttons = document.querySelectorAll("button");
              let closeButton;
          
              buttons.forEach(button => {
                const rect = button.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                  const svg = button.querySelector('svg');
                  if (svg && svg.innerHTML.includes("cerrar-icono-que-identifica-tu-boton")) {
                    closeButton = button;
                  }
                }
              });
          
              if (closeButton) {
                closeButton.click();
              } else {
                console.log("No se encontró el botón de cerrar comentarios visible.");
              }
            } catch (error) {
              console.error("Error al intentar hacer clic en el botón de cerrar comentarios en TikTok:", error);
            }
          `);
  } else {
    console.log("Webview no encontrado.");
  }
}


const NuevoChat = () => {
  const webview = document.getElementById('app') as WebviewTag;
  webview?.focus()
  if (webview) {
    webview.executeJavaScript(`
            try {
                const video = document.querySelector('video');
                if (video) {
                    if (!video.paused) {
                        video.pause();
                    } else {
                        video.play();
                    }
                } else {
                console.log("No se encontró ningún video en la página.");
                }
            } catch (error) {
                console.error("Error al intentar pausar el video en TikTok:", error);
            }
        `);
  } else {
    console.log("Webview no encontrado.");
  }
}

export default { SeleccionarChat, Perfil, NuevoChat }