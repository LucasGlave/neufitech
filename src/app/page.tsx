'use client'
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import logoFacebook from '../../public/icon-facebook.svg'
import logoWhatsapp from '../../public/icon-whatsapp.svg'
import logoInstagram from '../../public/icon-instagram.svg'
import logoTikTok from '../../public/icon-tiktok.svg'
import logoGmail from '../../public/icon-gmail.svg'
import logoNetflix from '../../public/icon-netflix.svg'
import logoMax from '../../public/icon-max.svg' 
import logoDisney from '../../public/icon-disney-plus.svg'
import logoPrimeVideo from '../../public/icon-prime-video.svg'
// import logoMensseger from '../../public/icon-mensseger.svg'
// import logoX from '../../public/icon-x.svg'
// import logoSpotify from '../../public/icon-spotify.svg'
import logoSensacionCorp from '../../public/icon-sens-corporal.jpg'
import logoComunicacion from '../../public/icon-comunicacion.jpg'
import logoEscritura from '../../public/icon-escritura.jpg'
import logoEscrituraIA from '../../public/icon-escritura-ia.jpg'
import flechaDerecha from '../../public/flecha-derecha.png'
import { useRouter } from "next/navigation";

const Home = () => {
  const navigate = useRouter()

  const handleNavigate = (page: string) => {
    navigate.push(page)
  }
  return (
    <div className="flex justify-between w-full h-screen bg-slate-50">
      <div className="flex justify-start p-6 w-4/5">
        <div className="flex flex-col justify-around gap-4 w-full">
          <div className="flex flex-row justify-around px-12 items-center relative">
            <button onClick={()=> handleNavigate('sensacion-corporal')}>
              <Image src={logoSensacionCorp} alt="SensacionCorp" width={200} height={200} />
            </button>
            <button onClick={()=> handleNavigate('senal-comunicacion')}>
              <Image src={logoComunicacion} alt="Comunicacion" width={200} height={200} />
            </button>
            <button onClick={()=> handleNavigate('sensacion-corporal')}>
              <Image src={logoEscritura} alt="Escritura" width={200} height={200} />
            </button>
            <button onClick={()=> handleNavigate('sensacion-corporal')}>
              <Image src={logoEscrituraIA} alt="EscrituraIA" width={200} height={200} />
            </button>

            <button className="absolute right-0 top-[35%]">
              <Image src={flechaDerecha} alt="flechaDerecha" width={100} height={100} />
            </button>
            {/* <button>
              <Image src={flechaDerecha} alt="flechaIzquierda" width={200} height={200} />
            </button> */}
          </div>
          <div className="flex justify-around relative px-20 w-full">
            <button>
              <Image src={logoWhatsapp} alt="WhatsApp" width={200} height={200} />
            </button>
            <button>
              <Image src={logoInstagram} alt="Instagram" width={200} height={200} />
            </button>
            <button>
              <Image src={logoFacebook} alt="Facebook" width={200} height={200} />
            </button>
            <button>
              <Image src={logoTikTok} alt="Tiktok" width={200} height={200} />
            </button>
            <button>
              <Image src={logoGmail} alt="Gmail" width={200} height={200} />
            </button>

            <button className="absolute right-0 top-[35%]">
              <Image src={flechaDerecha} alt="flechaDerecha" width={100} height={100} />
            </button>
            {/* <button>
              <Image src={logoMensseger} alt="Messenger" width={200} height={200} />
            </button>
            <button>
              <Image src={logoX} alt="X" width={200} height={200} />
            </button>
            <button>
              <Image src={logoSpotify} alt="Spotify" width={200} height={200} />
            </button>
            <button>
              <Image src={logoTikTok} alt="Tiktok" width={200} height={200} />
            </button>
            <button>
              <Image src={logoGmail} alt="Gmail" width={200} height={200} />
            </button> */}
            
          </div>
          <div className="flex justify-around relative px-12 w-full">
            <button>
              <Image src={logoNetflix} alt="Netflix" width={200} height={200} />
            </button>
            <button>
              <Image src={logoPrimeVideo} alt="Prime Video" width={200} height={200} />
            </button>
            <button>
              <Image src={logoMax} alt="Max" width={200} height={200} />
            </button>
            <button>
              <Image src={logoDisney} alt="Disney+" width={200} height={200} />
            </button>

            <button className="absolute right-0 top-[35%]">
              <Image src={flechaDerecha} alt="flechaDerecha" width={100} height={100} />
            </button>
          </div>
        </div>
      </div>
      <Sidebar/>
    </div>
  );
};

export default Home;
