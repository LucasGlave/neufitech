"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ButtonAnimation from './ButtonAnimation';
import trash from "../../public/eliminar.svg"

interface KeySize {
    width: number;
    height: number;
}

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

    const SpecialKeys = {
        MAYUS: 'MAYUS',
        SPACE: '______',
        CTRLZ: 'CTRLZ',
        ENTER: 'ENTER',
        SYMBOLS: 'SYMBOLS',
        TILDE: 'TILDE',
        GUARDAR: 'GUARDAR TEXTO',
        HABLAR: 'HABLAR',
        NOTAS: 'VER NOTAS',
        SALIR: 'SALIR'
    };

    const [output, setOutput] = useState<string>('');
    const [isUpperCase, setIsUpperCase] = useState<boolean>(false);
    const [showSymbols, setShowSymbols] = useState<boolean>(false);
    const [symbolPage, setSymbolPage] = useState<number>(1);
    const [keySize, setKeySize] = useState<KeySize>({ width: 40, height: 40 });
    const [isTildeActive, setIsTildeActive] = useState<boolean>(false);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [isAllow, setIsAllow] = useState(false)
    const [ejecFunction, setEjecFunction] = useState("")
    const timerRefs = useRef<Record<string, NodeJS.Timeout>>({});
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateKeySize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                const keyWidth = Math.floor(containerWidth / 11) - 4;
                const keyHeight = Math.floor(containerHeight / 6) - 4;
                setKeySize({ width: keyWidth, height: keyHeight });
            }
        };

        updateKeySize();
        window.addEventListener('resize', updateKeySize);
        return () => window.removeEventListener('resize', updateKeySize);
    }, []);

    const handleKeyPress = useCallback((key: string) => {
        if (key === SpecialKeys.MAYUS) {
            if (showSymbols) {
                setSymbolPage(symbolPage === 1 ? 2 : 1);
            } else {
                setIsUpperCase(prev => !prev);
            }
        } else if (key === SpecialKeys.SPACE) {
            setOutput(prev => prev + ' ');
        } else if (key === SpecialKeys.CTRLZ) {
            setOutput(prev => prev.slice(0, -1));
        } else if (key === SpecialKeys.ENTER) {
            setOutput(prev => prev + '\n');
        } else if (key === SpecialKeys.SYMBOLS) {
            if (showSymbols) {
                setShowSymbols(false);
            } else {
                setShowSymbols(true);
                setSymbolPage(1);
            }
        } else if (key === SpecialKeys.TILDE) {
            setIsTildeActive(!isTildeActive);
        } else if (key === SpecialKeys.GUARDAR) {
            saveTextToFile(output);
        } else if (key === SpecialKeys.HABLAR) {
            speakText();
        } else {
            let modifiedKey = key;
            if (isTildeActive) {
                if (isUpperCase) {
                    modifiedKey = { 'a': 'Á', 'e': 'É', 'i': 'Í', 'o': 'Ó', 'u': 'Ú' }[key.toLowerCase()] || key;
                } else {
                    modifiedKey = { 'a': 'á', 'e': 'é', 'i': 'í', 'o': 'ó', 'u': 'ú' }[key.toLowerCase()] || key;
                }
                setIsTildeActive(false);
            }
            setOutput(prev => prev + (isUpperCase ? modifiedKey.toUpperCase() : modifiedKey));
            if (isUpperCase) setIsUpperCase(false);
        }
    }, [isUpperCase, showSymbols, symbolPage, isTildeActive, output]);

    const handleKeyEnter = useCallback((key: string, uniqueId: string) => {
        let progress = 0;
        timerRefs.current[uniqueId] = setInterval(() => {
            progress += 2.5;
            if (progress >= 100) {
                clearInterval(timerRefs.current[uniqueId]);
                handleKeyPress(key);
                document.querySelector(`.progress-bar-bottom-${uniqueId}`)?.setAttribute('style', 'width: 0%');
                document.querySelector(`.progress-bar-top-${uniqueId}`)?.setAttribute('style', 'width: 0%');
                const keyElement = document.querySelector(`.key-${uniqueId}`);
                if (keyElement) {
                    keyElement.classList.add('flash');
                    setTimeout(() => {
                        keyElement.classList.remove('flash');
                    }, 300);
                }
            } else {
                document.querySelector(`.progress-bar-bottom-${uniqueId}`)?.setAttribute('style', `width: ${progress}%`);
                document.querySelector(`.progress-bar-top-${uniqueId}`)?.setAttribute('style', `width: ${progress}%`);
            }
        }, 18);
    }, [handleKeyPress]);

    const handleKeyLeave = useCallback((uniqueId: string) => {
        if (timerRefs.current[uniqueId]) {
            clearInterval(timerRefs.current[uniqueId]);
        }
        document.querySelector(`.progress-bar-bottom-${uniqueId}`)?.setAttribute('style', 'width: 0%');
        document.querySelector(`.progress-bar-top-${uniqueId}`)?.setAttribute('style', 'width: 0%');
    }, []);

    const renderKey = (key: string, index: number, rowIndex: string | number, width = keySize.width, extraClass = '', onClick = () => { }) => {
        const uniqueId = `${rowIndex}-${index}`;

        const getKeyDisplay = (key: string) => {
            if (key === SpecialKeys.CTRLZ) {
                return '←';
            } else if (key === SpecialKeys.SYMBOLS) {
                return showSymbols ? 'abc' : '123';
            } else if (key === SpecialKeys.MAYUS) {
                return showSymbols ? (symbolPage === 1 ? '1/2' : '2/2') : 'MAYUS';
            } else if (key === SpecialKeys.TILDE) {
                return 'TILDE';
            } else if (key === SpecialKeys.GUARDAR) {
                return 'GUARDAR';
            } else if (key === SpecialKeys.HABLAR) {
                return 'HABLAR';
            } else {
                let displayKey = key;
                if (isTildeActive) {
                    displayKey = {
                        'a': 'á', 'e': 'é', 'i': 'í', 'o': 'ó', 'u': 'ú',
                        'A': 'Á', 'E': 'É', 'I': 'Í', 'O': 'Ó', 'U': 'Ú'
                    }[key] || key;
                }
                return isUpperCase ? displayKey.toUpperCase() : displayKey;
            }
        };

        const fontSize = Math.min(keySize.width, keySize.height) * 0.3;

        return (
            <div className={`key-container relative flex items-center max-h-[120px] justify-center text-white ${extraClass}`} key={uniqueId} style={{ width: `${width}px`, height: `${keySize.height}px` }}>
                <div className={`progress-bar absolute top-0 right-0 max-h-[120px] w-full bg-[#4caf50] transition-width pointer-events-none progress-bar-bottom progress-bar-bottom-${uniqueId}`}></div>
                <div className={`progress-bar absolute bottom-0 left-0 max-h-[120px] w-full bg-[#4caf50] transition-width pointer-events-none progress-bar-top progress-bar-top-${uniqueId}`}></div>
                <button
                    className={`key-${uniqueId} bg-keybackground border rounded shadow hover:bg-gray-700 active:border active:border-[#4caf50] transition-colors flex items-center justify-center`}
                    onMouseEnter={() => handleKeyEnter(key, uniqueId)}
                    onMouseLeave={() => handleKeyLeave(uniqueId)}
                    onClick={() => {
                        handleKeyPress(key);
                        onClick();
                    }}
                    style={{ minHeight: 120, width: "100%", fontSize: `${fontSize}px` }}
                >
                    {getKeyDisplay(key)}
                </button>
            </div>
        );
    };


    const speakText = () => {
        if (isSpeaking) return;
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(output);
        utterance.lang = 'es-ES';
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
    };

    const currentSymbolsLayout = symbolPage === 1 ? SymbolsLayoutPage1 : SymbolsLayoutPage2;

    const saveTextToFile = (text: string) => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "output.txt";
        document.body.appendChild(element);
        element.click();
    };

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

    const functionAction = () => {
        ejecFunction === "deleteAll" && setOutput("")
        ejecFunction === "deleteOne" && setOutput(prev => prev.slice(0, -1))
        ejecFunction === "deleteLastWord" && deleteLastWord()
        ejecFunction === "changeTilde" && setIsTildeActive(!isTildeActive);
        ejecFunction === "changeMayus" && setIsUpperCase(!isUpperCase);
        ejecFunction === "changeSymbol" && setShowSymbols(!showSymbols)
        ejecFunction === "spaceKey" && setOutput(prev => prev + ' ');
        ejecFunction === "enterKey" && setOutput(prev => prev + '\n');
        ejecFunction === "ctrlZKey" && alert("REALIZAR")
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
                    {(showSymbols ? currentSymbolsLayout : KeyboardLayout).map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-center gap-2">
                            {row.map((key, index) => renderKey(key, index, rowIndex))}
                        </div>
                    ))}
                    <div className="flex justify-center gap-2 mt-1">
                        <ButtonAnimation functionKeyboard={{ funct: "changeTilde", state: changeState }} propClass='w-full h-[120px]' text='TILDE' />
                        <ButtonAnimation functionKeyboard={{ funct: "changeMayus", state: changeState }} propClass='w-full h-[120px]' text='MAYUS' />
                        <ButtonAnimation functionKeyboard={{ funct: "changeSymbol", state: changeState }} propClass='w-full h-[120px]' text={`${showSymbols ? "ABC" : "123"}`} />
                        <ButtonAnimation functionKeyboard={{ funct: "spaceKey", state: changeState }} propClass='w-full h-[120px]' text='____' />
                        <ButtonAnimation functionKeyboard={{ funct: "enterKey", state: changeState }} propClass='w-full h-[120px]' text='ENTER' />
                        <ButtonAnimation functionKeyboard={{ funct: "ctrlZKey", state: changeState }} propClass='w-full h-[120px]' text='CTRLZ' />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Teclado;
