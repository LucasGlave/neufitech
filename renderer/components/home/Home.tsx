"use client"
import logoFacebook from "../../public/icon-facebook.png";
import logoWhatsapp from "../../public/icon-whatsapp.png";
import logoInstagram from "../../public/icon-instagram.png";
import logoTikTok from "../../public/icon-tiktok.png";
import logoNetflix from "../../public/icon-netflix.png";
import logoMax from "../../public/icon-max.png";
import logoYoutube from "../../public/icon-youtube.png";
import logoPrimeVideo from "../../public/icon-primevideo.png";
import logoSensacionCorp from "../../public/icon-sens-corporal.png";
import logoComunicacion from "../../public/icon-comunicacion.png";
import logoEscritura from "../../public/icon-escritura.png";
import logoEscrituraIA from "../../public/icon-escritura-ia.png";
import ButtonAnimation from "../ButtonAnimation";
import { useEffect, useState } from "react";
import ModalConfig from "./ModalConfig";
import ConfirmationModal from "../confirmation/confirmationModal";
import { arrayModel } from "../señal-comunicacion/mockArray";

const Home = () => {
  const [isOff, setIsOff] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalProps, setModalProps] = useState(null);
  const [tobiiOnline, setTobiiOnline] = useState(false)
  const defaultConfig = {
    volume: 3,
    activation: 3,
    voices: "mujer"
  };
  const [config, setConfig] = useState({ ...defaultConfig });

  useEffect(() => {
    if (localStorage.getItem('config')) {
      setConfig(JSON.parse(localStorage.getItem('config')))
    }
    let array = JSON.parse(localStorage.getItem("senal-comunicacion"))
    if (!array) {
      localStorage.setItem("senal-comunicacion", JSON.stringify(arrayModel));
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('config')) {
      localStorage.setItem('config', JSON.stringify(config));
    }
  }, [config]);

  const closeModal = () => {
    setShowModal(false)
  }

  const handleShowTexts = () => {
    const { volume, activation, voices } = JSON.parse(localStorage.getItem('config')) || [];
    setConfig({ volume, activation, voices });
    setShowModal(true)
  };

  const handleShowExit = () => {
    const showConfirmation = (question: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setModalProps({ question, resolve });
      });
    };
    showConfirmation("DESEA SALIR DE LA APLICACION?")
      .then((confirmed) => {
        if (confirmed) {
          window.ipc.send('close', null)
        } else {
          setModalProps(null);
        }
      });
  };

  const handleToggleTobii = () => {
    if ((globalThis as any).ipc) {
      (globalThis as any).ipc.setTobiiControl(!tobiiOnline);
    }
  }

  const calibrateTobiiEyetracker = () => {
    (globalThis as any).ipc.tobiiCalibrate((event:any, data:any) => {
        console.log(data);
    });
  }

  const changeState = (functionToEjec: string) => {
    functionToEjec === "changeIsOff" && setIsOff(!isOff)
    functionToEjec === "showModal" && handleShowTexts()
    functionToEjec === "toggleTobiiEyetracker" && handleToggleTobii()
    functionToEjec === "calibrateTobiiEyetracker" && calibrateTobiiEyetracker()
  }

  useEffect(() => {
    const fetchGlobalConfig = async () => {
      if ((globalThis as any).ipc) {
        const globalConfig = await (globalThis as any).ipc.tobiiInControl() || false;
        setTobiiOnline(globalConfig);
      }
    };

    fetchGlobalConfig();

    const handleTobiiControlUpdate = (event: any, updatedConfig: any) => {
      setTobiiOnline(updatedConfig);
    };

    if ((globalThis as any).ipc) {
      (globalThis as any).ipc.onTobiiControlUpdate(handleTobiiControlUpdate);
    }

    return () => {
      if ((globalThis as any).ipc) {
        (globalThis as any).ipc.offTobiiControlUpdate(handleTobiiControlUpdate);
      }
    };
  }, [])

  return (
    <div id="home" className="flex justify-between w-full h-screen bg-zinc-900 relative">
      {showModal && <ModalConfig configuration={config} closeModal={closeModal} />}
      {modalProps !== null && (
        <ConfirmationModal
          question={modalProps.question}
          resolve={(result) => {
            modalProps.resolve(result);
          }}
        />
      )}
      <div className="flex justify-start w-full px-20 py-10 relative">
        <div className="absolute left-4 top-4 flex items-start gap-4">
          <ButtonAnimation
            disabled={isOff}
            state={handleShowExit}
            speakText="Salir"
            svg='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#ffff"></path> </g></svg>'
            propClass="w-[100px] h-[80px] text-xl"
          />
          <ButtonAnimation
            disabled={isOff}
            speakText="Minimizar"
            svg='<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>minimize_fill</title> <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="System" transform="translate(-192.000000, -240.000000)"> <g id="minimize_fill" transform="translate(192.000000, 240.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M2.5,12 C2.5,11.1716 3.17157,10.5 4,10.5 L20,10.5 C20.8284,10.5 21.5,11.1716 21.5,12 C21.5,12.8284 20.8284,13.5 20,13.5 L4,13.5 C3.17157,13.5 2.5,12.8284 2.5,12 Z" id="路径" fill="#ffffff"> </path> </g> </g> </g> </g></svg>'
            propClass="w-[100px] h-[80px] text-xl"
            execute={() => window.ipc.send('minimize', null)}
          />
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-4">
          <ButtonAnimation
            functionKeyboard={{ funct: 'calibrateTobiiEyetracker', state: changeState }}
            speakText="Calibrar Tobii"
            svg='<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 12.5V15M12.5 6.55671e-07V2.5M2.5 6.55671e-07L2.50001 6.5M2.5 8.5V15M7.5 10.5V0M12.5 4.5V15M10.5 4.5H14.5V2.5H10.5V4.5ZM5.5 12.5H9.5V10.5H5.5V12.5ZM0.5 8.5H4.5V6.5H0.5V8.5Z" stroke="#ffffff"></path> </g></svg>'
            propClass="w-[100px] h-[80px]"
          />
          <ButtonAnimation
            functionKeyboard={{ funct: 'toggleTobiiEyetracker', state: changeState }}
            speakText="Tobii"
            svg={tobiiOnline ?
              '<svg viewBox="0 0 63 25" fill="green" xmlns="http://www.w3.org/2000/svg"><path d="M58.0349 24.5954V9.29545H62.1349V24.5954H58.0349Z" fill="green"></path><path d="M50.8349 24.5954V9.29545H54.8349V24.5954H50.8349Z" fill="green"></path><path d="M23.1349 12.7955C20.9349 12.7955 19.1349 14.5954 19.1349 16.7954C19.1349 18.9954 20.9349 20.7954 23.1349 20.7954C25.3349 20.7954 27.1349 18.9954 27.1349 16.7954C27.1349 14.5954 25.3349 12.7955 23.1349 12.7955ZM23.1349 24.9955C18.6349 24.9955 15.0349 21.3954 15.0349 16.8954C15.0349 12.3954 18.6349 8.79545 23.1349 8.79545C27.6349 8.79545 31.2349 12.3954 31.2349 16.8954C31.2349 21.3954 27.6349 24.9955 23.1349 24.9955Z" fill="green"></path><path d="M40.9349 20.7954H39.5349C39.5349 20.7954 39.5349 20.7954 39.4349 20.7954C38.8349 20.6954 38.2349 20.6954 37.8349 20.2954C37.5349 19.8954 37.4349 19.3954 37.4349 18.4954C37.4349 18.4954 37.4349 17.6954 37.4349 16.5954V16.4954C37.4349 14.1954 38.9349 13.0955 41.1349 13.0955C43.3349 13.0955 44.8349 14.7954 44.8349 17.0954C44.7349 19.1954 43.1349 20.7954 40.9349 20.7954ZM40.9349 9.09545C40.7349 9.09545 40.5349 9.09545 40.3349 9.09545C39.2349 9.19545 38.2349 9.49545 37.3349 9.99545V4.69545H33.3349V19.7954C33.3349 24.3954 35.8349 24.9954 38.5349 24.9954C38.6349 24.9954 40.9349 24.9954 41.0349 24.9954C45.5349 24.9954 48.8349 21.5954 48.8349 17.0954C48.7349 12.4954 45.5349 9.09545 40.9349 9.09545Z" fill="green"></path><path d="M11.5349 24.6954C9.73492 24.6954 6.63492 24.8954 5.13492 23.5954C3.83492 22.4954 3.43492 21.1954 3.43492 19.5954V13.4954H0.234924V9.49545H3.43492V5.09545H7.53492V9.59545H13.1349V13.5954H7.53492V15.7955C7.53492 16.3955 7.53492 16.5954 7.53492 17.1954C7.53492 18.5954 7.23492 20.8954 9.33492 20.9954C9.63492 20.9954 13.2349 20.9954 13.2349 20.9954V24.6954H11.5349Z" fill="green"></path><path d="M62.6349 1.99545C62.2349 0.59545 60.7349 -0.30455 59.3349 0.0954496C58.3349 0.39545 57.8349 1.09545 57.3349 1.69545C56.9349 2.19545 56.6349 2.59545 56.1349 2.79545C55.5349 2.89545 55.1349 2.69545 54.5349 2.49545C53.8349 2.19545 53.0349 1.79545 52.0349 2.09545C50.6349 2.39545 49.7349 3.89545 50.0349 5.29545V5.49545C50.4349 6.89545 51.9349 7.79545 53.3349 7.39545C54.4349 7.09545 54.9349 6.39545 55.3349 5.79545C55.7349 5.29545 55.9349 4.89545 56.5349 4.69545C57.1349 4.59545 57.5349 4.79545 58.1349 4.99545C58.8349 5.29545 59.5349 5.69545 60.6349 5.39545C62.0349 5.09545 62.9349 3.59545 62.6349 2.19545C62.7349 2.09545 62.7349 2.09545 62.6349 1.99545Z" fill="green"></path></svg>' :
              '<svg viewBox="0 0 63 25" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M58.0349 24.5954V9.29545H62.1349V24.5954H58.0349Z" fill="white"></path><path d="M50.8349 24.5954V9.29545H54.8349V24.5954H50.8349Z" fill="white"></path><path d="M23.1349 12.7955C20.9349 12.7955 19.1349 14.5954 19.1349 16.7954C19.1349 18.9954 20.9349 20.7954 23.1349 20.7954C25.3349 20.7954 27.1349 18.9954 27.1349 16.7954C27.1349 14.5954 25.3349 12.7955 23.1349 12.7955ZM23.1349 24.9955C18.6349 24.9955 15.0349 21.3954 15.0349 16.8954C15.0349 12.3954 18.6349 8.79545 23.1349 8.79545C27.6349 8.79545 31.2349 12.3954 31.2349 16.8954C31.2349 21.3954 27.6349 24.9955 23.1349 24.9955Z" fill="white"></path><path d="M40.9349 20.7954H39.5349C39.5349 20.7954 39.5349 20.7954 39.4349 20.7954C38.8349 20.6954 38.2349 20.6954 37.8349 20.2954C37.5349 19.8954 37.4349 19.3954 37.4349 18.4954C37.4349 18.4954 37.4349 17.6954 37.4349 16.5954V16.4954C37.4349 14.1954 38.9349 13.0955 41.1349 13.0955C43.3349 13.0955 44.8349 14.7954 44.8349 17.0954C44.7349 19.1954 43.1349 20.7954 40.9349 20.7954ZM40.9349 9.09545C40.7349 9.09545 40.5349 9.09545 40.3349 9.09545C39.2349 9.19545 38.2349 9.49545 37.3349 9.99545V4.69545H33.3349V19.7954C33.3349 24.3954 35.8349 24.9954 38.5349 24.9954C38.6349 24.9954 40.9349 24.9954 41.0349 24.9954C45.5349 24.9954 48.8349 21.5954 48.8349 17.0954C48.7349 12.4954 45.5349 9.09545 40.9349 9.09545Z" fill="white"></path><path d="M11.5349 24.6954C9.73492 24.6954 6.63492 24.8954 5.13492 23.5954C3.83492 22.4954 3.43492 21.1954 3.43492 19.5954V13.4954H0.234924V9.49545H3.43492V5.09545H7.53492V9.59545H13.1349V13.5954H7.53492V15.7955C7.53492 16.3955 7.53492 16.5954 7.53492 17.1954C7.53492 18.5954 7.23492 20.8954 9.33492 20.9954C9.63492 20.9954 13.2349 20.9954 13.2349 20.9954V24.6954H11.5349Z" fill="white"></path><path d="M62.6349 1.99545C62.2349 0.59545 60.7349 -0.30455 59.3349 0.0954496C58.3349 0.39545 57.8349 1.09545 57.3349 1.69545C56.9349 2.19545 56.6349 2.59545 56.1349 2.79545C55.5349 2.89545 55.1349 2.69545 54.5349 2.49545C53.8349 2.19545 53.0349 1.79545 52.0349 2.09545C50.6349 2.39545 49.7349 3.89545 50.0349 5.29545V5.49545C50.4349 6.89545 51.9349 7.79545 53.3349 7.39545C54.4349 7.09545 54.9349 6.39545 55.3349 5.79545C55.7349 5.29545 55.9349 4.89545 56.5349 4.69545C57.1349 4.59545 57.5349 4.79545 58.1349 4.99545C58.8349 5.29545 59.5349 5.69545 60.6349 5.39545C62.0349 5.09545 62.9349 3.59545 62.6349 2.19545C62.7349 2.09545 62.7349 2.09545 62.6349 1.99545Z" fill="white"></path></svg>'}
            propClass="w-[100px] h-[80px]"
            buttonBorder={`${tobiiOnline && "border-green-400 border-4"}`}
          />
          <ButtonAnimation
            functionKeyboard={{ funct: 'changeIsOff', state: changeState }}
            speakText="Suspender"
            svg={!isOff ? '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 341.65"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono activar eye tracker</title><path class="cls-1" d="M234.5,85.6c-40.7,4.7-70.8,13.2-104,29.5-33.9,16.6-59.8,35-85.5,60.8C23.9,197,11.4,214.6,4,233.5.6,242.2.5,242.9.5,256S.6,269.8,4,278.5c7.5,19.1,20,36.7,41.4,58,59.9,59.6,140.5,92.8,219,90.2,25.8-.9,43.8-3.8,69.3-11.1,75.6-21.8,153-82.7,174.3-137.1,3.4-8.7,3.5-9.4,3.5-22.5s-.1-13.8-3.5-22.5c-4.2-10.6-10.9-22.1-19.9-34.3-7.8-10.5-32.3-35.2-44.1-44.6-58-45.8-123.9-70-189.5-69.4C245.2,85.2,236.2,85.5,234.5,85.6ZM281,130.1c45,5,95.4,26.9,135,58.5,11.7,9.3,30.3,28.2,37.9,38.4,8.7,11.7,14.4,23.2,14.4,29,0,9.9-13.1,29.8-32.3,49.1-21.1,21.1-44.6,37.7-73.5,52-36.1,17.8-69.6,26-106.6,26-38.3,0-72.7-8.7-111.1-28.2A329.64,329.64,0,0,1,96,323.4c-11.3-9-30.1-28-37.3-37.7C49.9,274,43.6,261.6,43.6,256c.1-9.9,13.2-29.8,32.4-49.1,13.7-13.7,23.9-22,41.8-34C168.7,139.1,226.3,123.9,281,130.1Z" transform="translate(-0.5 -85.19)"/><path class="cls-1" d="M243.5,171c-34.6,5.4-61.4,29.6-70.6,63.5-1.8,6.4-2.2,10.8-2.2,21.5s.4,15.1,2.2,21.5c8.3,30.7,30.9,53.4,61.6,61.6,6.3,1.7,10.8,2.2,21.5,2.2s15.2-.5,21.5-2.2c30.7-8.2,53.4-31,61.6-61.6,3.1-11.4,3.1-31.7,0-43-8.3-30.8-31.4-53.8-61.6-61.5C268.2,170.6,252.1,169.7,243.5,171ZM271,216.9c16.8,6.5,28,23.8,26.8,41.4-1.3,18.1-12.8,32.6-30.1,37.9-16.9,5.1-35.7-1.6-46-16.2-16.1-23.1-5.2-55.2,21.8-64C251.3,213.4,263.1,213.8,271,216.9Z" transform="translate(-0.5 -85.19)"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#FFFF"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#FFFF"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#FFFF"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#FFFF"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#FFFF"></path> </g></svg>'}
            propClass="w-[100px] h-[80px]"
          />
          <ButtonAnimation
            disabled={isOff}
            functionKeyboard={{ funct: 'showModal', state: changeState }}
            speakText="Configuracion"
            svg='<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480.25 480.13"><defs><style>.cls-1{fill:#fff;}</style></defs><title>ícono configuración</title><path class="cls-1" d="M224.8,17.9c-13.4,4.3-25.2,15.6-30.5,29.1-1.3,3.5-1.8,9-2.2,25l-.6,20.5-2.7.9c-2.6.9-3.5.3-15.7-11.7-10.7-10.5-14.2-13.3-20.3-16.2a49.07,49.07,0,0,0-42.8.1c-6.6,3.1-9.4,5.5-24.2,20.2S68.7,103.4,65.6,110a49.41,49.41,0,0,0-.1,42.8c2.9,6.1,5.6,9.6,16.2,20.3,12,12.2,12.6,13.1,11.7,15.7l-.9,2.7-20.5.6c-16,.4-21.5.9-25,2.2-13.8,5.4-25.4,17.8-29.4,31.6-2.3,7.9-2.3,52.3,0,60.2,4,13.8,15.6,26.2,29.4,31.6,3.5,1.3,9,1.8,25,2.2l20.5.6.9,2.7c.9,2.6.3,3.5-11.7,15.7-10.5,10.7-13.3,14.2-16.2,20.3a49.07,49.07,0,0,0,.1,42.8c3.1,6.6,5.5,9.4,20.2,24.2s17.6,17.1,24.2,20.2a49.41,49.41,0,0,0,42.8.1c6.1-2.9,9.6-5.6,20.3-16.2,12.2-12,13.1-12.6,15.7-11.7l2.7.9L192,440c.5,18.3.8,21.1,2.8,25.9,5.8,13.9,17.4,24.5,31.1,28.5,4.3,1.3,10.6,1.6,30.3,1.6,22.5,0,25.5-.2,31.1-2.1a49.85,49.85,0,0,0,30.4-29c1.3-3.4,1.8-9,2.2-24.9l.6-20.5,2.7-.9c2.6-.9,3.5-.3,15.7,11.7,10.7,10.6,14.2,13.3,20.3,16.2a49.41,49.41,0,0,0,42.8-.1c6.6-3.1,9.4-5.5,24.2-20.2s17.1-17.6,20.2-24.2a49.41,49.41,0,0,0,.1-42.8c-2.9-6.1-5.6-9.6-16.2-20.3-12-12.2-12.6-13.1-11.7-15.7l.9-2.7,20.5-.6c16-.4,21.5-.9,25-2.2,13.8-5.4,25.4-17.8,29.4-31.6,2.3-7.9,2.3-52.3,0-60.2-4-13.8-15.6-26.2-29.4-31.6-3.5-1.3-9-1.8-25-2.2l-20.5-.6-.9-2.7c-.9-2.6-.3-3.5,11.7-15.7,10.5-10.7,13.3-14.2,16.2-20.3a49.07,49.07,0,0,0-.1-42.8c-3.1-6.6-5.5-9.4-20.2-24.2S408.6,68.7,402,65.6a49.41,49.41,0,0,0-42.8-.1c-6.1,2.9-9.6,5.6-20.3,16.2-12.2,12-13.1,12.6-15.7,11.7l-2.7-.9L319.9,72c-.4-16-.9-21.5-2.2-25-5.4-13.8-17.8-25.4-31.6-29.4C277.7,15.1,232.8,15.4,224.8,17.9Zm54.1,32.6A16.4,16.4,0,0,1,287,61.6c.5,2.1,1,13.7,1,25.7,0,28.3-.1,28.1,16.6,34.6,5.4,2.2,12.4,5.1,15.4,6.5,5.9,2.7,11.1,3.3,15.7,1.5,1.5-.5,10.5-8.6,19.8-17.9,24.5-24.2,25.3-24.3,45.7-4.2,7.1,7,13.8,14.1,14.9,15.9,2.5,4,2.7,10.9.6,14.9-.9,1.6-8.6,9.9-17.2,18.4s-16.3,16.9-17.1,18.7c-2.1,4.8-1.7,10.1,1.2,16.3,1.4,3,4.3,10,6.5,15.4,6.5,16.7,6.3,16.6,34.6,16.6,12,0,23.6.5,25.7,1a16.4,16.4,0,0,1,11.1,8.1c1.8,3.1,2,5.2,2,22.9s-.2,19.8-2,22.9a16.4,16.4,0,0,1-11.1,8.1c-2.1.5-13.7,1-25.7,1-28.3,0-28.1-.1-34.6,16.6-2.2,5.4-5.1,12.4-6.5,15.4-2.9,6.2-3.3,11.5-1.2,16.3.8,1.8,8.4,10.2,17.1,18.7s16.3,16.8,17.2,18.4c2.1,4,1.9,10.9-.6,14.9-1.1,1.8-7.8,8.9-14.8,15.9-20.5,20.1-21.3,20-45.8-4.2-9.3-9.3-18.3-17.4-19.8-17.9-4.6-1.8-9.8-1.2-15.7,1.5-3,1.4-10,4.3-15.4,6.5-17.1,6.7-16.9,6.2-17.6,38.6-.5,23.6-.6,25.3-2.6,28-4.7,6.3-6.9,6.8-28.4,6.8-17.7,0-19.8-.2-22.9-2a16.4,16.4,0,0,1-8.1-11.1c-.5-2.1-1-13.7-1-25.7,0-28.3.1-28.1-16.6-34.6-5.4-2.2-12.4-5.1-15.4-6.5-5.9-2.7-11.1-3.3-15.7-1.5-1.5.5-10.4,8.6-19.8,17.9-24.5,24.2-25.3,24.3-45.7,4.2-7.1-7-13.8-14.1-14.9-15.9-2.5-4-2.7-10.9-.6-14.9.9-1.6,8.6-9.9,17.2-18.4s16.3-16.9,17.1-18.7c2.1-4.8,1.7-10.1-1.2-16.3-1.4-3-4.3-10-6.5-15.4-6.5-16.7-6.3-16.6-34.6-16.6-12,0-23.6-.5-25.7-1a16.4,16.4,0,0,1-11.1-8.1c-1.8-3.1-2-5.2-2-22.9s.2-19.8,2-22.9A16.4,16.4,0,0,1,61.6,225c2.1-.5,13.7-1,25.7-1,28.3,0,28.1.1,34.6-16.6,2.2-5.4,5.1-12.4,6.5-15.4,2.9-6.2,3.3-11.5,1.2-16.3-.8-1.8-8.4-10.2-17.1-18.7s-16.3-16.8-17.2-18.4c-2.1-4-1.9-10.9.6-14.9,1.1-1.8,7.8-8.9,14.8-15.9,20.5-20.1,21.3-20,45.8,4.2,9.4,9.3,18.3,17.4,19.8,17.9,4.7,1.8,9.9,1.2,16.2-1.7,3.3-1.6,10.4-4.6,15.7-6.6,10-3.9,14.2-7.2,15.3-11.9.2-1.2.6-12.8.7-25.7.3-21.4.5-23.8,2.3-26.9A17.07,17.07,0,0,1,237.1,49c1.9-.5,11.3-.8,20.9-.7C273.5,48.5,275.9,48.7,278.9,50.5Z" transform="translate(-15.88 -15.87)"/><path class="cls-1" d="M236,178a81.44,81.44,0,0,0-58,58.4c-2.7,10.9-2.8,28.3,0,39.2A81.13,81.13,0,0,0,236.4,334c10.9,2.7,28.3,2.7,39.2,0A81.46,81.46,0,0,0,334,275.6c2.7-10.9,2.7-28.3,0-39.2A81.13,81.13,0,0,0,275.6,178C264.9,175.3,246.6,175.3,236,178Zm33,32.7c7.9,2.2,12.6,4.9,18.6,10.5,10.5,9.9,15.4,21,15.4,34.7A46.59,46.59,0,0,1,256,303c-13.8,0-24.9-4.9-34.8-15.4-8.3-8.8-12.2-18.8-12.2-31.6,0-13.2,3.9-22.9,12.9-32.3C234.7,210.2,251,205.7,269,210.7Z" transform="translate(-15.88 -15.87)"/></svg>'
            propClass="w-[100px] h-[80px]"
          />
        </div>
        <div className="flex flex-col justify-around gap-4 w-full mt-12">
          <div className="flex h-[25%] justify-around relative gap-4 w-full">
            <ButtonAnimation
              disabled={isOff}
              speakText="Sensacion corporal"
              navigation="sensacion-corporal"
              imagen={{ src: logoSensacionCorp, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
              speakText="Señal comunicacion"
              navigation="senal-comunicacion"
              imagen={{ src: logoComunicacion, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
              speakText="Escritura"
              navigation="teclado"
              imagen={{ src: logoEscritura, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
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
              disabled={isOff}
              speakText="Whatsapp"
              navigation="whatsapp"
              imagen={{ src: logoWhatsapp, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
              speakText="Tik tok"
              navigation="tiktok"
              imagen={{ src: logoTikTok, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
              speakText="Instagram"
              comingSoon={true}
              imagen={{ src: logoInstagram, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
              speakText="Facebook"
              comingSoon={true}
              imagen={{ src: logoFacebook, add: "h-full w-full" }}
            />
          </div>
          <div className="flex h-[25%] justify-around relative gap-4 w-full">
            <ButtonAnimation
              disabled={isOff}
              speakText="Youtube"
              comingSoon={true}
              imagen={{ src: logoYoutube, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
              speakText="Netflix"
              comingSoon={true}
              imagen={{ src: logoNetflix, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
              speakText="Praim video"
              comingSoon={true}
              imagen={{ src: logoPrimeVideo, add: "h-full w-full" }}
            />
            <ButtonAnimation
              disabled={isOff}
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
