import React, { useContext } from 'react'
import { AppContext } from '../App'

const TimeOver = () => {
    const {board,gameOver,correctWord,currAttempt} = useContext(AppContext)
    return (
    <div className='gameOver'>
        <h3>
            {gameOver.guessedWord
            ? "You Correctly Guessed the Wordle"
            : "You Failed to Guess the Word"}
        </h3>
        
        <h2>Correct: {correctWord}</h2>
        {gameOver.guessWord && (<h3>You guessed in {currAttempt.attemp} attempts </h3>)}
    </div>
    )
}

export default TimeOver