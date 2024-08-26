import React from "react";
import Webview from "./Webview";
import ButtonAnimation from "./ButtonAnimation";

const Whatsapp = () => {
  return (
    <div className="h-[100vh] flex flex-row">
      <div>
        <ButtonAnimation
          propClass="w-[100px] h-[100px] bg-black"
          text="Sig Chat"
          keyboardConfig={{
            key: "Tab",
            ctrlKey: true,
            altKey: true,
            bubbles: true,
          }}
        />
      </div>
      <Webview url="https://web.whatsapp.com" />
    </div>
  );
};

export default Whatsapp;
