import React from 'react'
import { diccionario } from "../lib/Diccionario_0"
import createFuzzySearch from "@nozbe/microfuzz"
import ButtonAnimation from './ButtonAnimation'

type TestProps = {
    keys: string
    isOff: boolean
    state: (functionToEjec: string) => void
}

type FuzzyProps = {
    item: string,
    score: number,
    matches: []
}

const TestPredictor = ({ keys, isOff, state }: TestProps) => {
    const words = Object.keys(diccionario)
    const fuzzySearch = createFuzzySearch(words)
    const result = fuzzySearch(keys)
    const uniqueResults = [];
    result.forEach(item => {
        if (!uniqueResults.includes(item) && uniqueResults.length < 4 && item.item.length >= keys.length + 1) {
            uniqueResults.push(item);
        }
    });
    return (
        <div className='flex gap-2'>
            {uniqueResults.map((word: FuzzyProps, i) => (
                <ButtonAnimation
                    functionKeyboard={{ funct: `addWord ${word.item.toLowerCase()}`, state: state }}
                    key={i}
                    disabled={isOff ? true : false}
                    propClass="min-w-[150px] h-[60px]"
                    text={`${word.item.toLowerCase()}`}
                />
            ))
            }
        </div>

    )
}

export default TestPredictor