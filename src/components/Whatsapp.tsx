import React from "react";
import Webview from "./Webview";
import ButtonAnimation from "./ButtonAnimation";

const Whatsapp = () => {
  return (
    <div className="h-[100vh] flex flex-row">
      <div className="h-[100vh] flex flex-col">
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Chat Siguiente"
          keyCombination={["control", "alt", "tab"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Chat Anterior"
          keyCombination={["control", "alt", "shift", "tab"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Buscar Chat"
          keyCombination={["control", "alt", "shift", "7"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Atrás"
          keyPress={"escape"}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Nuevo Chat"
          keyCombination={["control", "alt", "n"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Crear Grupo"
          keyCombination={["control", "alt", "shift", "n"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Búsqueda Amplia"
          keyCombination={["alt", "k"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Aceptar"
          keyPress={"enter"}
        />
      </div>

      <Webview url="https://web.whatsapp.com" />

      <div className="h-[100vh] flex flex-col">
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Ajustes"
          keyCombination={["control", "alt", "comma"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Perfil e Info"
          keyCombination={["control", "alt", "p"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Buscar en el Chat"
          keyCombination={["control", "alt", "shift", "f"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Emojis"
          keyCombination={["control", "alt", "e"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="GIFs"
          keyCombination={["control", "alt", "g"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Stickers"
          keyCombination={["control", "alt", "s"]}
        />
        <ButtonAnimation
          propClass="w-[110px] h-[110px] bg-black"
          text="Fijar Chat"
          keyCombination={["control", "alt", "shift", "p"]}
        />
      </div>
    </div>
  );
};

export default Whatsapp;
