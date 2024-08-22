"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ButtonAnimation from './ButtonAnimation';
import trash from "../../public/eliminar.svg"

const Teclado = () => {
    const KeyboardLayout = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
        [',', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.']
    ];

    const SymbolsLayoutPage1 = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', '$', '&', '_', '-', '(', ')', '=', '%'],
        ["'", '"', '*', ':', ';', '/', '!', '?', '+']
    ];

    const SymbolsLayoutPage2 = [
        ['£', '€', '¥', '¢', '©', '®', '±', '÷', '¿'],
        ['[', ']', '{', '}', '<', '>', '~', '^', '¡'],
        ['`', '|', '\\', '×', '¬', '§', '¶', '•'],
    ];

    const tildeMap = {
        a: 'á',
        e: 'é',
        i: 'í',
        o: 'ó',
        u: 'ú',
        n: 'ñ'
    };

    const [output, setOutput] = useState<string>('');
    const [isUpperCase, setIsUpperCase] = useState<boolean>(false);
    const [showSymbols, setShowSymbols] = useState<boolean>(false);
    const [symbolPage, setSymbolPage] = useState<number>(1);
    const [isTildeActive, setIsTildeActive] = useState<boolean>(false);
    const [isAllow, setIsAllow] = useState(false)
    const [ejecFunction, setEjecFunction] = useState("")
    const containerRef = useRef<HTMLDivElement | null>(null);

    const currentSymbolsLayout = symbolPage === 1 ? SymbolsLayoutPage1 : SymbolsLayoutPage2;

    const changeState = (functionToEjec: string) => {
        setIsAllow(true)
        setEjecFunction(functionToEjec)
    }

    const deleteLastWord = () => {
        const lastSpaceIndex = output.lastIndexOf(" ");
        if (lastSpaceIndex === -1) {
            setOutput("");
        }
        setOutput(output.substring(0, lastSpaceIndex))
    }

    const getUpdatedKeyboardLayout = () => {
        let layout = KeyboardLayout;

        if (isTildeActive) {
            layout = layout.map(row =>
                row.map(key =>
                    key in tildeMap ? tildeMap[key as keyof typeof tildeMap] : key
                )
            );
        }

        if (isUpperCase) {
            layout = layout.map(row =>
                row.map(key => key.toUpperCase())
            );
        }

        return layout;
    }

    const functionAction = (key?: string) => {
        ejecFunction === "deleteAll" && setOutput("")
        ejecFunction === "deleteOne" && setOutput(prev => prev.slice(0, -1))
        ejecFunction === "deleteLastWord" && deleteLastWord()
        ejecFunction === "changeTilde" && setIsTildeActive(!isTildeActive);
        ejecFunction === "changeMayus" && setIsUpperCase(!isUpperCase);
        ejecFunction === "changeSymbol" && setShowSymbols(!showSymbols)
        ejecFunction === "spaceKey" && setOutput(prev => prev + ' ');
        ejecFunction === "enterKey" && setOutput(prev => prev + '\n');
        ejecFunction.includes("pressKey") && (
            key = ejecFunction.split(" ")[1],
            setOutput(prev => prev + key)
        )
    }

    useEffect(() => {
        functionAction()
        setIsAllow(false)
        setEjecFunction("")
    }, [isAllow === true])

    return (
        <div className="flex flex-col gap-8 items-center bg-keyboardHeader rounded-lg shadow-md h-screen" ref={containerRef}>
            <div className='w-full flex flex-row justify-between items-center p-4'>
                <ButtonAnimation speakText='Salir' text='SALIR' navigation='/' propClass='w-[150px] h-[120px] bg-keybackground' />
                <div className="flex gap-2">
                    <ButtonAnimation speakText='Si' text='SI' propClass='w-[150px] h-[120px]' />
                    <ButtonAnimation speakText='No' text='NO' propClass='w-[150px] h-[120px]' />
                </div>
                <div className="flex gap-2">
                    <ButtonAnimation speakText='Estoy escribiendo' text='Estoy escribiendo' propClass='w-[150px] h-[120px]' />
                    <ButtonAnimation speakText='Necesito ayuda' text='Necesito ayuda' propClass='w-[150px] h-[120px]' />
                </div>
                <div className="flex gap-2">
                    <ButtonAnimation speakText='Suspender' text='SUSPENDER' propClass='w-[150px] h-[120px] bg-keybackground' />
                    <ButtonAnimation speakText='Ajustes' text='ENGRA' propClass='w-[150px] h-[120px] bg-keybackground' />
                </div>
            </div>
            <div className="flex items-center gap-2 justify-between w-full px-4">
                <div className="flex gap-2">
                    <ButtonAnimation text='COPIAR' propClass='w-[150px] h-[120px] bg-keybackground' />
                    <ButtonAnimation text='HABLAR' speakText={output} propClass='w-[150px] h-[120px] bg-keybackground' />
                </div>
                <textarea
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    className="w-3/4 h-[120px] p-2 border rounded resize-none"
                    style={{ fontSize: '44px' }}
                    placeholder="Tu texto aparecerá aquí..."
                />
                <div className="flex gap-2">
                    <ButtonAnimation disabled={true} text='GUARDAR FRASE' propClass='w-[150px] h-[120px] bg-keybackground' />
                    <ButtonAnimation disabled={true} text='FRASES GUARDADAS' propClass='w-[150px] h-[120px] bg-keybackground' />
                </div>
            </div>
            <div className='bg-zinc-900 flex flex-col w-full h-full gap-8 pt-8 p-4'>
                <div className='flex flex-row justify-between items-center'>
                    <ButtonAnimation functionKeyboard={{ funct: "deleteAll", state: changeState }} imagen={{ src: trash, width: 80, height: 80, add: 'invert' }} propClass='w-[150px] h-[120px] flex justify-center items-center' />
                    <div className="flex gap-2">
                        <ButtonAnimation propClass='w-[300px] h-[120px]' text='Sug. palabra' />
                        <ButtonAnimation propClass='w-[300px] h-[120px]' text='Sug. palabra' />
                        <ButtonAnimation propClass='w-[300px] h-[120px]' text='Sug. palabra' />
                        <ButtonAnimation propClass='w-[300px] h-[120px]' text='Sug. palabra' />
                    </div>
                    <div className="flex gap-2">
                        <ButtonAnimation functionKeyboard={{ funct: "deleteOne", state: changeState }} propClass='w-[150px] h-[120px]' text='Borrar letra' />
                        <ButtonAnimation functionKeyboard={{ funct: "deleteLastWord", state: changeState }} propClass='w-[150px] h-[120px]' text='Borrar palabra' />
                    </div>
                </div>
                <div className="grid gap-2 w-full">
                    {(showSymbols ? currentSymbolsLayout : getUpdatedKeyboardLayout()).map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-center gap-2">
                            {row.map((key, index) => (
                                <ButtonAnimation
                                    key={`${rowIndex}-${index}`}
                                    text={key}
                                    propClass='w-full h-[120px]'
                                    functionKeyboard={{ funct: `pressKey ${key}`, state: changeState }}
                                />
                            ))}
                        </div>
                    ))}
                    <div className="flex justify-center gap-2 mt-1">
                        <ButtonAnimation functionKeyboard={{ funct: "changeTilde", state: changeState }} propClass='w-full h-[120px]' text='TILDE' />
                        <ButtonAnimation functionKeyboard={{ funct: "changeMayus", state: changeState }} propClass='w-full h-[120px]' text='MAYUS' />
                        <ButtonAnimation functionKeyboard={{ funct: "changeSymbol", state: changeState }} propClass='w-full h-[120px]' text='SIMBOLOS' />
                        <ButtonAnimation functionKeyboard={{ funct: "spaceKey", state: changeState }} propClass='w-full h-[120px]' text='ESPACIO' />
                        <ButtonAnimation functionKeyboard={{ funct: "enterKey", state: changeState }} propClass='w-full h-[120px]' text='INTRO' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teclado;
