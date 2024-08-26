"use client"
import logoFacebook from '../../public/icon-facebook.png'
import logoWhatsapp from '../../public/icon-whatsapp.png'
import logoInstagram from '../../public/icon-instagram.png'
import logoTikTok from '../../public/icon-tiktok.png'
import logoNetflix from '../../public/icon-netflix.png'
import logoMax from '../../public/icon-max.png'
import logoYoutube from "../../public/icon-youtube.png"
import logoPrimeVideo from '../../public/icon-primevideo.png'
import logoSensacionCorp from '../../public/icon-sens-corporal.png'
import logoComunicacion from '../../public/icon-comunicacion.png'
import logoEscritura from '../../public/icon-escritura.png'
import logoEscrituraIA from '../../public/icon-escritura-ia.png'
import ButtonAnimation from "./ButtonAnimation";
import Swal from "sweetalert2"
import { useEffect } from 'react'

const HomePage = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const valorBooleano = JSON.parse(sessionStorage.getItem('miBooleano') || 'false');

            if (!valorBooleano) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Recuerde clickear para activar el sonido",
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        sessionStorage.setItem('miBooleano', JSON.stringify(true));
                    }
                });
            }
        }
    }, []);
    return (
        <div className="flex justify-between w-full h-screen bg-zinc-900">
            <div className="flex justify-start p-6 w-full">
                <div className="flex flex-col justify-around gap-4 w-full">
                    <div className="flex flex-row justify-around px-20 items-center relative">
                        <ButtonAnimation speakText="Sensacion corporal" navigation="sensacion-corporal" propClass="w-[250px] h-[250px]" imagen={{ src: logoSensacionCorp, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Señal comunicacion" navigation="senal-comunicacion" propClass="w-[250px] h-[250px]" imagen={{ src: logoComunicacion, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Escritura" navigation="teclado" propClass="w-[250px] h-[250px]" imagen={{ src: logoEscritura, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Escritura con IA" navigation="teclado-ia" propClass="w-[250px] h-[250px]" imagen={{ src: logoEscrituraIA, width: 250, height: 250, add: 'h-full' }} />
                    </div>
                    <div className="flex justify-around relative px-20 w-full">
                        <ButtonAnimation speakText="Whatsapp" propClass="w-[250px] h-[250px]" imagen={{ src: logoWhatsapp, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Instagram" propClass="w-[250px] h-[250px]" imagen={{ src: logoInstagram, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Facebook" propClass="w-[250px] h-[250px]" imagen={{ src: logoFacebook, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Tik tok" propClass="w-[250px] h-[250px]" imagen={{ src: logoTikTok, width: 250, height: 250, add: 'h-full' }} />
                    </div>
                    <div className="flex justify-around relative px-20 w-full">
                        <ButtonAnimation speakText="Youtube" propClass="w-[250px] h-[250px]" imagen={{ src: logoYoutube, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Netflix" propClass="w-[250px] h-[250px]" imagen={{ src: logoNetflix, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Praim video" propClass="w-[250px] h-[250px]" imagen={{ src: logoPrimeVideo, width: 250, height: 250, add: 'h-full' }} />
                        <ButtonAnimation speakText="Max" propClass="w-[250px] h-[250px]" imagen={{ src: logoMax, width: 250, height: 250, add: 'h-full' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
