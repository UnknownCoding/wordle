import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext, useEffect, useState } from 'react'
import { boardDefault } from './Words';
import { generateWordSet } from './Words';
import TimeOver from './components/TimeOver';

export const AppContext = createContext()

function App() {
  const [board,setBoard] = useState(boardDefault)
  const [currAttempt,setAttemp] = useState({attempt:0,letterPos:0});
  const [wordSet,setWordSet] = useState(new Set())
  const [correctWord,setCorrectWord] = useState('')
  const [disabledLet,setDisabledLet] = useState([])
  const [gameOver,setGameOver] = useState({gameOver:false,guessWord:false})

  useEffect(()=>{
    generateWordSet().then((words)=>{
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
    } 
    )
    },[]
  )
    
  
  const onEnter = () => {
    if(currAttempt.letterPos !== 5 ) return;
    let currWord=''
    for (let i=0; i<5; i++){
      currWord += board[currAttempt.attempt][i]
    }
    currWord = currWord.toLocaleLowerCase()
    console.log(wordSet)
    if (wordSet.has(currWord)){
      setAttemp({attempt:currAttempt.attempt +1,letterPos:0});
    }else{
      alert('word not found')
    }
    
    if(currWord === correctWord){
      setGameOver({ gameOver: true, guessedWord: true });
      return
    }
    if(currAttempt.attempt === 5){
      setGameOver({ gameOver: true, guessedWord: false });
      return;

    }
  }

  const onDelete = () => {
    if(currAttempt.letterPos === 0 ) return
    const currBoard = [...board]
    currBoard[currAttempt.attempt][currAttempt.letterPos -1 ] = ""
    setBoard(currBoard)
    setAttemp({...currAttempt , letterPos:currAttempt.letterPos-1 })
  };
          
    const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4 ) return
    const currBoard = [...board]
    currBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(currBoard)
    setAttemp({...currAttempt , letterPos:currAttempt.letterPos+1 })
};

  return (
    <div className="App">
        <nav>
          <h1>Wordle</h1>
        </nav>
        <AppContext.Provider value={{board,gameOver,setGameOver,setBoard,currAttempt,setAttemp,disabledLet,setDisabledLet,onDelete,onSelectLetter,onEnter,correctWord}}>
          <div className='game'>
            <Board/>
            {gameOver.gameOver ? <TimeOver /> : <Keyboard/>}
          </div>
        </AppContext.Provider>
    </div>
  );
}

export default App;
