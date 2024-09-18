import flechaArriba from "../public/flechaArriba.png";
import flechaAbajo from "../public/flechaAbajo.png";
import eliminar from "../public/eliminar.svg";
import plus from "../public/plus.svg";
import { useEffect, useState } from "react";
import ButtonAnimation from "./ButtonAnimation";

type ScrollProps = {
    maxScrollValue: number
}

const Scroll = ({ maxScrollValue }: ScrollProps) => {
    const [scrollActual, setScrollActual] = useState(0);
    const [isOff, setIsOff] = useState(false);

    useEffect(() => {
        setScrollActual(window.scrollY);
    }, []);

    const scrollTop = () => {
        const nuevoScrollActual = Math.max(0, scrollActual - 200);
        window.scrollTo({
            top: nuevoScrollActual,
            behavior: 'smooth',
        });
        setScrollActual(nuevoScrollActual);
    };

    const scrollBottom = () => {
        const nuevoScrollActual = Math.min(maxScrollValue, scrollActual + 200);
        window.scrollTo({
            top: nuevoScrollActual,
            behavior: 'smooth',
        });
        setScrollActual(nuevoScrollActual);
    };

    const functionAction = (functionToEjec: string) => {
        if (functionToEjec === "scrollTop") {
            scrollTop();
        } else if (functionToEjec === "scrollBottom") {
            scrollBottom();
        } else if (functionToEjec === "changeIsOff") {
            setIsOff(!isOff);
        }
    };

    return (
        <div className="flex w-[15%] pt-[7rem] h-full items-start justify-start flex-col relative">
            <div className="fixed flex flex-col justify-center items-center gap-8">
                <ButtonAnimation
                    disabled={isOff}
                    propClass="w-3/5 flex justify-center items-center"
                    imagen={{
                        src: plus,
                        width: 200,
                        height: 200,
                        add: "invert w-[70%] p-4",
                    }}
                    comingSoon={true}
                />
                <ButtonAnimation
                    disabled={isOff}
                    propClass="w-3/5 flex justify-center items-center"
                    imagen={{ src: flechaArriba, add: "w-[70%]" }}
                    functionKeyboard={{ funct: "scrollTop", state: functionAction }}
                />
                <ButtonAnimation
                    disabled={isOff}
                    propClass="w-3/5 flex justify-center items-center"
                    imagen={{ src: flechaAbajo, add: "w-[70%]" }}
                    functionKeyboard={{ funct: "scrollBottom", state: functionAction }}
                />
                <ButtonAnimation
                    disabled={isOff}
                    propClass="w-3/5 flex justify-center items-center"
                    imagen={{
                        src: eliminar,
                        width: 200,
                        height: 200,
                        add: "invert w-[70%] p-4",
                    }}
                    comingSoon={true}
                />
            </div>
        </div>
    )
}

export default Scroll;
