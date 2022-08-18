import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'

const Letter = ({LetterPos,attemptVal}) => {
    const {board,correctWord,currAttempt,disabledLet,setDisabledLet} = useContext(AppContext)
    const letter = board[attemptVal][LetterPos]
    const correct = correctWord[LetterPos] === letter.toLowerCase()
    const almost = !correct && letter !== "" && correctWord.includes(letter.toLowerCase())
    const letterState = currAttempt.attempt > attemptVal && ( correct ? 'correct' : almost ? 'almost' : 'error')
    useEffect(()=>{
        if(letter !== "" && !correct && !almost ){
            setDisabledLet((prev)=>[...prev,letter])
        }
    },[currAttempt.attempt])
    
    return (
        <div className='letter' id={letterState}>{letter}</div>
    )
}

export default Letter