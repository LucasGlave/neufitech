import logoFacebook from "../public/icon-facebook.png";
import logoWhatsapp from "../public/icon-whatsapp.png";
import logoInstagram from "../public/icon-instagram.png";
import logoTikTok from "../public/icon-tiktok.png";
import logoNetflix from "../public/icon-netflix.png";
import logoMax from "../public/icon-max.png";
import logoYoutube from "../public/icon-youtube.png";
import logoPrimeVideo from "../public/icon-primevideo.png";
import logoSensacionCorp from "../public/icon-sens-corporal.png";
import logoComunicacion from "../public/icon-comunicacion.png";
import logoEscritura from "../public/icon-escritura.png";
import logoEscrituraIA from "../public/icon-escritura-ia.png";
import ButtonAnimation from "./ButtonAnimation";

const Home = () => {
  return (
    <div id="home" className="flex justify-between w-full h-screen bg-zinc-900">
      <div className="flex justify-start w-full px-20 py-10 relative">
        
        <div className="absolute left-4 top-4">
          <ButtonAnimation
            speakText="Salir"
            text="Salir"
            propClass="w-[100px] h-[60px] text-2xl"
            execute={() => window.ipc.send('close', null)}
          />
        </div>
        
        <div className="flex flex-col justify-around gap-4 w-full">
          <div className="flex h-[25%] justify-around relative gap-4 w-full">
            <ButtonAnimation
              speakText="Sensacion corporal"
              navigation="sensacion-corporal"
              imagen={{ src: logoSensacionCorp, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Señal comunicacion"
              navigation="senal-comunicacion"
              imagen={{ src: logoComunicacion, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Escritura"
              navigation="teclado"
              imagen={{ src: logoEscritura, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Escritura con IA"
              navigation="teclado-ia"
              comingSoon={true}
              imagen={{ src: logoEscrituraIA, add: "h-full w-full" }}
            />
            {/* <ButtonAnimation
              speakText="Comunicacion con Pictogramas"
              navigation="comunicacion-pictogramas"
              imagen={{ src: logoEscrituraIA, add: "h-full w-full" }}
            /> */}
          </div>
          <div className="flex h-[25%] justify-around relative gap-4 w-full">
            <ButtonAnimation
              speakText="Whatsapp"
              navigation="whatsapp"
              imagen={{ src: logoWhatsapp, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Instagram"
              comingSoon={true}
              imagen={{ src: logoInstagram, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Facebook"
              comingSoon={true}
              imagen={{ src: logoFacebook, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Tik tok"
              comingSoon={true}
              imagen={{ src: logoTikTok, add: "h-full w-full" }}
            />
          </div>
          <div className="flex h-[25%] justify-around relative gap-4 w-full">
            <ButtonAnimation
              speakText="Youtube"
              comingSoon={true}
              imagen={{ src: logoYoutube, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Netflix"
              comingSoon={true}
              imagen={{ src: logoNetflix, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Praim video"
              comingSoon={true}
              imagen={{ src: logoPrimeVideo, add: "h-full w-full" }}
            />
            <ButtonAnimation
              speakText="Max"
              comingSoon={true}
              imagen={{ src: logoMax, add: "h-full w-full" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
