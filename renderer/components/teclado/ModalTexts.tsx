import ButtonAnimation from "../ButtonAnimation"

type ModalTextsProps = {
    activeTexts: string[]
    state: (functionToEjec: string) => void,
}

const ModalTexts = ({ activeTexts, state }: ModalTextsProps) => {
    return (
        <div className="absolute items-center justify-start gap-5 flex flex-col h-screen w-screen p-16 backdrop-blur-sm z-50 bg-[#000000af]">
            <div className="w-full">
                <ButtonAnimation
                    functionKeyboard={{ funct: "closeModal", state: state }}
                    speakText="Cerrar"
                    propClass="w-[150px] h-[80px] bg-keybackground"
                    text="CERRAR"
                />
            </div>
            <div className="bg-[#576280] w-full rounded-lg p-8 border">
                {activeTexts.length > 0 ? activeTexts.map((text, i) => (
                    <div key={i} className="flex flex-col gap-8 items-start w-full py-3">
                        <div className="flex items-center gap-8">
                            <ButtonAnimation
                                svg='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.72"></g><g id="SVGRepo_iconCarrier"> <path d="M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z" stroke="#FFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
                                speakText={text}
                                propClass="w-[150px] h-[120px] bg-keybackground"
                            />
                            <h3 className="font-bold text-white text-2xl">{text.toUpperCase()}</h3>
                        </div>
                        {i !== activeTexts.length - 1 && <hr className="w-full h-[1px] bg-white" />}
                    </div>
                )) : <h3 className="font-bold text-white text-2xl text-center">AUN NO HAY FRASES GUARDADAS</h3>}
            </div>
        </div>
    )
}

export default ModalTexts