import { WebviewTag } from "electron";

const InteraccionRapida = async () => {
  await window.ipc.clickChat();
};

const ScrollBottom = async () => {
  const webview = document.getElementById('app') as WebviewTag;
  if (!webview) {
    console.error("No se encontró el webview");
    return;
  } else {
    webview?.focus()
  }
  const script = `
      try {
        const paneSide = document.querySelector("#pane-side");
        if (paneSide) {
          const scrollActual = paneSide.scrollTop;
          const nuevoScrollActual = scrollActual + 200;
          paneSide.scrollTo({
            top: nuevoScrollActual,
            behavior: "smooth",
          });
        } else {
          console.error("No se encontró el pane side");
        }
      } catch(error) {
        console.log("Error al realizar scroll bottom", error);
      }
    `;
  await webview?.executeJavaScript(script);
}

const ScrollTop = async () => {
  const webview = document.getElementById('app') as WebviewTag;
  if (!webview) {
    console.error("No se encontró el webview");
    return;
  } else {
    webview?.focus()
  }
  const script = `
      try {
        const paneSide = document.querySelector("#pane-side");
        if (paneSide) {
          const scrollActual = paneSide.scrollTop;
          console.log(scrollActual);
          const nuevoScrollActual = scrollActual - 200;
          if (nuevoScrollActual < 0) {
            nuevoScrollActual = 0;
          }
          paneSide.scrollTo({
            top: nuevoScrollActual,
            behavior: "smooth",
          });
          console.log("Scroll ejecutado en el pane side hacia abajo. Nuevo scroll:", nuevoScrollActual);
        } else {
          console.error("No se encontró el pane side");
        }
      } catch(error) {
        console.log("Error al realizar scroll top", error);
      }
    `;
  await webview?.executeJavaScript(script);
}

export default { InteraccionRapida, ScrollBottom, ScrollTop }