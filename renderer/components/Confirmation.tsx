import React, { useState, useEffect } from "react";
import ButtonAnimation from "./ButtonAnimation";

interface ConfirmationProps {
    question: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ question, onConfirm, onCancel }) => {
    return (
        <div className={`absolute items-center transition-all duration-100 justify-center gap-5 flex flex-col h-screen w-screen px-16 py-8 backdrop-blur-sm z-50 bg-[#000000af]`}>
            <div className="bg-[#576280] items-center transition-all duration-100 justify-center flex flex-col gap-10 w-[50%] h-[50%] rounded-lg p-8 border text-white font-bold text-2xl">
                <h3>{question}</h3>
                <div className="flex gap-8">
                    <ButtonAnimation
                        speakText="Sí"
                        propClass="w-[150px] h-[80px] bg-keybackground"
                        text="SÍ"
                        state={onConfirm}
                    />
                    <ButtonAnimation
                        state={onCancel}
                        speakText="No"
                        propClass="w-[150px] h-[80px] bg-keybackground"
                        text="NO"
                    />
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
