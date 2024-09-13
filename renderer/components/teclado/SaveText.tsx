import React, { useState } from 'react';
import ButtonAnimation from '../ButtonAnimation';

type SaveTextProps = {
    state: (functionToEjec: string) => void
}

const SaveText = ({ state }: SaveTextProps) => {
    return (
        <div className="flex gap-2">
            <ButtonAnimation
                functionKeyboard={{ funct: "saveText", state: state }}
                speakText="GUARDAR FRASE"
                svg='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" class="bi bi-save"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#FFFF" stroke-width="0.096"> <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"></path> </g><g id="SVGRepo_iconCarrier"> <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"></path> </g></svg>'
                propClass="w-[150px] h-[120px] bg-keybackground"
            />
            <ButtonAnimation
                functionKeyboard={{ funct: "getTexts", state: state }}
                text="FRASES GUARDADAS"
                propClass="w-[150px] h-[120px] bg-keybackground"
            />
        </div>
    );
}

export default SaveText