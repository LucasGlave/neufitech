"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';

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
        SHIFT: 'SHIFT',
        SPACE: '______',
        BACKSPACE: 'BACKSPACE',
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
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [isTildeActive, setIsTildeActive] = useState<boolean>(false);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
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
        if (key === SpecialKeys.SHIFT) {
            if (showSymbols) {
                setSymbolPage(symbolPage === 1 ? 2 : 1);
            } else {
                setIsUpperCase(prev => !prev);
            }
        } else if (key === SpecialKeys.SPACE) {
            setOutput(prev => prev + ' ');
        } else if (key === SpecialKeys.BACKSPACE) {
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
            setIsTildeActive(true);
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
        setActiveKey(null);
    }, [isUpperCase, showSymbols, symbolPage, isTildeActive, output]);

    const handleKeyEnter = useCallback((key: string, uniqueId: string) => {
        setActiveKey(key);
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
        setActiveKey(null);
        document.querySelector(`.progress-bar-bottom-${uniqueId}`)?.setAttribute('style', 'width: 0%');
        document.querySelector(`.progress-bar-top-${uniqueId}`)?.setAttribute('style', 'width: 0%');
    }, []);

    const renderKey = (key: string, index: number, rowIndex: string | number, width = keySize.width, extraClass = '', onClick = () => { }) => {
        const uniqueId = `${rowIndex}-${index}`;

        const getKeyDisplay = (key: string) => {
            if (key === SpecialKeys.BACKSPACE) {
                return '←';
            } else if (key === SpecialKeys.SYMBOLS) {
                return showSymbols ? 'abc' : '123';
            } else if (key === SpecialKeys.SHIFT) {
                return showSymbols ? (symbolPage === 1 ? '1/2' : '2/2') : 'SHIFT';
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
        //     font-size: calc(12px + 1vw);


        return (
            <div className={`key-container relative flex items-center justify-center text-white ${extraClass}`} key={uniqueId} style={{ width: `${width}px`, height: `${keySize.height}px` }}>
                <div className={`progress-bar absolute top-0 right-0 h-[12%] bg-[#4caf50] transition-width pointer-events-none progress-bar-bottom progress-bar-bottom-${uniqueId}`}></div>
                <div className={`progress-bar absolute bottom-0 left-0 h-[12%] bg-[#4caf50] transition-width pointer-events-none progress-bar-top progress-bar-top-${uniqueId}`}></div>
                <button
                    className={`key-${uniqueId} bg-gray-800 border rounded shadow hover:bg-gray-700 active:border active:border-[#4caf50] transition-colors flex items-center justify-center`}
                    onMouseEnter={() => handleKeyEnter(key, uniqueId)}
                    onMouseLeave={() => handleKeyLeave(uniqueId)}
                    onClick={() => {
                        handleKeyPress(key);
                        onClick();
                    }}
                    style={{ width: '100%', height: '100%', fontSize: `${fontSize}px` }}
                >
                    {getKeyDisplay(key)}
                </button>
            </div>
        );
    };


    const speakText = () => {
        if (isSpeaking) return; // Evita iniciar otra síntesis si ya está en curso
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(output);
        utterance.lang = 'es-ES';
        utterance.onend = () => setIsSpeaking(false); // Marca el fin de la síntesis
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
    return (
        <div className="flex flex-col items-center p-4 bg-black rounded-lg shadow-md h-screen" ref={containerRef}>
            <div className="flex items-start w-full mb-4">
                <textarea
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    className="w-3/4 h-4/4 p-2 border rounded resize-none"
                    style={{ fontSize: '44px' }}
                    placeholder="Tu texto aparecerá aquí..."
                />
                <div className="flex flex-row gap-2 ml-5">
                    {renderKey(SpecialKeys.TILDE, 0, 'extra', undefined, 'extra-button')}
                    {renderKey(SpecialKeys.HABLAR, 1, 'extra', undefined, 'extra-button', speakText)}
                    {renderKey(SpecialKeys.GUARDAR, 2, 'extra', undefined, 'extra-button')}
                    {renderKey(SpecialKeys.NOTAS, 3, 'extra', undefined, 'extra-button')}
                    {renderKey(SpecialKeys.SALIR, 4, 'extra', undefined, 'extra-button')}
                </div>
            </div>
            <div className="grid gap-2 w-full">
                {(showSymbols ? currentSymbolsLayout : KeyboardLayout).map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-2">
                        {row.map((key, index) => renderKey(key, index, rowIndex))}
                    </div>
                ))}
                <div className="flex justify-center gap-2 mt-1">
                    {renderKey(SpecialKeys.SHIFT, 0, 'special', keySize.width * 1.5)}
                    {renderKey(SpecialKeys.SYMBOLS, 1, 'special', keySize.width * 1.5)}
                    {renderKey(SpecialKeys.SPACE, 2, 'special', keySize.width * 3)}
                    {renderKey(SpecialKeys.BACKSPACE, 3, 'special', keySize.width * 1.5)}
                    {renderKey(SpecialKeys.ENTER, 4, 'special', keySize.width * 1.5)}
                </div>
            </div>
        </div>
    );
}

export default Teclado;
