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
                    <div key={i} className="flex flex-col justify-between gap-8 items-start w-full py-3">
                        <div className="flex justify-between w-full">
                            <div className="flex items-center gap-8">
                                <ButtonAnimation
                                    svg='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.72"></g><g id="SVGRepo_iconCarrier"> <path d="M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z" stroke="#FFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
                                    speakText={text}
                                    propClass="w-[150px] h-[120px] bg-keybackground"
                                />
                                <h3 className="font-bold text-white text-2xl">{text.toUpperCase()}</h3>
                            </div>
                            <ButtonAnimation
                                functionKeyboard={{ funct: `deleteText ${text}`, state: state }}
                                svg='<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427.44 511.9"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono eliminar</title><path class="cls-1" d="M218,1.6C200.8,6.2,185,19.2,177.3,35c-5.4,11-7.3,20.6-7.3,36.9V85l-56.9.2-56.9.3-4.4,3c-13.6,9.7-12.4,30.1,2.3,37.6,3.2,1.6,5.9,1.9,17.3,1.9H85l.2,147.2.3,147.3,2.7,9.7a107.19,107.19,0,0,0,29.6,50c15.9,15.2,32.5,24,53.7,28.3,7,1.4,17.6,1.5,88,1.2,79.7-.3,80-.3,88-2.6a134.07,134.07,0,0,0,32.2-14.8c8.4-5.5,22.3-19.2,28.3-27.9a116.15,116.15,0,0,0,15.8-34.2l2.7-9.7.3-147.3L427,128h13.6c15.3,0,18.9-1.1,24.2-7.6a21.91,21.91,0,0,0-4.6-31.9l-4.4-3-56.9-.3L342,85V71.9c0-16.2-1.9-25.8-7.2-36.8-7.6-15.9-24-29.2-41.3-33.6C285-.6,226.1-.6,218,1.6Zm65.1,42.5a22.68,22.68,0,0,1,12.8,11.2c1.8,3.7,2.1,6.2,2.1,17V85H214V72.3c0-10.8.3-13.3,2.1-17a23.24,23.24,0,0,1,12.1-11C232.7,42.7,277.8,42.6,283.1,44.1ZM383.8,271.2c-.3,132.5-.5,143.8-2.1,149.3a68.22,68.22,0,0,1-45.2,46.2c-5.6,1.7-11,1.8-80.5,1.8s-74.9-.1-80.5-1.8a68.22,68.22,0,0,1-45.2-46.2c-1.6-5.5-1.8-16.8-2.1-149.3L127.9,128H384.1Z" transform="translate(-42.3 0.06)"/><path class="cls-1" d="M203.5,193.6a22.24,22.24,0,0,0-9.6,9.6c-1.8,3.6-1.9,7.2-1.9,95.3,0,89.2.1,91.7,2,95.4,7.4,14.6,27.9,15.8,37.5,2.3l3-4.4.3-91.6.2-91.6-2.5-5.2c-3.8-7.8-8.8-10.8-18.4-11.2C208.6,192,205.7,192.4,203.5,193.6Z" transform="translate(-42.3 0.06)"/><path class="cls-1" d="M289.5,193.4c-4.5,1.9-9.1,7-10.9,11.8-1.5,3.9-1.6,13.6-1.4,95.5l.3,91.1,3,4.4c9.6,13.5,30.1,12.3,37.5-2.3,1.9-3.7,2-6.2,2-95.4,0-99.5.3-94.1-5.4-100.3C309.4,192.4,297.1,190.1,289.5,193.4Z" transform="translate(-42.3 0.06)"/></svg>'
                                speakText="Eliminar frase"
                                propClass="w-[150px] h-[120px] bg-keybackground"
                            />
                        </div>
                        {i !== activeTexts.length - 1 && <hr className="w-full h-[1px] bg-white" />}
                    </div>
                )) : <h3 className="font-bold text-white text-2xl text-center">AUN NO HAY FRASES GUARDADAS</h3>}
            </div>
        </div>
    )
}

export default ModalTexts